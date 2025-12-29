# Quick Start - Deploy lên Railway

## Bước nhanh (5 phút)

### 1. Chuẩn bị
```bash
# Đảm bảo đã commit tất cả thay đổi
git add .
git commit -m "Add Docker configuration for Railway"
git push
```

### 2. Tạo Project trên Railway

1. Vào https://railway.app và đăng nhập
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Chọn repository của bạn
4. Railway sẽ tự động detect `docker-compose.yml`

### 3. Set Environment Variables

Vào **Variables** tab và thêm:

**Backend:**
- `SECRET_KEY` = (generate bằng: `openssl rand -hex 32`)
- `DATABASE_URL` = `mysql+pymysql://datn_user:your_password@mysql:3306/datn_db`
- `BACKEND_CORS_ORIGINS` = `["https://your-frontend.railway.app"]`
- Các biến MAIL (nếu cần)

**Frontend:**
- `NEXT_PUBLIC_BACKEND_URL` = `https://your-backend.railway.app/api/v1`
- `NEXT_PUBLIC_BACKEND_BASE_URL` = `https://your-backend.railway.app`

**MySQL:**
- `MYSQL_ROOT_PASSWORD` = (password mạnh)
- `MYSQL_DATABASE` = `datn_db`
- `MYSQL_USER` = `datn_user`
- `MYSQL_PASSWORD` = (password mạnh)

### 4. Deploy

Railway sẽ tự động deploy. Chờ 5-10 phút.

### 5. Lấy Domain

Sau khi deploy xong:
- Vào mỗi service → **Settings** → **Generate Domain**
- Copy domain và cập nhật lại environment variables nếu cần

## Lưu ý quan trọng

⚠️ **Sau khi có domain thực tế, cần cập nhật:**
- `BACKEND_CORS_ORIGINS` với domain frontend thực tế
- `NEXT_PUBLIC_BACKEND_URL` với domain backend thực tế
- `NEXT_PUBLIC_BACKEND_BASE_URL` với domain backend thực tế

## Kiểm tra

1. Backend: `https://your-backend.railway.app/docs` (Swagger UI)
2. Frontend: `https://your-frontend.railway.app`
3. Database: Kiểm tra logs để đảm bảo migrations đã chạy

## Troubleshooting

- **Build fails**: Xem logs trong Railway Dashboard
- **Database connection error**: Kiểm tra `DATABASE_URL` format
- **CORS error**: Cập nhật `BACKEND_CORS_ORIGINS` với domain đúng
- **Images not loading**: Cập nhật `next.config.ts` với domain backend

Xem `DEPLOY.md` để biết chi tiết hơn.

