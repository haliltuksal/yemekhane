import Link from "next/link";

export default function QuickLinks() {
  return (
    <nav className="flex flex-wrap gap-4 justify-center my-8">
      <Link href="/menu" className="px-6 py-3 rounded bg-primary text-background font-semibold shadow hover:bg-primary/90 transition">Günün Menüsü</Link>
      <Link href="/sertifikalar" className="px-6 py-3 rounded border border-primary text-primary font-semibold hover:bg-primary/10 transition">Sertifikalarımız</Link>
      <Link href="/hakkimizda" className="px-6 py-3 rounded border border-muted text-muted-foreground font-semibold hover:bg-muted/50 transition">Hakkımızda</Link>
      <Link href="/iletisim" className="px-6 py-3 rounded border border-muted text-muted-foreground font-semibold hover:bg-muted/50 transition">İletişim</Link>
    </nav>
  );
} 