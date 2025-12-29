import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/layout/Sidebar";

const baloo = Baloo_2({
  variable: "--font-baloo-2",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
        <Sidebar />
        {children}
    </div>
  );
}
