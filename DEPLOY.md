# Hướng dẫn Deploy ứng dụng lên Railway bằng Docker Compose

## Yêu cầu

- Tài khoản Railway (https://railway.app)
- Git repository (GitHub, GitLab, hoặc Bitbucket)
- Railway CLI (tùy chọn, để deploy từ command line)

## Cách 1: Deploy qua Railway Dashboard (Khuyến nghị)

### Bước 1: Chuẩn bị Repository

1. Đảm bảo tất cả các file đã được commit và push lên Git repository:
   - `docker-compose.yml` (ở root của project)
   - `backend/Dockerfile`
   - `frontend/Dockerfile`
   - `backend/.dockerignore`
   - `frontend/.dockerignore`

### Bước 2: Tạo Project trên Railway

1. Đăng nhập vào [Railway Dashboard](https://railway.app)
2. Click **"New Project"**
3. Chọn **"Deploy from GitHub repo"** (hoặc GitLab/Bitbucket)
4. Chọn repository của bạn
5. Railway sẽ tự động detect `docker-compose.yml`

### Bước 3: Cấu hình Environment Variables

Trong Railway Dashboard, vào **Variables** tab và thêm các biến môi trường sau:

#### Backend Variables:
```env
DATABASE_URL=mysql+pymysql://datn_user:datn_password@mysql:3306/datn_db
DEBUG=False
API_V1_STR=/api/v1
PROJECT_NAME=DATN Backend
BACKEND_CORS_ORIGINS=["https://your-frontend-domain.railway.app"]
SECRET_KEY=your-very-secure-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=your-email@gmail.com
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_STARTTLS=True
MAIL_SSL_TLS=False
MAIL_FROM_NAME=DATN
UPLOAD_FOLDER=uploads
MAX_FILE_SIZE=2097152
```

#### Frontend Variables:
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.railway.app/api/v1
NEXT_PUBLIC_BACKEND_BASE_URL=https://your-backend-domain.railway.app
```

#### MySQL Variables:
```env
MYSQL_ROOT_PASSWORD=your-secure-root-password
MYSQL_DATABASE=datn_db
MYSQL_USER=datn_user
MYSQL_PASSWORD=your-secure-password
```

### Bước 4: Cấu hình Services

Railway sẽ tự động detect các services từ `docker-compose.yml`:
- `mysql` - Database service
- `backend` - FastAPI backend
- `frontend` - Next.js frontend

**Lưu ý quan trọng:**
- Railway sẽ tự động tạo public domain cho mỗi service
- Cần cập nhật `BACKEND_CORS_ORIGINS` với domain thực tế của frontend
- Cần cập nhật `NEXT_PUBLIC_BACKEND_URL` với domain thực tế của backend

### Bước 5: Deploy

1. Railway sẽ tự động build và deploy khi bạn push code
2. Hoặc click **"Deploy"** trong Dashboard
3. Chờ quá trình build hoàn tất (có thể mất 5-10 phút lần đầu)

### Bước 6: Chạy Migrations

Sau khi backend đã deploy thành công, migrations sẽ tự động chạy (theo Dockerfile).

Nếu cần chạy migrations thủ công:
```bash
railway run --service backend alembic upgrade head
```

## Cách 2: Deploy bằng Railway CLI

### Bước 1: Cài đặt Railway CLI

```bash
npm i -g @railway/cli
```

### Bước 2: Login

```bash
railway login
```

### Bước 3: Link Project

```bash
railway link
```

### Bước 4: Set Environment Variables

```bash
# Backend variables
railway variables set DATABASE_URL="mysql+pymysql://datn_user:datn_password@mysql:3306/datn_db"
railway variables set SECRET_KEY="your-secret-key"
# ... (thêm các biến khác)

# Frontend variables
railway variables set NEXT_PUBLIC_BACKEND_URL="https://your-backend.railway.app/api/v1"
```

### Bước 5: Deploy

```bash
railway up
```

## Cấu hình Custom Domain (Tùy chọn)

1. Vào **Settings** của service trong Railway Dashboard
2. Click **"Generate Domain"** hoặc **"Custom Domain"**
3. Thêm domain của bạn
4. Cập nhật DNS records theo hướng dẫn của Railway

## Cấu hình Database trên Railway (Thay vì MySQL trong Docker)

Nếu muốn sử dụng Railway's managed MySQL thay vì container:

1. Tạo MySQL service từ Railway Dashboard
2. Lấy connection string từ Railway
3. Cập nhật `DATABASE_URL` trong backend variables
4. Xóa service `mysql` khỏi `docker-compose.yml` hoặc comment nó

## Troubleshooting

### Backend không kết nối được database

- Kiểm tra `DATABASE_URL` có đúng format không
- Đảm bảo MySQL service đã healthy trước khi backend start
- Kiểm tra network connectivity giữa services

### Frontend không kết nối được backend

- Kiểm tra `NEXT_PUBLIC_BACKEND_URL` có đúng không
- Kiểm tra CORS settings trong backend
- Đảm bảo backend đã expose đúng port

### Build fails

- Kiểm tra logs trong Railway Dashboard
- Đảm bảo tất cả dependencies đã được cài đặt
- Kiểm tra Dockerfile có đúng syntax không

### Images không load được

- Cập nhật `next.config.ts` với domain của backend
- Kiểm tra `NEXT_PUBLIC_BACKEND_BASE_URL`
- Đảm bảo backend đã mount static files đúng cách

## Monitoring

Railway cung cấp:
- **Logs**: Xem real-time logs của từng service
- **Metrics**: CPU, Memory usage
- **Deployments**: Lịch sử deployments

## Backup

- Database: Railway tự động backup MySQL data
- Uploads: Cần setup persistent volume hoặc external storage (S3, etc.)

## Cost Optimization

- Railway có free tier với giới hạn
- Sử dụng Railway's managed services để tối ưu cost
- Monitor usage trong Dashboard

## Security Best Practices

1. **Never commit `.env` files**
2. **Use strong SECRET_KEY** (generate bằng: `openssl rand -hex 32`)
3. **Use Railway's secrets** cho sensitive data
4. **Enable HTTPS** (Railway tự động cung cấp)
5. **Regularly update dependencies**

## Next Steps

- Setup CI/CD với GitHub Actions
- Configure monitoring và alerting
- Setup backup strategy cho uploads
- Configure CDN cho static assets

