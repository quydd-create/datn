"use client";

import { Role } from '@/enums';
import { useAuth } from '@/hooks/useAuth';

export default function AdminDashboard() {
  return (
      <AdminDashboardContent />
  );
}

function AdminDashboardContent() {

  const { user, loading } = useAuth([Role.ADMIN]);

  if(loading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Quản trị viên
          </h1>
          <p className="mt-2 text-gray-600">
            Chào mừng, {user?.first_name} {user?.last_name}!
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Thông tin người dùng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Số điện thoại:</strong> {user?.phone_number}</p>
              <p><strong>Vai trò:</strong> {user?.roles?.join(', ')}</p>
            </div>
            <div>
              <p><strong>Số dư:</strong> {user?.available_balance?.toLocaleString()} VND</p>
              <p><strong>Ngân hàng:</strong> {user?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}