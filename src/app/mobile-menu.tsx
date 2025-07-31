"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="flex flex-col items-center justify-center w-10 h-10 rounded hover:bg-primary/10 focus:outline-none gap-1.5"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menüyü Aç/Kapat"
      >
        <span className="block w-7 h-0.5 bg-primary rounded transition-all" />
        <span className="block w-7 h-0.5 bg-primary rounded transition-all" />
        <span className="block w-7 h-0.5 bg-primary rounded transition-all" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-background border z-50 flex flex-col">
          <Link href="/" className="px-4 py-3 hover:bg-primary/10" onClick={() => setOpen(false)}>Ana Sayfa</Link>
          <Link href="/hakkimizda" className="px-4 py-3 hover:bg-primary/10" onClick={() => setOpen(false)}>Hakkımızda</Link>
          <Link href="/sertifikalar" className="px-4 py-3 hover:bg-primary/10" onClick={() => setOpen(false)}>Sertifikalar</Link>
          <Link href="/menu" className="px-4 py-3 hover:bg-primary/10" onClick={() => setOpen(false)}>Günün Menüsü</Link>
          <Link href="/iletisim" className="px-4 py-3 hover:bg-primary/10" onClick={() => setOpen(false)}>İletişim</Link>
        </div>
      )}
    </div>
  );
} 