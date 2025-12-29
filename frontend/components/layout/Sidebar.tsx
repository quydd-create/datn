"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/utils/imageUrl";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen: controlledIsOpen, onClose }: SidebarProps = {}) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading, avatarVersion } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // Use controlled state if provided, otherwise use internal state
    const sidebarOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;

    // Close sidebar when route changes
    useEffect(() => {
        if (sidebarOpen) {
            if (onClose) {
                onClose();
            } else {
                setIsOpen(false);
            }
        }
    }, [pathname]);

    const isActive = (path: string) => pathname === path;

    if (loading) {
        return (
            <div
                className={cn(
                    "fixed md:relative top-0 left-0 h-screen w-[280px] md:w-[280px] lg:w-[336px] flex-col items-center mt-0 md:mt-[20px] lg:mt-[60px] gap-2 select-none px-2 sm:px-4 bg-white md:bg-transparent z-50 md:z-auto",
                    "flex",
                    "transition-transform duration-300 ease-in-out",
                    "translate-x-0",
                    "shadow-lg md:shadow-none"
                )}
            >
                {/* Avatar Skeleton - Desktop Only */}
                <div className="hidden lg:block">
                    <Skeleton className="rounded-full w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px]" />
                </div>
                {/* Name Skeleton - Desktop Only */}
                <div className="hidden lg:block">
                    <Skeleton className="h-5 w-32 mt-2" />
                </div>
                {/* Menu Items Skeleton */}
                <div className="flex flex-col gap-2 w-full mt-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex gap-2 items-start ml-4 md:ml-6 lg:ml-8">
                            <Skeleton className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] lg:w-[33px] lg:h-[33px] shrink-0" />
                            <div className="flex flex-col gap-1.5 flex-1">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const handleToggle = () => {
        if (controlledIsOpen !== undefined) {
            // Controlled mode - need a way to toggle, but we don't have onOpen
            // For now, just close if open
            if (controlledIsOpen && onClose) {
                onClose();
            }
        } else {
            // Uncontrolled mode - internal state
            setIsOpen(prev => !prev);
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Menu Button for Mobile/Tablet */}
            <Button
                variant="outline"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-lg"
                onClick={handleToggle}
            >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
                    onClick={handleClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed md:relative top-0 left-0 h-screen w-[280px] md:w-[280px] lg:w-[336px] flex-col items-center mt-0 md:mt-[20px] lg:mt-[60px] gap-2 select-none px-2 sm:px-4 bg-white md:bg-transparent z-50 md:z-auto",
                    "flex",
                    "transition-transform duration-300 ease-in-out",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                    "shadow-lg md:shadow-none"
                )}
            >
                {/* Close button inside sidebar for mobile */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 md:hidden"
                    onClick={handleClose}
                >
                    <X className="h-6 w-6" />
                </Button>
                <div className="hidden lg:flex rounded-full w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] items-center justify-center overflow-hidden bg-white">
                    <Image
                        src={user?.avatar_url ? `${getImageUrl(user.avatar_url)}?v=${avatarVersion}` : "/settings/sidebar/avatar.png"}
                        alt="Avatar"
                        width={80}
                        height={80}
                        key={`sidebar-avatar-${avatarVersion}`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="hidden lg:block text-[16px] md:text-[18px] lg:text-[20px] text-[#111111] text-center px-2">{user?.first_name} {user?.last_name}</span>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-2 items-start ml-4 md:ml-6 lg:ml-8">
                        <Image src="/BlackAccountIcon.svg" alt="Account Icon" width={28} height={28} className="md:w-[30px] md:h-[30px] lg:w-[33px] lg:h-[33px] shrink-0" />
                        <div className="text-[16px] md:text-[18px] lg:text-[20px] flex flex-col gap-1 sm:gap-1.5 mt-0.5">
                            <h2 className="font-bold text-[#111111]">
                                Tài khoản của tôi
                            </h2>
                            <span className={cn("cursor-pointer text-[14px] md:text-[16px] lg:text-[18px]", isActive("/settings/profile") && "text-[#DC3545]")} onClick={() => router.push("/settings/profile")}>Hồ sơ</span>
                            <span className={cn("cursor-pointer text-[14px] md:text-[16px] lg:text-[18px]", isActive("/settings/addresses") && "text-[#DC3545]")} onClick={() => router.push("/settings/addresses")}>Địa chỉ</span>
                            <span className={cn("cursor-pointer text-[14px] md:text-[16px] lg:text-[18px]", isActive("/settings/change-password") && "text-[#DC3545]")} onClick={() => router.push("/settings/change-password")}>Đổi mật khẩu</span>
                            <span className={cn("cursor-pointer text-[14px] md:text-[16px] lg:text-[18px]", isActive("/settings/carbon-points") && "text-[#DC3545]")} onClick={() => router.push("/settings/carbon-points")}>Điểm carbon</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-start ml-4 md:ml-6 lg:ml-8">
                        <Image src={isActive("/settings/vouchers") ? "/settings/sidebar/RedVoucherIcon.svg" : "/settings/sidebar/BlackVoucherIcon.svg"} alt="Voucher Icon" width={28} height={28} className="md:w-[30px] md:h-[30px] lg:w-[33px] lg:h-[33px] shrink-0" />
                        <div className="text-[16px] md:text-[18px] lg:text-[20px] flex flex-col gap-1 sm:gap-1.5">
                            <h2 className={cn("font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#111111] cursor-pointer", isActive("/settings/vouchers") && "text-[#DC3545]")} onClick={() => router.push("/settings/vouchers")}>
                                Kho voucher
                            </h2>
                        </div>
                    </div>
                    <div className="flex gap-2 items-start ml-4 md:ml-6 lg:ml-8">
                        <Image src={isActive("/settings/offer-requests") ? "/settings/sidebar/RedMoneyIcon.svg" : "/BlackMoneyIcon.svg"} alt="Money Icon" width={24} height={24} className="md:w-[26px] md:h-[26px] lg:w-[28px] lg:h-[28px] shrink-0" />
                        <div className="text-[16px] md:text-[18px] lg:text-[20px] flex flex-col gap-1 sm:gap-1.5 mt-1 sm:mt-2">
                            <h2 className={cn("font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#111111] cursor-pointer", isActive("/settings/offer-requests") && "text-[#DC3545]")} onClick={() => router.push("/settings/offer-requests")}>
                                Theo dõi trả giá
                            </h2>
                        </div>
                    </div>
                    <div className="flex gap-2 items-start ml-4 md:ml-6 lg:ml-8">
                        <Image src="/BlackBidIcon.svg" alt="Bid Icon" width={28} height={28} className="md:w-[30px] md:h-[30px] lg:w-[33px] lg:h-[33px] shrink-0" />
                        <div className="text-[16px] md:text-[18px] lg:text-[20px] flex flex-col gap-1 sm:gap-1.5 mt-0.5">
                            <h2 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#111111]">
                                Theo dõi đấu thầu
                            </h2>
                            <span className={cn("cursor-pointer text-[14px] md:text-[16px] lg:text-[18px]", isActive("/settings/bids/create") && "text-[#DC3545]")} onClick={() => router.push("/settings/bids/create")}>Đăng tin đấu thầu</span>
                            <span className={cn("cursor-pointer text-[14px] md:text-[16px] lg:text-[18px]", isActive("/settings/bids") && "text-[#DC3545]")} onClick={() => router.push("/settings/bids")}>Xem đơn dự thầu</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-start ml-4 md:ml-6 lg:ml-8">
                        <Image src={isActive("/settings/favorite") ? "/settings/sidebar/RedFavoriteIcon.svg" : "/BlackFavoriteIcon.svg"} alt="Favorite Icon" width={28} height={28} className="md:w-[30px] md:h-[30px] lg:w-[33px] lg:h-[33px] shrink-0" />
                        <div className="text-[16px] md:text-[18px] lg:text-[20px] flex flex-col gap-1 sm:gap-1.5 mt-0.5">
                            <h2 className={cn("font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#111111] cursor-pointer", isActive("/settings/favorite") && "text-[#DC3545]")} onClick={() => router.push("/settings/favorite")}>
                                Sản phẩm yêu thích
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}