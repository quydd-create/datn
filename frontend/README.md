# ReHome - Frontend Application

Dự án frontend cho ứng dụng ReHome, được xây dựng bằng Next.js 15 với Tailwind CSS v4 và TypeScript.

## 🚀 Cách chạy ứng dụng

### Yêu cầu hệ thống
- Node.js 18+
- npm hoặc yarn
- Git

### Cài đặt và chạy

```bash
# Clone repository
git clone <repository-url>
cd frontend

# Cài đặt dependencies
npm install

# Copy file environment
cp .env.example .env

# Chạy development server với Turbopack
npm run dev

# Hoặc build production
npm run build
npm start

# Lint code
npm run lint
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 📁 Cấu trúc thư mục

```
frontend/
├── app/                        # Next.js App Router (Routes chính)
│   ├── globals.css            # Global styles và Tailwind CSS v4
│   ├── layout.tsx             # Root layout component
│   ├── page.tsx               # Trang chủ
│   ├── favicon.ico            # Favicon
│   ├── 403/                   # Trang lỗi 403 (Forbidden)
│   │   └── page.tsx
│   ├── admin/                 # Admin routes
│   │   └── dashboard/
│   ├── login/                 # Trang đăng nhập
│   │   └── page.tsx
│   └── register/              # Trang đăng ký
│       └── page.tsx
├── components/                # Reusable UI components
│   ├── layout/               # Layout components
│   │   ├── Header.tsx        # Header component
│   │   └── Footer.tsx        # Footer component  
│   └── ui/                   # Shadcn/ui components
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       └── label.tsx
├── constants/                 # Hằng số và cấu hình
│   ├── index.ts              # Export tất cả constants
│   └── routes.ts             # Route constants và API endpoints
├── contexts/                  # React Context providers (hiện tại trống)
├── enums/                     # TypeScript enums & constants
│   ├── index.ts              # Export tất cả enums
│   ├── brand.ts              # Brand enum
│   ├── gender.ts             # Gender enum
│   ├── pom.ts                # Point of Marketing enum
│   ├── productCategory.ts    # Product category enum
│   ├── productStatus.ts      # Product status enum
│   ├── role.ts               # User role enum với helper functions
│   └── userStatus.ts         # User status enum
├── hooks/                     # Custom React hooks
│   └── useAuth.tsx           # Authentication hook với AuthProvider
├── lib/                       # Utility libraries
│   └── utils.ts              # Helper functions (cn utility)
├── public/                    # Static assets (hiện tại trống)
├── schemas/                   # Validation schemas (Zod)
│   ├── index.ts              # Export tất cả schemas
│   └── auth.ts               # Authentication validation schemas
├── services/                  # API service functions
│   ├── index.ts              # Export tất cả services
│   ├── auth-service.ts       # Authentication API calls
│   └── user-service.ts       # User management API calls
├── types/                     # TypeScript type definitions
│   ├── index.ts              # Export tất cả types
│   ├── auth.ts               # Authentication types
│   └── user.ts               # User types
└── utils/                     # Utility functions
    └── axiosInstance.ts      # Axios configuration với interceptors
```

### Giải thích từng thư mục

- **`app/`**: Chứa các routes và pages theo Next.js App Router. Mỗi folder = 1 route
- **`components/`**: Components tái sử dụng, bao gồm layout và UI components từ Shadcn/ui
- **`constants/`**: Định nghĩa routes, API endpoints và các hằng số khác
- **`contexts/`**: React Context cho state management global (hiện tại trống, logic auth được tích hợp trong useAuth hook)
- **`enums/`**: TypeScript enums với helper functions cho các giá trị cố định như Role, Status, Category
- **`hooks/`**: Custom hooks, đặc biệt là useAuth với AuthProvider tích hợp
- **`lib/`**: Thư viện tiện ích, hiện tại có cn utility cho className merging
- **`schemas/`**: Schema validation với Zod cho forms và API validation
- **`services/`**: Pure functions cho API calls, không chứa React hooks
- **`types/`**: TypeScript type definitions và interfaces
- **`utils/`**: Helper functions và utilities, đặc biệt là axiosInstance với interceptors

## 🛠️ Hướng dẫn Developer

### 1. Thư mục `constants/` - Hằng số và Cấu hình
**Mục đích**: Centralized constants và configuration

**Cấu trúc hiện tại:**
```typescript
// constants/routes.ts
export const PUBLIC_ROUTES = ['/login', '/register', '/'];
export const PROTECTED_ROUTES = ['/profile'];
export const ADMIN_ROUTES = ['/admin'];

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    ME: '/users/me',
  },
} as const;
```

**Cách sử dụng:**
```typescript
import { PUBLIC_ROUTES, API_ENDPOINTS } from '@/constants';

// Sử dụng trong routing logic
const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

// Sử dụng trong API calls
await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
```

### 2. Thư mục `enums/` - TypeScript Enums với Helper Functions
**Mục đích**: Định nghĩa các giá trị enum với utility functions

**Ví dụ enum với helper functions:**
```typescript
// enums/role.ts
export enum Role {
  ADMIN = "admin",
  SELLER = "seller", 
  BUYER = "buyer",
  ANY = "any",
}

export const getRoleLabel = (role: Role): string => {
  const labels: Record<Role, string> = {
    [Role.ADMIN]: "Quản trị viên",
    [Role.SELLER]: "Người bán",
    [Role.BUYER]: "Người mua", 
    [Role.ANY]: "Người dùng",
  };
  return labels[role];
};

export const getRoleBadgeClass = (role: Role): string => {
  const classes: Record<Role, string> = {
    [Role.ADMIN]: "bg-purple-100 text-purple-800 border-purple-200",
    [Role.SELLER]: "bg-blue-100 text-blue-800 border-blue-200",
    [Role.BUYER]: "bg-green-100 text-green-800 border-green-200",
    [Role.ANY]: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return classes[role];
};
```

**Cách sử dụng:**
```typescript
import { Role, getRoleLabel, getAllRoles } from '@/enums';

// Sử dụng enum value
const userRole: Role = Role.BUYER;

// Sử dụng helper function
const roleLabel = getRoleLabel(userRole); // "Người mua"

// Trong form select options
const roleOptions = getAllRoles(); // [{value: Role.ADMIN, label: "Quản trị viên"}, ...]
```

### 3. Thư mục `hooks/` - Custom Hooks với Tích hợp Context
**Mục đích**: Authentication logic với auto role checking và redirect

**Hook `useAuth` đa năng:**
```typescript
// hooks/useAuth.tsx - Có cả hook và provider trong 1 file

// 1. Sử dụng cơ bản (chỉ lấy thông tin user)
const { user, loading, error, refetch } = useAuth();

// 2. Sử dụng với role checking (auto redirect)
const { user } = useAuth([Role.ADMIN]); // Tự động redirect nếu không phải admin

// 3. Sử dụng với multiple roles
const { user } = useAuth([Role.ADMIN, Role.SELLER]); // Cho phép admin hoặc seller
```

**Wrap app với AuthProvider:**
```typescript
// app/layout.tsx
import { AuthProvider } from '@/hooks/useAuth';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 4. Thư mục `app/` - Pages & Layouts
**Mục đích**: Định nghĩa routes và layouts theo App Router

**Cấu trúc hiện tại:**
```
app/
├── layout.tsx              # Root layout với AuthProvider
├── page.tsx               # Home page (public)
├── globals.css            # Global styles với Tailwind CSS v4
├── favicon.ico            # Site icon
├── 403/page.tsx           # Forbidden page
├── login/page.tsx         # Login page (public)
├── register/page.tsx      # Register page (public)
└── admin/
    └── dashboard/         # Admin-only routes
```

**Ví dụ protected page:**
```typescript
// app/admin/dashboard/page.tsx
'use client';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/enums';

export default function AdminDashboard() {
  // Tự động redirect nếu không phải admin
  const { user, loading } = useAuth([Role.ADMIN]);
  
  if (loading) return <div>Loading...</div>;
  
  return <div>Admin Dashboard for {user?.email}</div>;
}
```

### 5. Thư mục `components/` - UI Components
**Mục đích**: Chứa các component tái sử dụng

**Cấu trúc hiện tại:**
```
components/
├── layout/               # Layout components
│   ├── Header.tsx        # Site header
│   └── Footer.tsx        # Site footer
└── ui/                   # Shadcn/ui components
    ├── avatar.tsx        # Avatar component
    ├── button.tsx        # Button variants
    ├── dropdown-menu.tsx # Dropdown menu
    ├── form.tsx          # Form components
    ├── input.tsx         # Input variants
    └── label.tsx         # Label component
```

**Cách sử dụng Shadcn/ui components:**
```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function UserProfile() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={user.avatar_url} />
        <AvatarFallback>{user.first_name[0]}</AvatarFallback>
      </Avatar>
      <Button variant="outline">Edit Profile</Button>
    </div>
  );
}
```

### 6. Thư mục `types/` - TypeScript Definitions
**Mục đích**: Centralized type definitions

**Cấu trúc hiện tại:**
```typescript
// types/index.ts - Export hub
export * from './auth';
export * from './user';

// types/user.ts - User related types
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: Role[];
  avatar_url?: string;
  available_balance: number;
  addresses: Address[];
  // ... other fields
}

// types/auth.ts - Authentication types  
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface LoginRequest {
  email: string;
  password: string;
}
```

**Cách sử dụng:**
```typescript
import type { User, AuthContextType, LoginRequest } from '@/types';

// Trong component
const [user, setUser] = useState<User | null>(null);

// Trong API function
async function login(data: LoginRequest): Promise<LoginResponse> {
  // API call logic
}
```

### 7. Thư mục `services/` - Pure API Functions
**Mục đích**: Pure functions cho API calls, không chứa React hooks

**Cấu trúc hiện tại:**
```
services/
├── index.ts              # Export hub
├── auth-service.ts       # Authentication APIs
└── user-service.ts       # User management APIs
```

**Ví dụ service function:**
```typescript
// services/auth-service.ts
import { API_ENDPOINTS } from '@/constants';
import type { LoginRequest, LoginResponse } from '@/types/auth';
import axiosInstance from '@/utils/axiosInstance';

export const authService = {
  // Pure async functions, không có state
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
    return response.data;
  },
};
```

**Cách sử dụng trong components:**
```typescript
import { authService } from '@/services';

// Trong useAuth hook hoặc component
const handleLogin = async (data: LoginRequest) => {
  try {
    const response = await authService.login(data);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### 8. Thư mục `schemas/` - Zod Validation Schemas
**Mục đích**: Form validation với Zod schemas

**Cấu trúc hiện tại:**
```typescript
// schemas/auth.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Mật khẩu là bắt buộc'),
});

// Export inferred type
export type LoginFormData = z.infer<typeof loginSchema>;
```

**Cách sử dụng với React Hook Form:**
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/schemas';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    // data is type-safe and validated
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

### 9. Thư mục `utils/` - Utility Functions
**Mục đích**: Helper functions và configurations

**axiosInstance với interceptors:**
```typescript
// utils/axiosInstance.ts
import axios from "axios";
import { PUBLIC_ROUTES } from "@/constants/routes";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/v1",
  timeout: 10000,
  withCredentials: true,
});

// Request interceptor - Auto add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle token expiration  
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      if (typeof window !== 'undefined') {
        if(!PUBLIC_ROUTES.includes(window.location.pathname)) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
```

### 10. Thư mục `lib/` - Utility Libraries
**Mục đích**: Third-party library configurations và utilities

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility để merge className với Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Cách sử dụng cn utility:**
```typescript
import { cn } from '@/lib/utils';

// Trong component
<Button 
  className={cn(
    "px-4 py-2 text-white", 
    isActive && "bg-blue-500",
    isDisabled && "opacity-50 cursor-not-allowed"
  )}
>
  Click me
</Button>
```

## 🔄 Workflow Patterns

### Authentication Flow
```typescript
// 1. User login qua form
const loginData = loginSchema.parse(formData); // Validate với Zod

// 2. Call API service 
const response = await authService.login(loginData);

// 3. Store token và fetch user info
localStorage.setItem('auth_token', response.access_token);
await refetch(); // Từ useAuth hook

// 4. Auto redirect based on roles trong useAuth
```

### Protected Route Pattern
```typescript
// Trong page component
const { user, loading } = useAuth([Role.ADMIN]); // Auto redirect

if (loading) return <LoadingSpinner />;

return <AdminContent user={user} />; // user guaranteed to be admin
```

### API Call Pattern
```typescript
// 1. Define types
interface UserUpdateRequest { first_name: string; }

// 2. Create service function
export const userService = {
  updateProfile: (data: UserUpdateRequest) => 
    axiosInstance.put('/users/profile', data)
};

// 3. Use in component với error handling
const handleUpdate = async (data: UserUpdateRequest) => {
  try {
    await userService.updateProfile(data);
    await refetch(); // Refresh user data
  } catch (error) {
    // Handle error (axiosInstance tự động handle 401)
  }
};
```

## 🎨 Styling Guidelines

- **Tailwind CSS v4**: Sử dụng utility classes mới nhất
- **Shadcn/ui**: Component library với Radix UI primitives
- **cn() utility**: Merge conditional classes với tailwind-merge
- **Custom styles**: Đặt trong `globals.css` với `@layer`

**Ví dụ styling patterns:**
```typescript
// Conditional classes với cn()
<div className={cn(
  "rounded-lg border p-4",
  variant === "destructive" && "border-red-200 bg-red-50",
  size === "lg" && "p-6 text-lg"
)} />

// Sử dụng Shadcn/ui với custom styling
<Button 
  variant="outline" 
  size="sm"
  className="hover:bg-primary/90"
>
  Custom Button
</Button>
```

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router) với Turbopack
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui + Radix UI
- **HTTP Client**: Axios với interceptors
- **Validation**: Zod v4
- **Form Handling**: React Hook Form với Zod resolver
- **Icons**: Lucide React
- **Class Management**: clsx + tailwind-merge

## 📝 Naming Conventions

- **Files**: PascalCase cho components (`LoginForm.tsx`), kebab-case cho pages
- **Variables**: camelCase (`userName`, `isLoading`)  
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS`, `PUBLIC_ROUTES`)
- **Types/Interfaces**: PascalCase (`UserData`, `AuthContextType`)
- **Enums**: PascalCase với helper functions (`Role`, `getRoleLabel`)
- **API endpoints**: snake_case theo backend convention

## 🔧 Available Scripts

```bash
npm run dev          # Development server với Turbopack
npm run build        # Build production optimized
npm run start        # Start production server  
npm run lint         # ESLint với Next.js config
```

## 🚀 Development Tips

1. **Import paths**: Sử dụng `@/` prefix cho absolute imports
2. **Type safety**: Luôn define types trước khi implement
3. **Error handling**: axiosInstance tự động handle 401/403
4. **Role checking**: Sử dụng useAuth hook với role array
5. **Form validation**: Combine Zod + React Hook Form cho type safety
6. **Styling**: Prefer Tailwind utilities + Shadcn components
7. **Constants**: Centralize trong `/constants` thay vì hardcode
