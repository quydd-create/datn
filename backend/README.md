# DATN Backend

Backend API cho dự án DATN, xây dựng với **FastAPI**, **SQLAlchemy**, **MySQL** và tuân thủ các best practice về cấu trúc, bảo mật, phân quyền.

---

## Mục lục

- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Hướng dẫn cài đặt & chạy](#hướng-dẫn-cài-đặt--chạy)
- [Database Migration](#database-migration)
- [Tài liệu API](#tài-liệu-api)
- [Các endpoint chính](#các-endpoint-chính)
- [Lưu ý quan trọng](#lưu-ý-quan-trọng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)

---

## Cấu trúc thư mục

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Entry point FastAPI
│   ├── api/
│   │   ├── __init__.py
│   │   └── api_v1/
│   │       ├── __init__.py
│   │       ├── api.py          # Router chính cho API v1
│   │       └── endpoints/
│   │           ├── __init__.py
│   │           ├── root.py     # Root endpoint
│   │           └── health.py   # Health check endpoints
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py           # Cấu hình ứng dụng
│   │   └── database.py         # Database connection
│   ├── decorators/             # Decorator cho phân quyền, xác thực
│   │   └── __init__.py
│   ├── log/                    # Logging
│   │   └── __init__.py
│   ├── middleware/             # Middleware custom
│   │   └── __init__.py
│   ├── models/                 # SQLAlchemy models
│   │   └── __init__.py
│   ├── repository/             # Truy vấn DB
│   │   └── __init__.py
│   ├── schemas/                # Pydantic schemas
│   │   └── __init__.py
│   └── services/               # Business logic
│       └── __init__.py
├── alembic/                    # Database migrations
├── alembic.ini                 # Alembic config
├── run.py                      # Script chạy server
├── requirements.txt            # Python dependencies
└── env.example                 # Mẫu biến môi trường
```

---

## Yêu cầu hệ thống

- Python 3.10+
- MySQL 8+
- pip

---

## Hướng dẫn cài đặt & chạy

### 1. Tạo virtual environment

```powershell
cd backend
py -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Cài đặt dependencies

```powershell
pip install -r requirements.txt
```

### 3. Cấu hình môi trường

Sao chép `env.example` thành `.env` và cập nhật các giá trị:

```powershell
Copy-Item env.example .env
```

Chỉnh sửa file `.env`:

```
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/datn_db
SECRET_KEY=your-secret-key-here
DEBUG=True
```

Chỉnh sửa file `alembic.ini`:

```
sqlalchemy.url = mysql+pymysql://username:password@localhost:3306/datn_db
```

### 4. Tạo database

```powershell
CREATE DATABASE datn_db
```

### 5. Chạy database migration:

```powershell
alembic upgrade head
```

### 6. Chạy ứng dụng

**Cách 1: Sử dụng file run.py (Khuyến nghị)**

```powershell
python run.py
```

**Cách 2: Sử dụng uvicorn trực tiếp**

```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

## Database Migration

- Áp dụng migration:

```powershell
alembic upgrade head
```

## API Documentation

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc
- Root: http://127.0.0.1:8000/
- Health Check: http://127.0.0.1:8000/api/v1/health

## Endpoints

### Root Endpoints

- `GET /` - Welcome message và thông tin API

### Health Check Endpoints

- `GET /api/v1/health/` - Basic health check
- `GET /api/v1/health/detailed` - Detailed health check với database connection

## Lưu ý quan trọng

**Luôn chạy tất cả lệnh trong virtual environment:**

```powershell
# Activate virtual environment trước khi chạy bất kỳ lệnh nào
.\venv\Scripts\Activate.ps1

# Sau đó chạy server
python run.py
```

## Technologies

- **FastAPI** - Modern web framework
- **SQLAlchemy** - ORM
- **Alembic** - Database migrations
- **MySQL** - Database
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
