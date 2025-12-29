"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import "@/public/captcha_icon.png";
import "@/public/illustration.png";

import { Eye, EyeOff } from "lucide-react";

import { NavLink } from "@/components/ui/navlink";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { authService } from "@/services/auth-service";
import { LoginRequest } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";


export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        defaultValues: {
            email: "",
            password: "",
            recaptcha: false,
        },
    });

    const onSubmit = async (data: LoginRequest) => {
        setGeneralError(null);
        try {
            setLoading(true);
            const res = await authService.login({
                email: data.email,
                password: data.password,
            });
            localStorage.setItem("auth_token", res.access_token);
            router.push("/");
        } catch (error: any) {
            setGeneralError(
                error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
            );
        } finally {
            setLoading(false);
        }
    };

    const onError = (errors: any) => {
        console.log("Form validation errors:", errors);
    };

    const inputBaseClass =
        "w-full px-3 py-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
    const inputNormalClass = `${inputBaseClass} border-gray-300 focus:ring-blue-500 focus:border-blue-500`;
    const inputErrorClass = `${inputBaseClass} border-red-300 focus:ring-red-500 focus:border-red-500`;
    const checkboxClass =
        "w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-2 delay-300";
    const linkClass = "text-3xl font-bold text-[#26543C] hover:text-green-500 sm:text-base";

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center bg-emerald-50 p-4 lg:p-10">
            <div className="flex-col items-center justify-center text-center lg:text-left lg:mr-20 mb-10 lg:mb-0">
                <img
                    src="/illustration.png"
                    alt="Login Illustration"
                    className="hidden sm:block max-w-xs sm:max-w-md lg:max-w-lg w-full h-auto mx-auto lg:mx-0"
                />

                <p className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-bold text-[#24BA6C]">
                    MUA ĐỒ CŨ,
                </p>
                <p className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold text-[#24BA6C]">
                    GIÁ TRỊ MỚI,
                </p>
                <p className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold text-[#24BA6C]">
                    XANH BỀN VỮNG.
                </p>
            </div>

            <div className="w-full max-w-lg sm:max-w-xl lg:max-w-3xl space-y-7">
                <div className="text-center">
                    <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-[#26543C]">
                        Đăng nhập
                    </h2>
                </div>

                <form
                    className="space-y-6 bg-white p-6 sm:p-8 lg:p-9 shadow-2xl rounded-2xl"
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    {generalError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                            {generalError}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xl sm:text-2xl font-bold text-[#26543C]"
                        >
                            Email
                        </label>
                        <div className="mt-1">
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                {...register("email")}
                                className={errors.email ? inputErrorClass : inputNormalClass}
                                placeholder="* Nhập email của bạn"
                                disabled={loading}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message as string}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xl sm:text-2xl font-bold text-[#26543C]"
                        >
                            Mật khẩu
                        </label>
                        <div className="mt-1 relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="password"
                                {...register("password")}
                                className={errors.password ? inputErrorClass : inputNormalClass}
                                placeholder="* Nhập mật khẩu"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                                ) : (
                                    <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message as string}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center p-2 border rounded-md bg-white shadow-sm mt-4 mb-4">
                                <Controller
                                    name="recaptcha"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="not-for-robot"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className={checkboxClass}
                                            disabled={loading}
                                        />
                                    )}
                                />
                                <label
                                    htmlFor="not-for-robot"
                                    className="ml-4 text-base sm:text-xl lg:text-2xl text-gray-900"
                                >
                                    Tôi không phải là robot
                                </label>
                                <img
                                    src="/captcha_icon.png"
                                    alt="Captcha Icon"
                                    className="ml-8 w-8 h-8 sm:w-10 sm:h-10"
                                />
                            </div>
                            {errors.recaptcha && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.recaptcha.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-fit bg-green-900 h-10 sm:h-12"
                        >
                            <p className="text-xl sm:text-2xl m-2">
                                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                            </p>
                        </Button>

                        <NavLink
                            href="/forgot_password"
                            className={linkClass}
                        >
                            Quên mật khẩu?
                        </NavLink>
                    </div>
                </form>

                <div className="flex-col items-center justify-center text-center">
                    <p className="text-5xl sm:text-3xl text-[#26543C] font-bold">
                        THAM GIA <span className="text-[#24BA6C]">VÒNG ĐỜI MỚI ©</span>
                    </p>

                    <p className="text-xl ml-3 mr-3 sm:text-2xl font-normal mt-2">
                        Là thành viên, bạn có thể mua bán đồ cũ, tìm kiếm điều mới mẻ và
                        đóng góp cho xu hướng tiêu dùng xanh.
                    </p>
                    <p className="text-xl sm:text-2xl font-normal">
                        Đặc biệt, việc đăng ký hoàn toàn miễn phí!
                    </p>

                    <div className="flex mt-4 items-center justify-center">
                        <Button className="bg-white border-green-900 rounded-2xl px-6 py-7">
                            <NavLink
                                href="/register"
                                className="text-lg sm:text-2xl m-1 text-[#24BA6C] font-bold"
                            >
                                Đăng ký ngay
                            </NavLink>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
