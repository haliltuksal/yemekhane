"use client";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function Header() {
  return (
    <header className="w-full border-b bg-background/80 sticky top-0 z-30 backdrop-blur">
      <nav className="container mx-auto flex items-center justify-between py-4 px-2">
        <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
          YEMEKHANE
        </Link>
        {/* Mobil menü */}
        <div className="block md:hidden">
          <MobileMenu />
        </div>
        <ul className="hidden md:flex gap-6 text-base font-medium">
          <li><Link href="/" className="hover:text-primary/80 transition-colors">Ana Sayfa</Link></li>
          <li><Link href="/hakkimizda" className="hover:text-primary/80 transition-colors">Hakkımızda</Link></li>
          <li><Link href="/sertifikalar" className="hover:text-primary/80 transition-colors">Sertifikalar</Link></li>
          <li><Link href="/menu" className="hover:text-primary/80 transition-colors">Günün Menüsü</Link></li>
          <li><Link href="/iletisim" className="hover:text-primary/80 transition-colors">İletişim</Link></li>
        </ul>
      </nav>
    </header>
  );
} 