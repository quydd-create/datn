# Quick Start - Deploy lên Vercel

## Bước nhanh (10 phút)

### 1. Deploy Frontend lên Vercel

1. Vào https://vercel.com → **Add New Project**
2. Import GitHub repo
3. Cấu hình:
   - **Root Directory**: `frontend`
   - **Framework**: Next.js (auto-detect)
4. Set environment variables (tạm thời, sẽ cập nhật sau):
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend.vercel.app/api/v1
   NEXT_PUBLIC_BACKEND_BASE_URL=https://your-backend.vercel.app
   ```
5. Click **Deploy**
6. Lấy domain frontend (ví dụ: `your-app.vercel.app`)

### 2. Deploy Backend lên Vercel (Tùy chọn)

Nếu deploy backend lên Vercel:

1. Tạo project mới trên Vercel
2. Root Directory: `backend`
3. Set environment variables từ `backend/env.example`
4. Lấy domain backend (ví dụ: `your-backend.vercel.app`)

**Hoặc** deploy backend lên external service (Render, Fly.io, etc.)

### 3. Cập nhật Environment Variables

**Frontend (Vercel):**
- Cập nhật `NEXT_PUBLIC_BACKEND_URL` với domain backend thực tế
- Cập nhật `NEXT_PUBLIC_BACKEND_BASE_URL` với domain backend thực tế

**Backend (Vercel hoặc external):**
- Cập nhật `BACKEND_CORS_ORIGINS` với domain frontend Vercel:
  ```
  BACKEND_CORS_ORIGINS=["https://your-app.vercel.app"]
  ```

### 4. Kiểm tra

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.vercel.app/docs` (nếu deploy trên Vercel)

## Lưu ý

⚠️ Sau khi có domain thực tế, nhớ cập nhật:
- `NEXT_PUBLIC_BACKEND_URL` trên Vercel frontend
- `BACKEND_CORS_ORIGINS` trên backend service

Xem `DEPLOY.md` để biết chi tiết.

