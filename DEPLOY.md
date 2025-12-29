# Hướng dẫn Deploy ứng dụng lên Vercel

## Kiến trúc Deploy

- **Frontend (Next.js)**: Deploy lên Vercel (tối ưu cho Next.js)
- **Backend (FastAPI)**: Deploy lên Vercel Serverless Functions hoặc external service (Render, Fly.io, etc.)
- **Database (MySQL)**: Sử dụng external service (PlanetScale, Supabase, hoặc Vercel Postgres)

## Phương án 1: Frontend + Backend đều trên Vercel (Khuyến nghị)

### Bước 1: Deploy Frontend lên Vercel

#### Cách 1: Deploy qua Vercel Dashboard (Khuyến nghị)

1. Đăng nhập vào [Vercel](https://vercel.com)
2. Click **"Add New Project"**
3. Import Git repository của bạn
4. Cấu hình project:
   - **Framework Preset**: Next.js (tự động detect)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (hoặc để trống, Vercel tự detect)
   - **Output Directory**: `.next` (hoặc để trống)
   - **Install Command**: `npm install`

5. Set Environment Variables:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend.vercel.app/api/v1
   NEXT_PUBLIC_BACKEND_BASE_URL=https://your-backend.vercel.app
   ```

6. Click **"Deploy"**

#### Cách 2: Deploy qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (từ thư mục frontend)
cd frontend
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_BACKEND_URL
vercel env add NEXT_PUBLIC_BACKEND_BASE_URL

# Deploy production
vercel --prod
```

### Bước 2: Deploy Backend lên Vercel (Serverless)

⚠️ **Lưu ý**: FastAPI trên Vercel sẽ chạy dưới dạng serverless functions, có một số giới hạn:
- Request timeout: 10s (Hobby), 60s (Pro)
- Cold start có thể chậm
- File uploads cần xử lý đặc biệt

#### Cấu hình Backend cho Vercel

1. Tạo file `backend/api/index.py`:

```python
from app.main import app

# Vercel sẽ tự động detect app này
```

2. Tạo file `backend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.py"
    }
  ]
}
```

3. Deploy backend lên Vercel:
   - Tạo project mới trên Vercel
   - Root Directory: `backend`
   - Set environment variables từ `backend/env.example`

### Bước 3: Cập nhật CORS và Environment Variables

Sau khi có domain thực tế:

1. **Backend (Vercel)**: Cập nhật `BACKEND_CORS_ORIGINS` với domain frontend:
   ```
   BACKEND_CORS_ORIGINS=["https://your-app.vercel.app"]
   ```

2. **Frontend (Vercel)**: Cập nhật environment variables với domain backend thực tế

3. **Frontend next.config.ts**: Cập nhật `remotePatterns` với domain backend:
   ```typescript
   remotePatterns: [
     {
       protocol: "https",
       hostname: "your-backend.vercel.app",
       pathname: "/uploads/**",
     },
   ]
   ```

## Phương án 2: Frontend Vercel + Backend External Service

Nếu backend cần long-running process, có thể deploy backend lên:
- **Render**: https://render.com
- **Fly.io**: https://fly.io
- **DigitalOcean App Platform**: https://www.digitalocean.com

Sau đó cập nhật `NEXT_PUBLIC_BACKEND_URL` trên Vercel trỏ đến backend service đó.

## Phương án 3: Sử dụng Vercel Postgres

Nếu muốn dùng Vercel Postgres (PostgreSQL):

1. Tạo Postgres database trên Vercel Dashboard
2. Cập nhật backend để hỗ trợ PostgreSQL:
   - Thay `pymysql` bằng `psycopg2` trong `requirements.txt`
   - Cập nhật `DATABASE_URL` format: `postgresql://user:password@host:port/dbname`
3. Cập nhật SQLAlchemy models nếu có MySQL-specific syntax

## Cấu hình Custom Domain

### Vercel:
1. Vào **Settings** → **Domains**
2. Thêm domain của bạn
3. Cập nhật DNS records theo hướng dẫn

## Environment Variables Checklist

### Backend (Vercel):
- [ ] `DATABASE_URL`
- [ ] `SECRET_KEY`
- [ ] `BACKEND_CORS_ORIGINS` (với domain frontend Vercel)
- [ ] `MAIL_*` (nếu cần)
- [ ] Các biến khác từ `env.example`

### Frontend (Vercel):
- [ ] `NEXT_PUBLIC_BACKEND_URL`
- [ ] `NEXT_PUBLIC_BACKEND_BASE_URL`

## Kiểm tra sau khi Deploy

1. **Backend Health Check**: `https://your-backend.vercel.app/api/v1/health`
2. **Backend Docs**: `https://your-backend.vercel.app/docs`
3. **Frontend**: `https://your-app.vercel.app`
4. **Database**: Kiểm tra migrations đã chạy chưa

## Troubleshooting

### Frontend không kết nối được Backend

- Kiểm tra `NEXT_PUBLIC_BACKEND_URL` có đúng không
- Kiểm tra CORS settings trong backend
- Kiểm tra network tab trong browser console

### CORS Error

- Đảm bảo `BACKEND_CORS_ORIGINS` chứa domain Vercel chính xác
- Format: `["https://your-app.vercel.app"]` (có dấu ngoặc vuông và quotes)

### Images không load

- Cập nhật `next.config.ts` với domain backend đúng
- Kiểm tra `NEXT_PUBLIC_BACKEND_BASE_URL`
- Đảm bảo backend đã mount static files đúng cách

### Build fails trên Vercel

- Kiểm tra logs trong Vercel Dashboard
- Đảm bảo `package.json` có đầy đủ dependencies
- Kiểm tra Node.js version (Vercel tự động detect)

### Database connection error

- Kiểm tra `DATABASE_URL` format
- Đảm bảo database service đã running
- Kiểm tra network connectivity

## Monitoring

### Vercel:
- **Analytics**: Xem traffic, performance
- **Logs**: Real-time logs
- **Deployments**: Lịch sử deployments
- **Functions**: Monitor serverless functions

## Cost Optimization

### Vercel:
- **Hobby Plan**: Free với giới hạn
- **Pro Plan**: $20/tháng cho production
- **Enterprise**: Custom pricing

## Best Practices

1. **Never commit `.env` files**
2. **Use Vercel's environment variables** cho sensitive data
3. **Enable HTTPS** (tự động với Vercel)
4. **Use Vercel Analytics** để monitor performance
5. **Setup CI/CD** với GitHub Actions (tự động deploy khi push)
6. **Use Vercel Edge Functions** cho performance tốt hơn

## Next Steps

- Setup custom domains
- Configure CDN cho static assets
- Setup monitoring và alerting
- Configure backup strategy
- Setup staging environment
- Optimize serverless functions

