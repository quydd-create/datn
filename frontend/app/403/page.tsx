"use client";

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Forbidden() {
  const router = useRouter();
  const { user } = useAuth();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>

        {/* Error Content */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">403</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Truy cập bị từ chối
          </h2>
          <p className="text-gray-600 mb-2">
            {user 
              ? "Bạn không có quyền truy cập vào trang này." 
              : "Bạn cần đăng nhập để truy cập trang này."
            }
          </p>
          {user && (
            <p className="text-sm text-gray-500">
              Tài khoản: {user.email} - Vai trò: {user.roles?.join(', ') || 'Không xác định'}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleGoHome}
            className="w-full"
            variant="default"
          >
            Về trang chủ
          </Button>
          
          <Button 
            onClick={handleGoBack}
            className="w-full"
            variant="outline"
          >
            Quay lại
          </Button>

          {!user && (
            <Button 
              onClick={handleLogin}
              className="w-full"
              variant="secondary"
            >
              Đăng nhập
            </Button>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Cần hỗ trợ?</strong>
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Liên hệ với quản trị viên nếu bạn cho rằng đây là lỗi.
          </p>
        </div>
      </div>
    </div>
  );
}