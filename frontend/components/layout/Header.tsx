"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { authService } from "@/services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";

const Header = () => {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState<string | null>(null);

    const handleMouseEnter = (name: string) => {
        setIsFocused(name);
    };

    const handleMouseLeave = () => {
        setIsFocused(null);
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem("auth_token");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="flex flex-col shadow-(--header-shadow) bg-white border-[#D9D9D9] border gap-4 py-4 px-2 ">
            <div className="flex items-center max-sm:justify-between gap-4">
                <img
                    src="/header-logo.png"
                    alt="Logo"
                    className="h-8 shrink-0 cursor-pointer"
                    onClick={() => router.push("/")}
                />
                <div className="relative flex-1 max-sm:hidden">
                    <Input
                        className="pr-10 rounded-[10px] w-full border-black"
                        placeholder="Nhập thông tin để tìm kiếm..."
                    />
                    <img
                        src="/search.png"
                        alt="Search"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 cursor-pointer"
                    />
                </div>
                <div className="flex justify-between gap-4">
                    <button className="cursor-pointer hover:bg-gray-100 rounded active:bg-gray-200">
                        <img src="/buy_tab.png" alt="Buy Tab" className="h-8 w-8 mx-2" />
                    </button>
                    <button className="cursor-pointer hover:bg-gray-100 rounded active:bg-gray-200">
                        <img src="/cart_tab.png" alt="Cart Tab" className="h-8 w-8 mx-2" />
                    </button>
                    <Avatar className="transition-all duration-200 hover:brightness-75 active:brightness-50">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <AvatarImage
                                    className="cursor-pointer"
                                    src="https://github.com/shadcn.png"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="bg-[#ECF2EF]"
                                onMouseLeave={handleMouseLeave}
                            >
                                <DropdownMenuItem
                                    className="cursor-pointer focus:bg-[#26543C] focus:text-white"
                                    onMouseEnter={() => handleMouseEnter("account")}
                                    onClick={() => router.push("/settings/profile")}
                                >
                                    <Image
                                        src={
                                            isFocused === "account"
                                                ? "/WhiteAccountIcon.svg"
                                                : "/BlackAccountIcon.svg"
                                        }
                                        alt="Account Icon"
                                        width={16}
                                        height={16}
                                    />
                                    Tài khoản của tôi
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer focus:bg-[#26543C] focus:text-white"
                                    onMouseEnter={() => handleMouseEnter("buy")}
                                >
                                    <Image
                                        src={
                                            isFocused === "buy"
                                                ? "/WhiteBuyIcon.svg"
                                                : "/BlackBuyIcon.svg"
                                        }
                                        alt="Buy Icon"
                                        width={16}
                                        height={16}
                                    />
                                    Đơn mua hàng
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer focus:bg-[#26543C] focus:text-white"
                                    onMouseEnter={() => handleMouseEnter("money")}
                                    onClick={() => router.push("/settings/offer-requests")}
                                >
                                    <Image
                                        src={
                                            isFocused === "money"
                                                ? "/WhiteMoneyIcon.svg"
                                                : "/BlackMoneyIcon.svg"
                                        }
                                        alt="Money Icon"
                                        width={16}
                                        height={16}
                                        className="w-4 h-4"
                                    />
                                    Theo dõi trả giá
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer focus:bg-[#26543C] focus:text-white"
                                    onMouseEnter={() => handleMouseEnter("bid")}
                                    onClick={() => router.push("/settings/bids")}
                                >
                                    <Image
                                        src={
                                            isFocused === "bid"
                                                ? "/WhiteBidIcon.svg"
                                                : "/BlackBidIcon.svg"
                                        }
                                        alt="Bid Icon"
                                        width={16}
                                        height={16}
                                    />
                                    Theo dõi đấu thầu
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer focus:bg-[#26543C] focus:text-white"
                                    onMouseEnter={() => handleMouseEnter("favorite")}
                                    onClick={() => router.push("/settings/favorite")}
                                >
                                    <Image
                                        src={
                                            isFocused === "favorite"
                                                ? "/WhiteFavoriteIcon.svg"
                                                : "/BlackFavoriteIcon.svg"
                                        }
                                        alt="Favorite Icon"
                                        width={16}
                                        height={16}
                                    />
                                    Sản phẩm yêu thích
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer focus:bg-[#26543C] focus:text-white"
                                    onClick={handleLogout}
                                    onMouseEnter={() => handleMouseEnter("logout")}
                                >
                                    <Image
                                        src={
                                            isFocused === "logout"
                                                ? "/WhiteLogoutIcon.svg"
                                                : "/BlackLogoutIcon.svg"
                                        }
                                        alt="Logout Icon"
                                        width={16}
                                        height={16}
                                    />
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Avatar>
                </div>
            </div>
            <div className="relative flex-1 sm:hidden">
                <Input
                    className="pr-10 rounded-[10px] w-full border-black"
                    placeholder="Nhập thông tin để tìm kiếm..."
                />
                <Image
                    src="/search.png"
                    alt="Search"
                    width={16}
                    height={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default Header;
