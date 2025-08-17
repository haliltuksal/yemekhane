import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
// import QuickLinks from "./QuickLinks";
import dynamic from "next/dynamic";
import Header from "./Header";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yemekhane - Modern Yemek Hizmetleri",
  description: "Lezzetli yemekler, hızlı teslimat ve kaliteli hizmet. Online sipariş sistemi ile yemeğiniz kapınızda!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <Providers>
          {/* Arka plan gradienti tüm sayfaya */}
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/10 via-white to-primary/5 dark:from-primary/5 dark:via-gray-900 dark:to-primary/10" />
          <Header />
          <main className="w-full px-4 sm:px-8 py-8 min-h-[80vh]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
