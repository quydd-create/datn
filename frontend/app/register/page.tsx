"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { NavLink } from "@/components/ui/navlink";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogroup";

import "@/public/captcha_icon.png";
import "@/public/illustration.png";

import { CalendarIcon, Eye, EyeOff, SendHorizonalIcon } from "lucide-react";

import { registerSchema, type RegisterFormData } from "@/schemas/auth";
import { authService } from "@/services/auth-service";
import { RegisterRequest } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getAllGenders, getGenderLabel } from "@/enums";
import { formatDate } from "@/utils/formatDate";
import { parseDate } from "@/utils/parseToDate";

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);

    const [sendingOTP, setSendingOTP] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [otpError, setOtpError] = useState<string | null>(null);
    const [otpSuccess, setOtpSuccess] = useState<string | null>(null);
    const [otpTimer, setOtpTimer] = useState(0);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Xử lý khi nhập từng ô
    const handleOtpChange = (index: number, value: string) => {
        // Chỉ cho phép nhập số
        if (!/^\d*$/.test(value)) return;

        const newOtp = otpCode.split("");
        // Chỉ lấy ký tự cuối cùng (trường hợp user gõ nhanh đè chữ)
        newOtp[index] = value.substring(value.length - 1);
        const finalOtp = newOtp.join("").slice(0, 6);

        setOtpCode(finalOtp);
        setOtpError(null); // Reset lỗi khi user nhập lại

        // Nếu nhập vào 1 số và chưa phải ô cuối -> Focus ô tiếp theo
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Xử lý nút Backspace (Xóa lùi)
    const handleOtpKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace") {
            // Nếu ô hiện tại trống và không phải ô đầu tiên -> Focus về ô trước đó
            if (!otpCode[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    // Xử lý Paste (Dán cả chuỗi 123456 vào)
    const handleOtpPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);
        setOtpCode(pastedData);
        setOtpError(null);
        // Focus vào ô cuối cùng của chuỗi vừa paste
        if (pastedData.length > 0) {
            inputRefs.current[Math.min(pastedData.length - 1, 5)]?.focus();
        }
    };

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched",
        defaultValues: {
            first_name: "",
            last_name: "",
            phone_number: "",
            dob: "",
            gender: "",
            email: "",
            password: "",
            confirm_password: "",
            otp_code: "",
            recaptcha: false,
            agree_terms: false,
        },
    });

    const dobValue = watch("dob");
    const selectedDate = parseDate(dobValue);

    const emailValue = watch("email");

    useEffect(() => {
        if (otpTimer > 0) {
            const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [otpTimer]);

    const onSubmit = async (data: RegisterFormData) => {
        setGeneralError(null);

        if (!otpVerified) {
            setGeneralError("Vui lòng xác thực email trước khi đăng ký");
            return;
        }

        const { agree_terms, recaptcha, ...payload } =
            data;

        payload.dob = payload.dob.replace(/\//g, '-');

        try {
            setLoading(true);
            const res = await authService.register(payload as RegisterRequest);
            router.push("/login");
        } catch (error: any) {
            setGeneralError(
                error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
            );
        } finally {
            setLoading(false);
        }
    };

    const sendOTP = async () => {
        setOtpError(null);
        setOtpSuccess(null);

        // Validate email
        if (!emailValue || !emailValue.includes("@")) {
            setOtpError("Email không hợp lệ");
            return;
        }

        try {
            setSendingOTP(true);

            await authService.generateOTP({ email: emailValue, is_forget_password: false });

            setOtpSent(true);
            setOtpTimer(60); // 60 giây timer
            setOtpSuccess("OTP đã được gửi đến email của bạn");
        } catch (error: any) {
            setOtpError(
                error.response?.data?.message || "Không thể gửi OTP. Vui lòng thử lại."
            );
        } finally {
            setSendingOTP(false);
        }
    };

    const verifyOTP = async () => {
        setOtpError(null);

        if (!otpCode || otpCode.length < 4) {
            setOtpError("OTP phải có ít nhất 4 ký tự");
            return;
        }

        try {
            setSendingOTP(true);
            await authService.verifyOTP({ email: emailValue, code: otpCode });

            setOtpVerified(true);
            setOtpSuccess("Email xác thực thành công!");
            setOtpCode("");
            setValue("otp_code", otpCode, { shouldValidate: true });
        } catch (error: any) {
            setOtpError(
                error.response?.data?.message ||
                "OTP không chính xác. Vui lòng thử lại."
            );
        } finally {
            setSendingOTP(false);
        }
    };

    const inputBaseClass =
        "w-full px-3 py-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
    const inputNormalClass = `${inputBaseClass} border-gray-300 focus:ring-blue-500 focus:border-blue-500`;
    const inputErrorClass = `${inputBaseClass} border-red-300 focus:ring-red-500 focus:border-red-500`;
    const checkboxClass =
        "w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-2 delay-300";
    const linkClass =
        "text-2xl font-bold text-[#26543C] hover:text-green-500 sm:text-base";

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row items-start justify-center bg-emerald-50 p-4 lg:p-10">
            <div className="flex-col items-center justify-center text-center lg:text-left lg:mr-20 mb-10 mt-10 lg:mb-0">
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
                        Đăng ký
                    </h2>
                </div>

                <div className="flex-col items-center justify-center text-center">
                    <p className="text-5xl sm:text-3xl text-[#26543C] font-bold">
                        THAM GIA <span className="text-[#24BA6C]">VÒNG ĐỜI MỚI ©</span>
                    </p>

                    <p className="text-xl ml-3 mr-3 sm:text-2xl font-normal mt-2">
                        Tham gia Vòng đời mới - nơi bạn tái sinh giá trị thông qua việc mua
                        bán, thanh lý và quyên góp đồ cũ. Đồng thời, nhận ưu đãi xanh độc
                        quyền và hỗ trợ ưu tiên dành riêng cho thành viên.
                    </p>
                </div>

                <form
                    className="space-y-6 bg-white p-6 sm:p-8 lg:p-9 shadow-2xl rounded-2xl"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {generalError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                            {generalError}
                        </div>
                    )}

                    <label className="block text-3xl sm:text-2xl font-bold text-[#26543C]">
                        Thông tin cá nhân
                    </label>
                    <div className="flex-col items-center space-y-5">
                        <div className="flex items-center space-x-1 mt-1">
                            <div>
                                <Input
                                    id="first_name"
                                    type="text"
                                    autoComplete="text"
                                    {...register("first_name")}
                                    className={
                                        errors.first_name ? inputErrorClass : inputNormalClass
                                    }
                                    placeholder="* Nhập Tên..."
                                    disabled={loading}
                                />
                                {errors.first_name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.first_name.message as string}
                                    </p>
                                )}
                            </div>
                            <div className="ml-7">
                                <Input
                                    id="last_name"
                                    type="text"
                                    autoComplete="text"
                                    {...register("last_name")}
                                    className={
                                        errors.last_name ? inputErrorClass : inputNormalClass
                                    }
                                    placeholder="* Nhập Họ..."
                                    disabled={loading}
                                />
                                {errors.last_name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.last_name.message as string}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <Input
                                id="phone_number"
                                type="number"
                                autoComplete="number"
                                {...register("phone_number")}
                                className={
                                    errors.phone_number ? inputErrorClass : inputNormalClass
                                }
                                placeholder="* Nhập Số điện thoại..."
                                disabled={loading}
                            />
                            {errors.phone_number && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.phone_number.message as string}
                                </p>
                            )}
                        </div>
                        <div className="flex-col items-center justify-between">
                            <div className="flex items-center justify-between">
                                <div className="relative">
                                    <Input
                                        id="dob"
                                        type="text"
                                        {...register("dob")}
                                        className={errors.dob ? inputErrorClass : inputNormalClass}
                                        placeholder="* dd/mm/yyyy"
                                        disabled={loading}
                                        value={dobValue}
                                        onChange={(e) => setValue("dob", e.target.value)}
                                    />

                                    <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                onClick={() => setOpenCalendar((s) => !s)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                                disabled={loading}
                                                aria-label="Chọn ngày sinh"
                                            >
                                                <CalendarIcon className="w-5 h-5" />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0" align="end">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={(date) => {
                                                    if (date) {
                                                        setValue("dob", formatDate(date));
                                                        setOpenCalendar(false);
                                                    }
                                                }}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="mr-3">
                                    <Controller
                                        name="gender"
                                        control={control}
                                        defaultValue={getAllGenders()[0].value ?? ""}
                                        render={({ field }) => (
                                            <RadioGroup
                                                value={field.value ?? ""}
                                                onValueChange={(val) => field.onChange(val)}
                                                className="flex space-x-4"
                                            >
                                                {getAllGenders().map((g) => (
                                                    <label
                                                        key={g.label}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <RadioGroupItem
                                                            value={g.value}
                                                            id={`gender-${g}`}
                                                        />
                                                        <span className={`select-none text-2xl sm:text-2xl ${field.value === g.value ? "text-[#24BA6C]" : ""}`}>
                                                            {getGenderLabel(g.value)}
                                                        </span>
                                                    </label>
                                                ))}
                                            </RadioGroup>
                                        )}
                                    />
                                    {errors.gender && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.gender.message as string}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {errors.dob && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.dob.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email with OTP */}
                    <div>
                        <label className="block text-3xl sm:text-2xl font-bold text-[#26543C]">
                            Bảo mật tài khoản
                        </label>

                        {/* Email Input with Send OTP Button */}
                        <div className="mt-3 space-y-3">
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    {...register("email")}
                                    className={`${errors.email ? inputErrorClass : inputNormalClass
                                        } pr-32`}
                                    placeholder="* Nhập email"
                                    disabled={loading || otpVerified}
                                />
                                <Button
                                    type="button"
                                    onClick={sendOTP}
                                    disabled={
                                        sendingOTP || otpVerified || !emailValue || otpTimer > 0
                                    }
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 gap-2 text-white ${otpVerified
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-[#26543C] hover:bg-[#1a3a2a]"
                                        }`}
                                >
                                    {otpVerified ? (
                                        <>
                                            <span>✓ Đã xác thực</span>
                                        </>
                                    ) : sendingOTP ? (
                                        "Đang gửi..."
                                    ) : otpTimer > 0 ? (
                                        <span className="font-semibold">
                                            {String(otpTimer).padStart(2, "0")}s
                                        </span>
                                    ) : (
                                        <>
                                            <span>Gửi OTP</span>
                                            <SendHorizonalIcon className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email.message as string}
                                </p>
                            )}
                        </div>

                        {otpSent && !otpVerified && (
                            <div className="mt-5 text-center">
                                <p className="text-3xl text-gray-600">
                                    (Gửi lại:{" "}
                                    <span className="font-semibold text-[#26543C]">
                                        {String(Math.floor(otpTimer / 60)).padStart(2, "0")}:
                                        {String(otpTimer % 60).padStart(2, "0")}
                                    </span>
                                    )
                                </p>
                            </div>
                        )}

                        {otpSent && !otpVerified && (
                            <div className="mt-4 space-y-3 flex items-center justify-center">
                                <div className="flex items-center justify-center space-x-4">
                                    {/* <Input
                    type="text"
                    placeholder="Nhập mã OTP"
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setOtpError(null);
                    }}
                    maxLength={6}
                    disabled={sendingOTP}
                    className={`${
                      otpError ? inputErrorClass : inputNormalClass
                    } tracking-widest text-center text-2xl font-bold w-fit`}
                  /> */}
                                    <div className="flex justify-center gap-3 border-2 border-[#26543C] px-4 py-2 rounded-md pl-10 pr-10">
                                        {[0, 1, 2, 3, 4, 5].map((index) => (
                                            <input
                                                key={index}
                                                ref={(el) => {
                                                    inputRefs.current[index] = el;
                                                }} // Gán ref
                                                type="text"
                                                maxLength={1}
                                                value={otpCode[index] || ""} // Lấy ký tự tại vị trí index
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                onPaste={handleOtpPaste}
                                                disabled={sendingOTP}
                                                className={`w-10 h-10 border-b-2 text-center text-3xl font-bold bg-transparent focus:outline-none transition-colors
                                    ${otpError
                                                        ? "border-red-500 text-red-500" // Style khi lỗi
                                                        : "border-green-800 text-green-900 focus:border-green-500" // Style bình thường
                                                    }
                                    ${sendingOTP
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                    }
                                  `}
                                            />
                                        ))}
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={verifyOTP}
                                        disabled={sendingOTP || otpCode.length < 4}
                                        className=" bg-blue-600 text-white hover:bg-blue-700 gap-2"
                                    >
                                        {sendingOTP ? "Xác thực..." : "Xác thực"}
                                    </Button>
                                </div>
                                {otpError && <p className="text-sm text-red-600">{otpError}</p>}
                                {otpSuccess && (
                                    <p className="text-sm text-green-600">{otpSuccess}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
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
                        <p className="text-[#929292] text-xl mt-1">
                            (8–16 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt)
                        </p>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message as string}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="mt-1 relative">
                            <Input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="confirm-password"
                                {...register("confirm_password")}
                                className={errors.confirm_password ? inputErrorClass : inputNormalClass}
                                placeholder="* Xác nhận mật khẩu"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                disabled={loading}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                                ) : (
                                    <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                                )}
                            </button>
                        </div>
                        {errors.confirm_password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.confirm_password.message as string}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex items-center p-2 border rounded-md bg-white shadow-sm mt-1 mb-4">
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
                    </div>
                    {errors.recaptcha && (
                        <p className="mt-1 text-sm text-red-600 text-center">
                            {errors.recaptcha.message as string}
                        </p>
                    )}

                    <div className="flex flex-col items-start">
                        <p className="text-3xl sm:text-2xl font-bold text-[#26543C] mb-2">
                            Điều khoản sử dụng
                        </p>
                        <div className="flex items-start space-x-2">
                            <Controller
                                name="agree_terms"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="agree_terms"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className={checkboxClass}
                                        disabled={loading}
                                    />
                                )}
                            />
                            <label
                                htmlFor="agree_terms"
                                className="text-xl sm:text-2xl lg:text-2xl text-gray-900"
                            >
                                <span className="font-bold text-green-600">*</span> Tôi đồng ý
                                với{" "}
                                <NavLink
                                    href="#"
                                    className="text-green-600 font-bold underline"
                                >
                                    điều khoản của VÒNG ĐỜI MỚI
                                </NavLink>
                                .
                            </label>
                        </div>
                        {errors.agree_terms && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.agree_terms.message as string}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-center">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-900 h-15 sm:h-12 pt-4 pb-4 mt-5"
                        >
                            <p className="text-xl sm:text-2xl m-4">
                                {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                            </p>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
