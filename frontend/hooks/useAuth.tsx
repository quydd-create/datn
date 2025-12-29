"use client";

import { PUBLIC_ROUTES } from '@/constants';
import { Role } from '@/enums';
import { userService } from '@/services';
import type { AuthContextType, User } from '@/types';
import { usePathname } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook có kiểm tra quyền và auto redirect
export const useAuth = (roles?: Role[]) => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const { user, loading } = context;

    useEffect(() => {
        // Chỉ kiểm tra quyền khi đã load xong user và có roles được yêu cầu
        if (!loading && roles && roles.length > 0) {
            // Nếu không có user thì redirect login
            if (!user) {
                window.location.href = '/login';
                return;
            }

            // Nếu có user nhưng không có roles hoặc không có quyền thì redirect 403
            if (!user.roles || !roles.some(role => user.roles.includes(role))) {
                window.location.href = '/403';
                return;
            }
        }
    }, [user, loading, roles]);

    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [avatarVersion, setAvatarVersion] = useState(0);

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    const incrementAvatarVersion = () => {
        setAvatarVersion(prev => prev + 1);
    };

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await userService.getCurrentUser();
            setUser(data);
            setLoading(false);
        } catch (err: unknown) {
            console.error('Failed to fetch user:', err);
            const error = err as { response?: { status?: number; data?: { detail?: string } } };

            // Handle 401 Unauthorized - invalid or missing credentials
            if (error.response?.status === 401) {
                setError('Authentication failed: Please login again');
                // Redirect to login URL immediately
                window.location.href = '/login';
                return;
            }
            // Handle 403 Forbidden - insufficient permissions
            else if (error.response?.status === 403) {
                setError('Access denied: You do not have permission to access this application');
                // Redirect to login URL after a short delay for access denied
                setTimeout(() => {
                    window.location.href = '/403';
                }, 1000);
                return;
            }
            // Handle other errors
            else {
                setError(error.response?.data?.detail || 'Authentication failed');
            }
            setUser(null);
        }
    };

    useEffect(() => {
        // Chỉ fetch user nếu không phải public route
        if (!isPublicRoute) {
            fetchUser();
        } else {
            setLoading(false); // Set loading false cho public routes
        }
    }, [isPublicRoute]);

    const refetch = async () => {
        await fetchUser();
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, refetch, avatarVersion, incrementAvatarVersion }}>
            {children}
        </AuthContext.Provider>
    );
};
