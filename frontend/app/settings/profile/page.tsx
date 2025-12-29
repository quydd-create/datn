"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogroup";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllGenders, getGenderLabel } from "@/enums";
import { useAuth } from "@/hooks/useAuth";
import { ProfileFormData, profileSchema } from "@/schemas/user";
import { userService } from "@/services";
import { formatDate } from "@/utils/formatDate";
import { getImageUrl } from "@/utils/imageUrl";
import { parseDate } from "@/utils/parseToDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Profile() {
    const { loading, user, refetch, avatarVersion, incrementAvatarVersion } = useAuth();
    const [openCalendar, setOpenCalendar] = useState(false);
    const [uploading, setUploading] = useState(false);

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        mode: "onTouched",
        defaultValues: {
            gender: "",
            last_name: "",
            first_name: "",
            dob: "",
        },
    });

    // Reset form values when user data is loaded
    useEffect(() => {
        if (user && !loading) {
            form.reset({
                gender: user.gender ?? "",
                last_name: user.last_name ?? "",
                first_name: user.first_name ?? "",
                dob: formatDate(new Date(user.dob ?? "")),
            });
        }
    }, [user, loading, form]);

    const onSubmit = async (data: ProfileFormData) => {
        try {
            data.dob = data.dob.replace(/\//g, '-');
            await userService.updateProfile(data);
            await refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setUploading(true);
                await userService.updateAvatar(file);
                incrementAvatarVersion(); // Increment version to bust cache
                await refetch();
            } catch (error) {
                console.log(error);
            } finally {
                setUploading(false);
            }
        }
    };

    const dobValue = form.watch("dob");
    const selectedDate = parseDate(dobValue ?? "");

    if (loading) {
        return (
            <div className="flex flex-col gap-4 w-full px-4 sm:px-6 lg:px-8">
                {/* Title Skeleton */}
                <Skeleton className="h-[50px] w-64 mt-[60px]" />

                <div className="flex flex-col gap-4 lg:gap-6">
                    {/* Avatar Section Skeleton - Mobile/iPad */}
                    <div className="flex flex-row items-center justify-between gap-4 md:gap-6 lg:hidden">
                        <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6">
                            <Skeleton className="rounded-full w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]" />
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
                            <Skeleton className="w-[60px] h-[37px] sm:w-[70px] sm:h-[43px] md:w-[81px] md:h-[50px]" />
                            <Skeleton className="h-[60px] sm:h-[60px] md:h-[76px] w-[120px] sm:w-[140px] md:w-[160px]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                        {/* Form Skeleton */}
                        <Card className="lg:col-span-2">
                            <div className="bg-white p-4 sm:p-6 lg:p-8 xl:p-9 flex flex-col gap-4 rounded-2xl">
                                {/* Name Fields Skeleton */}
                                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                    <div className="flex-1 w-full sm:w-auto">
                                        <Skeleton className="h-5 w-12 mb-2" />
                                        <Skeleton className="h-[50px] w-full" />
                                    </div>
                                    <div className="flex-1 w-full sm:w-auto">
                                        <Skeleton className="h-5 w-12 mb-2" />
                                        <Skeleton className="h-[50px] w-full" />
                                    </div>
                                </div>

                                {/* Gender Skeleton */}
                                <div>
                                    <Skeleton className="h-5 w-20 mb-2" />
                                    <div className="flex gap-4">
                                        <Skeleton className="h-8 w-24" />
                                        <Skeleton className="h-8 w-24" />
                                        <Skeleton className="h-8 w-24" />
                                    </div>
                                </div>

                                {/* Phone & Email Skeleton */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                                        <Skeleton className="h-5 w-32" />
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-8 w-8" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                                        <Skeleton className="h-5 w-20" />
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-5 w-40" />
                                            <Skeleton className="h-8 w-8" />
                                        </div>
                                    </div>

                                    {/* DOB Skeleton */}
                                    <div>
                                        <Skeleton className="h-5 w-24 mb-2" />
                                        <Skeleton className="h-[50px] w-full" />
                                    </div>
                                </div>

                                {/* Submit Button Skeleton */}
                                <Skeleton className="h-10 w-40" />
                            </div>
                        </Card>

                        {/* Avatar Section Skeleton - Desktop */}
                        <div className="hidden lg:flex flex-col gap-3 sm:gap-4 justify-center items-center lg:col-span-1">
                            <Skeleton className="rounded-full w-[212px] h-[212px]" />
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="w-[81px] h-[50px]" />
                            <Skeleton className="h-[76px] w-[200px]" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full px-4 sm:px-6 lg:px-8">
            <h1 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-bold text-[#26543C] mt-[20px] sm:mt-[40px] lg:mt-[60px]">
                Hồ sơ của tôi
            </h1>
            <div className="flex flex-col gap-4 lg:gap-6">
                {/* Avatar Section - Horizontal on Mobile/iPad, Vertical on Desktop */}
                <div className="flex flex-row items-center justify-between gap-4 md:gap-6 lg:hidden">
                    <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6">
                        <div className="rounded-full w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] flex items-center justify-center overflow-hidden bg-white shrink-0">
                            <Image
                                src={user?.avatar_url ? `${getImageUrl(user.avatar_url)}?v=${avatarVersion}` : "/settings/profile/Avatar.png"}
                                alt="Avatar"
                                width={140}
                                height={140}
                                key={`avatar-${avatarVersion}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <label htmlFor="avatar" className="text-[12px] sm:text-[14px] md:text-[16px] font-bold text-[#26543C] cursor-pointer bg-white hover:bg-[#26543C] hover:text-white px-2 sm:px-3 md:px-4 border border-[#26543C] py-1.5 sm:py-2 rounded-md text-center whitespace-nowrap">
                                Chọn ảnh
                            </label>
                            <Input
                                type="file"
                                id="avatar"
                                className="w-full cursor-pointer h-[50px] text-[20px] p-2 border hidden border-[#E0E0E0] rounded-md"
                                placeholder="Chọn ảnh"
                                onChange={handleAvatarChange}
                            />
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-[#929292]">Dung lượng tối đa: 1MB</span>
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-[#929292]">Định dạng: jpg, png, webp</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
                        <Image
                            src="/settings/profile/AddShopIcon.svg"
                            alt="Thêm cửa hàng"
                            width={60}
                            height={37}
                            className="sm:w-[70px] sm:h-[43px] md:w-[81px] md:h-[50px] cursor-pointer hover:opacity-80"
                        />
                        <Button className="bg-transparent h-auto sm:h-[60px] md:h-[76px] cursor-pointer border border-[#26543C] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#cfd4d2] p-1.5 sm:p-2 md:p-2.5">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <Image
                                    src="/settings/profile/StoreIcon.svg"
                                    alt="Cửa hàng"
                                    width={40}
                                    height={40}
                                    className="sm:w-[45px] sm:h-[45px] md:w-[55px] md:h-[55px]"
                                />
                                <div className="flex flex-col">
                                    <h4 className="text-[18px] sm:text-[24px] md:text-[28px] lg:text-[35px] font-bold text-[#26543C]">
                                        Tí Nị
                                    </h4>
                                    <p className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[20px] text-[#24BA6C]">
                                        Hồ Chí Minh
                                    </p>
                                </div>
                            </div>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                    <Card className="lg:col-span-2">
                        <Form {...form}>
                            <form
                                className="bg-white p-4 sm:p-6 lg:p-8 xl:p-9 flex flex-col gap-4 rounded-2xl"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                    <FormField
                                        control={form.control}
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem className="flex-1 w-full sm:w-auto">
                                                <FormLabel className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#26543C]">
                                                    Họ
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="* Nhập họ..."
                                                        className="w-full h-[44px] sm:h-[48px] lg:h-[50px] text-[16px] sm:text-[18px] lg:text-[20px] p-2 border border-[#E0E0E0] rounded-md"
                                                        value={field.value ?? ""}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem className="flex-1 w-full sm:w-auto">
                                                <FormLabel className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#26543C]">
                                                    Tên
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="* Nhập tên..."
                                                        className="w-full h-[44px] sm:h-[48px] lg:h-[50px] text-[16px] sm:text-[18px] lg:text-[20px] p-2 border border-[#E0E0E0] rounded-md"
                                                        value={field.value ?? ""}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#26543C]">
                                                Giới tính
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value ?? ""}
                                                    onValueChange={field.onChange}
                                                    className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4"
                                                >
                                                    {getAllGenders().map((g) => (
                                                        <label
                                                            key={g.label}
                                                            className="flex items-center gap-2 sm:gap-3"
                                                        >
                                                            <RadioGroupItem
                                                                value={g.value}
                                                                id={`gender-${g.value}`}
                                                            />
                                                            <span
                                                                className={`select-none text-[18px] sm:text-[20px] lg:text-2xl ${field.value === g.value ? "text-[#24BA6C]" : ""
                                                                    }`}
                                                            >
                                                                {getGenderLabel(g.value)}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-col justify-between gap-4">
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                                        <label
                                            htmlFor="phone_number"
                                            className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#26543C]"
                                        >
                                            Số điện thoại
                                        </label>
                                        <div className="flex items-center gap-2 sm:gap-4">
                                            <p className="text-[14px] sm:text-[16px] lg:text-[20px] text-[#26543C] break-all">
                                                {user?.phone_number ?? ""}
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="text-[16px] sm:text-[18px] lg:text-[20px] cursor-pointer text-[#26543C] shrink-0"
                                            >
                                                <Image
                                                    src="/settings/profile/EditIcon.svg"
                                                    alt="Sửa"
                                                    width={18}
                                                    height={18}
                                                    className="sm:w-5 sm:h-5"
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                                        <label
                                            htmlFor="email"
                                            className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#26543C]"
                                        >
                                            Email
                                        </label>
                                        <div className="flex items-center gap-2 sm:gap-4">
                                            <p className="text-[14px] sm:text-[16px] lg:text-[20px] text-[#26543C] break-all">
                                                {user?.email ?? ""}
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="text-[16px] sm:text-[18px] lg:text-[20px] cursor-pointer text-[#26543C] shrink-0"
                                            >
                                                <Image
                                                    src="/settings/profile/EditIcon.svg"
                                                    alt="Sửa"
                                                    width={18}
                                                    height={18}
                                                    className="sm:w-5 sm:h-5"
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#26543C]">
                                                    Ngày sinh
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="* dd/mm/yyyy"
                                                            className="w-full px-3 py-3 sm:py-4 text-[14px] sm:text-[16px] lg:text-[18px] border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                            disabled={loading}
                                                            value={field.value ?? ""}
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                            }}
                                                        />
                                                        <Popover
                                                            open={openCalendar}
                                                            onOpenChange={setOpenCalendar}
                                                        >
                                                            <PopoverTrigger asChild>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setOpenCalendar((s) => !s)}
                                                                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                                                    disabled={loading}
                                                                    aria-label="Chọn ngày sinh"
                                                                >
                                                                    <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="end">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={selectedDate}
                                                                    onSelect={(date) => {
                                                                        if (date) {
                                                                            field.onChange(formatDate(date));
                                                                            setOpenCalendar(false);
                                                                        }
                                                                    }}
                                                                    disabled={(date) =>
                                                                        date > new Date() ||
                                                                        date < new Date("1900-01-01")
                                                                    }
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-[#26543C] cursor-pointer flex justify-center items-center text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-[14px] sm:text-[16px] lg:text-[18px] w-full sm:w-auto"
                                >
                                    Hoàn tất chỉnh sửa
                                </Button>
                            </form>
                        </Form>
                    </Card>
                    {/* Avatar Section - Desktop Only (Vertical) */}
                    <div className="hidden lg:flex flex-col gap-3 sm:gap-4 justify-center items-center lg:col-span-1">
                        <div className="rounded-full w-[212px] h-[212px] flex items-center justify-center overflow-hidden bg-white">
                            <Image
                                src={user?.avatar_url ? `${getImageUrl(user.avatar_url)}?v=${avatarVersion}` : "/settings/profile/Avatar.png"}
                                alt="Avatar"
                                width={212}
                                height={212}
                                key={`avatar-${avatarVersion}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <label htmlFor="avatar-desktop" className="text-[20px] font-bold text-[#26543C] cursor-pointer bg-white hover:bg-[#26543C] hover:text-white px-4 border border-[#26543C] py-2 rounded-md text-center">
                            Chọn ảnh
                        </label>
                        <Input
                            type="file"
                            id="avatar-desktop"
                            className="w-full cursor-pointer h-[50px] text-[20px] p-2 border hidden border-[#E0E0E0] rounded-md"
                            placeholder="Chọn ảnh"
                            onChange={handleAvatarChange}
                        />
                        <div className="flex flex-col text-center">
                            <span className="text-[15px] text-[#929292]">Dung lượng file tối đa: 1MB</span>
                            <span className="text-[15px] text-[#929292]">Định dạng: jpg, png, webp, jpeg</span>
                        </div>
                        <Image
                            src="/settings/profile/AddShopIcon.svg"
                            alt="Thêm cửa hàng"
                            width={81}
                            className="cursor-pointer hover:opacity-80"
                            height={50}
                        />
                        <Button className="bg-transparent h-[76px] cursor-pointer border border-[#26543C] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#cfd4d2] p-2.5">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/settings/profile/StoreIcon.svg"
                                    alt="Cửa hàng"
                                    width={55}
                                    height={55}
                                />
                                <div className="flex flex-col">
                                    <h4 className="text-[35px] font-bold text-[#26543C]">
                                        Tí Nị
                                    </h4>
                                    <p className="text-[20px] text-[#24BA6C]">
                                        Hồ Chí Minh
                                    </p>
                                </div>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
