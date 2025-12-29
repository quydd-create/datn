"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Category = {
    name: string;
    href: string;
    iconSrc?: string;
};

type Product = {
    id: string;
    title: string;
    price: number;
    imageSrc?: string;
    href: string;
};

const categories: Category[] = [
    { name: "Xe cộ", href: "/category/vehicles", iconSrc: "/categories/vehicles.png" },
    { name: "Đồ điện tử", href: "/category/electronics", iconSrc: "/categories/electronics.png" },
    { name: "Đồ gia dụng", href: "/category/home", iconSrc: "/categories/home.png" },
    { name: "Thời trang nam", href: "/category/men-fashion", iconSrc: "/categories/men-fashion.png" },
    { name: "Thời trang nữ", href: "/category/women-fashion", iconSrc: "/categories/women-fashion.png" },
    { name: "Đồ thú cưng", href: "/category/pets", iconSrc: "/categories/pets.png" },
    { name: "Trang sức", href: "/category/jewelry", iconSrc: "/categories/jewelry.png" },
    { name: "Nghệ thuật", href: "/category/art", iconSrc: "/categories/art.png" },
    { name: "Đồ văn phòng", href: "/category/office", iconSrc: "/categories/office.png" },
    { name: "Giải trí", href: "/category/entertainment", iconSrc: "/categories/entertainment.png" },
    { name: "Thể thao", href: "/category/sports", iconSrc: "/categories/sports.png" },
    { name: "Du lịch", href: "/category/travel", iconSrc: "/categories/travel.png" },
];

const suggestedProducts: Product[] = [
    {
        id: "p1",
        title: "Đồng hồ cổ - Đồng hồ cơ cũ đang hoạt động ổn định...",
        price: 400000,
        imageSrc: "/products/dong-ho-co.png",
        href: "/product/p1",
    },
    {
        id: "p2",
        title: "Túi nắp gập Mini có quai xách Chanel",
        price: 800000,
        imageSrc: "/products/tui-mini.png",
        href: "/product/p2",
    },
    {
        id: "p3",
        title: "Quạt đứng Senko Cũ Bền màu đen và cam",
        price: 295000,
        imageSrc: "/products/quat-dung.png",
        href: "/product/p3",
    },
    {
        id: "p4",
        title: "Giày chạy bộ Asics Gel Axelt 3 Black T61EN...",
        price: 800000,
        imageSrc: "/products/giay-asics.png",
        href: "/product/p4",
    },
];

function formatVND(value: number) {
    return value.toLocaleString("vi-VN");
}

export default function HomePage() {
    const introAnimation = useScrollAnimation({ threshold: 0.2 });
    const missionAnimation = useScrollAnimation({ threshold: 0.2 });
    const visionAnimation = useScrollAnimation({ threshold: 0.2 });
    const categoryAnimation = useScrollAnimation({ threshold: 0.1 });
    const ctaAnimation = useScrollAnimation({ threshold: 0.2 });
    const productAnimation = useScrollAnimation({ threshold: 0.1 });

    return (
        <main className="bg-[#edf3ee]">
            {/* BANNER */}
            <section className="relative w-full overflow-hidden bg-[#f4f2dc]">
                <div className="relative h-[260px] w-full md:h-[320px] lg:h-[360px]">
                    <Image
                        src="/banner.png"
                        alt="Vòng đời mới"
                        fill
                        priority
                        className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent" />
                </div>
            </section>

            {/* GIỚI THIỆU */}
            <section className="bg-[#e9f0ea] transition-all duration-300">
                <div className="mx-auto max-w-6xl px-4 pt-10 pb-0 md:pt-12 md:pb-0">
                    <div ref={introAnimation.ref} className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                        <div className={cn(
                            "flex-1 transition-all duration-700",
                            introAnimation.isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                        )}>
                            <h2 className="text-4xl font-extrabold tracking-tight text-[#244a34] md:text-5xl transition-all duration-300 hover:text-[#2f8a4a]">
                                GIỚI THIỆU
                            </h2>

                            <p className="mt-3 text-sm font-extrabold uppercase text-[#2f8a4a] tracking-wider">
                                TÁI SINH ĐỒ CŨ - LAN TỎA GIÁ TRỊ MỚI
                            </p>

                            <p className="mt-3 max-w-4xl leading-7 text-[#264236] transition-all duration-300">
                                <span className="font-extrabold text-[#244a34]">VÒNG ĐỜI MỚI</span> là nền tảng
                                mua bán, quyên góp và tái sử dụng đồ cũ, giúp người dùng trao đổi
                                vật dụng còn giá trị một cách tiện lợi, an toàn và thân thiện với
                                môi trường, hướng tới cộng đồng tiêu dùng xanh và bền vững.
                            </p>
                        </div>

                        <div className={cn(
                            "hidden shrink-0 md:block transition-all duration-700 delay-300",
                            introAnimation.isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-10"
                        )}>
                            <div className="flex items-center justify-end">
                                <div className="relative h-[200px] w-[200px] transition-transform duration-500 hover:scale-110 hover:rotate-3">
                                    <Image
                                        src="/home/introduction.png"
                                        alt="Vòng đời mới"
                                        fill
                                        className="object-contain drop-shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SỨ MỆNH */}
            <section className="bg-[#e9f0ea]">
                <div className="mx-auto max-w-6xl px-4 py-0">
                    <div className="relative overflow-hidden rounded-t-2xl bg-[#2cb36b] shadow-xl transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute inset-0">
                            <Image
                                src="/home/mission.png"
                                alt="Sứ mệnh"
                                fill
                                className="object-cover object-left transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1a9f54]/95 via-[#1a9f54]/95 to-[#1a9f54]/80" />
                        </div>

                        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 py-10 md:grid-cols-[0.55fr_0.45fr] md:py-12">
                            <div className="hidden md:block" />
                            <div ref={missionAnimation.ref} className={cn(
                                "text-right transition-all duration-700",
                                missionAnimation.isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-10"
                            )}>
                                <h2 className="text-4xl font-extrabold tracking-tight text-[#ffd85a] md:text-5xl transition-all duration-300 hover:scale-105 drop-shadow-lg">
                                    SỨ MỆNH
                                </h2>
                                <p className="mt-2 text-sm font-extrabold uppercase text-white/95 tracking-wider">
                                    KẾT NỐI, SẺ CHIA VÀ BẢO VỆ HÀNH TINH
                                </p>
                                <p className="mt-4 leading-7 text-black/90 transition-all duration-300">
                                    Chúng tôi mang sứ mệnh xây dựng cầu nối giữa người mua, người bán
                                    và người quyên góp, khuyến khích lối sống tiết kiệm – tái sử dụng,
                                    giảm lãng phí tài nguyên và cùng nhau gìn giữ môi trường sống xanh
                                    sạch.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TẦM NHÌN */}
            <section className="bg-[#e9f0ea]">
                <div className="mx-auto max-w-6xl px-4 py-0">
                    <div className="relative overflow-hidden rounded-b-2xl bg-[#214a36] shadow-xl transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute inset-0">
                            <Image
                                src="/home/vision.png"
                                alt="Tầm nhìn"
                                fill
                                className="object-cover object-right transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#214a36]/85" />
                        </div>

                        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 py-10 md:grid-cols-[0.55fr_0.45fr] md:py-12">
                            <div ref={visionAnimation.ref} className={cn(
                                "max-w-xl transition-all duration-700",
                                visionAnimation.isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-10"
                            )}>
                                <h2 className="text-4xl font-extrabold tracking-tight text-[#ffd85a] md:text-5xl transition-all duration-300 hover:scale-105 drop-shadow-lg">
                                    TẦM NHÌN
                                </h2>
                                <p className="mt-2 text-sm font-extrabold uppercase text-[#ffd85a] tracking-wider">
                                    DẪN ĐẦU XU HƯỚNG TIÊU DÙNG XANH
                                </p>
                                <p className="mt-4 leading-7 text-white/95 transition-all duration-300">
                                    <span className="font-extrabold">VÒNG ĐỜI MỚI</span> hướng đến
                                    trở thành nền tảng hàng đầu trong lĩnh vực mua bán đồ cũ trực
                                    tuyến, tạo hệ sinh thái trao đổi bền vững, nơi mỗi món đồ được
                                    tái sinh và mỗi hành động đều góp phần bảo vệ Trái Đất.
                                </p>
                            </div>
                            <div className="hidden md:block" />
                        </div>
                    </div>
                </div>
            </section>

            {/* DANH MỤC */}
            <section ref={categoryAnimation.ref} className="bg-[#e9f0ea]">
                <div className={cn(
                    "mx-auto max-w-6xl px-4 py-10 md:py-12 transition-all duration-700",
                    categoryAnimation.isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                )}>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-2xl font-extrabold text-[#244a34] transition-all duration-300 hover:text-[#2f8a4a]">
                            Danh mục
                        </h3>

                        <div className="flex items-center gap-2 text-[#244a34]">
                            <button
                                className="rounded-md bg-transparent px-2 py-1 text-xl font-extrabold leading-none text-[#244a34] transition-all duration-300 hover:opacity-80 hover:scale-110 active:scale-95"
                                type="button"
                                aria-label="Prev"
                            >
                                ««
                            </button>
                            <button
                                className="rounded-md bg-transparent px-2 py-1 text-xl font-extrabold leading-none text-[#244a34] transition-all duration-300 hover:opacity-80 hover:scale-110 active:scale-95"
                                type="button"
                                aria-label="Next"
                            >
                                »»
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
                            {categories.map((c, index) => (
                                <Link
                                    key={c.name}
                                    href={c.href}
                                    className="group flex flex-col items-center gap-2 rounded-xl p-2 transition-all duration-300 hover:scale-110 hover:bg-[#e9f0ea] active:scale-95"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
                                    <div className="relative h-14 w-14 overflow-hidden rounded-md transition-all duration-300 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-[#2f8a4a]/30">
                                        <Image
                                            src={c.iconSrc || "/home/categories/placeholder.png"}
                                            alt={c.name}
                                            fill
                                            className="object-contain transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <span className="text-center text-sm font-semibold text-[#244a34] transition-colors duration-300 group-hover:text-[#2f8a4a]">
                                        {c.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA ĐẤU THẦU */}
            <section className="bg-[#e9f0ea]">
                <div className="mx-auto max-w-6xl px-4 pb-10 md:pb-12">
                    <div ref={ctaAnimation.ref} className="grid items-center gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6aa99a] to-[#5a9989] p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] md:grid-cols-[1.2fr_0.8fr] md:p-8">
                        <div className={cn(
                            "transition-all duration-700",
                            ctaAnimation.isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                        )}>
                            <h3 className="text-2xl font-extrabold text-white md:text-3xl transition-all duration-300 hover:scale-105 drop-shadow-lg">
                                Cùng VÒNG ĐỜI MỚI tạo bài đăng "Đấu thầu"!
                            </h3>
                            <p className="mt-2 max-w-xl leading-7 text-white/95 transition-all duration-300">
                                Giúp người bán tiếp cận đúng khách hàng và người mua dễ dàng săn
                                hàng giá tốt, giá trị thật.
                            </p>

                            <div className="mt-5">
                                <Link
                                    href="/auction/create"
                                    className="inline-flex items-center justify-center rounded-xl bg-[#214a36] px-5 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:opacity-95 hover:scale-105 hover:shadow-xl active:scale-95"
                                >
                                    ĐẤU THẦU NGAY!
                                </Link>
                            </div>
                        </div>

                        <div className={cn(
                            "relative mx-auto h-[160px] w-full max-w-[360px] transition-all duration-700 delay-300",
                            ctaAnimation.isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-10"
                        )}>
                            <Image
                                src="/home/bid.png"
                                alt="Đấu thầu"
                                fill
                                className="object-contain transition-transform duration-500 hover:scale-110 drop-shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ĐỀ XUẤT SẢN PHẨM */}
            <section ref={productAnimation.ref} className="bg-[#e9f0ea]">
                <div className={cn(
                    "mx-auto max-w-6xl px-4 pb-16 md:pb-20 transition-all duration-700",
                    productAnimation.isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                )}>
                    <div className="mb-4 flex items-end justify-between">
                        <h3 className="ml-auto text-right text-3xl font-extrabold tracking-tight text-[#244a34] transition-all duration-300 hover:text-[#2f8a4a] md:text-5xl">
                            ĐỀ XUẤT SẢN PHẨM
                        </h3>

                        <div className="ml-3 flex items-center gap-2 text-[#244a34]">
                            <button
                                className="rounded-md bg-transparent px-2 py-1 text-xl font-extrabold leading-none text-[#244a34] transition-all duration-300 hover:opacity-80 hover:scale-110 active:scale-95"
                                type="button"
                                aria-label="Prev"
                            >
                                ««
                            </button>
                            <button
                                className="rounded-md bg-transparent px-2 py-1 text-xl font-extrabold leading-none text-[#244a34] transition-all duration-300 hover:opacity-80 hover:scale-110 active:scale-95"
                                type="button"
                                aria-label="Next"
                            >
                                »»
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {suggestedProducts.map((p, index) => (
                            <div
                                key={p.id}
                                className="group overflow-hidden rounded-2xl border-2 border-[#2b5b42]/35 bg-white shadow-sm transition-all duration-300 hover:border-[#2f8a4a]/50 hover:shadow-xl hover:scale-105"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <Link href={p.href} className="block">
                                    <div className="p-3">
                                        <div className="relative h-[170px] w-full overflow-hidden rounded-xl border border-[#2b5b42]/25 bg-white transition-all duration-500 group-hover:border-[#2f8a4a]/50">
                                            <Image
                                                src={p.imageSrc || "/home/products/placeholder.png"}
                                                alt={p.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>

                                    <div className="px-4 pb-4">
                                        <p className="line-clamp-2 min-h-10 text-sm font-medium text-[#244a34] leading-tight transition-colors duration-300 group-hover:text-[#2f8a4a]">
                                            {p.title}
                                        </p>

                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-lg font-extrabold text-red-600 transition-all duration-300 group-hover:scale-105">
                                                {formatVND(p.price)}
                                                <span className="text-xs font-semibold text-red-600"> VND</span>
                                            </span>

                                            <button
                                                type="button"
                                                className="text-[#2b5b42] transition-all duration-300 hover:opacity-80 hover:scale-125 active:scale-100"
                                                aria-label="Yêu thích"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                }}
                                            >
                                                ♡
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            className="mt-3 w-full rounded-lg bg-[#214a36] px-3 py-2 text-xs font-extrabold text-white shadow-md transition-all duration-300 hover:opacity-95 hover:scale-105 hover:shadow-lg active:scale-95"
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                        >
                                            Thêm giỏ hàng
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Link
                            href="/products"
                            className="text-sm font-semibold text-[#2b5b42] transition-all duration-300 hover:text-[#2f8a4a] hover:underline hover:scale-105"
                        >
                            Xem thêm...
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
