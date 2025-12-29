# Hướng dẫn Deploy

Dự án này được deploy lên **Vercel**.

## 🚀 Deploy lên Vercel

**Ưu điểm:**
- Vercel tối ưu cho Next.js
- Deploy nhanh và dễ dàng
- Free tier tốt
- Tự động CI/CD với GitHub

## 📝 Tóm tắt nhanh

1. Deploy frontend lên Vercel → Lấy domain
2. Deploy backend lên Vercel hoặc external service → Lấy domain
3. Cập nhật environment variables trên cả hai services
4. Cập nhật CORS settings trên backend

## 📚 Hướng dẫn chi tiết

- **Quick Start**: Xem [`QUICK_START.md`](./QUICK_START.md) (10 phút)
- **Chi tiết**: Xem [`DEPLOY.md`](./DEPLOY.md)

## 🎯 Bắt đầu ngay

```bash
# 1. Đảm bảo code đã được push lên GitHub
git push

# 2. Vào Vercel và import project
# https://vercel.com/new

# 3. Follow hướng dẫn trong QUICK_START.md
```
