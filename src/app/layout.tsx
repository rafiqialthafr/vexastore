import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VEXASTORE - Top Up Game Termurah dan Tercepat",
  description: "Direct API automated game top-up platform. 100% official distribution, instant sub-15s delivery, and dark luxury esports experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} font-sans h-full antialiased selection:bg-[#DFC28A]/25 selection:text-[#FFF5DE]`}
    >
      <body className="min-h-full flex flex-col bg-[#06080D] text-slate-100 font-sans">{children}</body>
    </html>
  );
}
