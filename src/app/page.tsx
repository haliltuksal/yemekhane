import Link from "next/link";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
      {/* Hero Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-4 md:px-0 max-w-6xl mx-auto text-center md:text-left">
        <div className="flex-1 flex flex-col items-center md:items-start gap-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary drop-shadow mb-2 text-center md:text-left">
            YEMEKHANE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium mb-2 text-center md:text-left">
            Toplu yemek ve catering hizmetlerinde <span className="text-primary font-bold">kalite</span> ve <span className="text-primary font-bold">hijyen</span> bir arada! Lezzetli menülerimiz ve profesyonel ekibimizle hizmetinizdeyiz.
          </p>
          <Link href="/menu" className="mt-2 px-8 py-4 rounded-full bg-primary text-background font-bold text-lg shadow-lg hover:bg-primary/90 transition">
            Günün Menüsüne Göz At
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
          {/* Hero görseli placeholder */}
          <div className="w-[220px] h-[160px] md:w-[400px] md:h-[280px] rounded-3xl shadow-2xl bg-gradient-to-tr from-primary/30 to-secondary/20 flex items-center justify-center">
            <span className="text-7xl">🍲</span>
          </div>
        </div>
      </div>
      {/* Hizmet kartları */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-2">
        <div className="p-8 rounded-2xl shadow-xl bg-card flex flex-col items-center border border-primary/20 hover:scale-105 transition-transform text-center">
          <span className="text-5xl mb-3">🍽️</span>
          <h3 className="font-extrabold text-2xl mb-2 text-primary">Toplu Yemek</h3>
          <p className="text-base text-muted-foreground mb-2">Şirketlere, fabrikalara ve okullara sağlıklı, lezzetli toplu yemek hizmeti.</p>
          <ul className="text-sm text-muted-foreground list-disc pl-4 text-left md:text-center">
            <li>Günlük taze üretim</li>
            <li>Farklı menü seçenekleri</li>
            <li>Yerinde üretim imkanı</li>
          </ul>
        </div>
        <div className="p-8 rounded-2xl shadow-xl bg-card flex flex-col items-center border border-primary/20 hover:scale-105 transition-transform text-center">
          <span className="text-5xl mb-3">🥗</span>
          <h3 className="font-extrabold text-2xl mb-2 text-primary">Catering</h3>
          <p className="text-base text-muted-foreground mb-2">Düğün, davet ve özel günler için profesyonel catering çözümleri.</p>
          <ul className="text-sm text-muted-foreground list-disc pl-4 text-left md:text-center">
            <li>Özel gün menüleri</li>
            <li>Profesyonel servis ekibi</li>
            <li>Hijyenik sunum</li>
          </ul>
        </div>
        <div className="p-8 rounded-2xl shadow-xl bg-card flex flex-col items-center border border-primary/20 hover:scale-105 transition-transform text-center">
          <span className="text-5xl mb-3">🧼</span>
          <h3 className="font-extrabold text-2xl mb-2 text-primary">Hijyen & Kalite</h3>
          <p className="text-base text-muted-foreground mb-2">Hijyen ve kalite belgeli mutfağımızda, güvenle yemek yiyin.</p>
          <ul className="text-sm text-muted-foreground list-disc pl-4 text-left md:text-center">
            <li>Kalite kontrol süreçleri</li>
            <li>Uzman gıda mühendisleri</li>
            <li>Belgelendirilmiş hijyen</li>
          </ul>
        </div>
      </div>
      {/* Vizyon & Misyon kartları yan yana ve başlık renkleri eşit */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-14 px-2">
        <div className="bg-card rounded-2xl shadow-lg p-8 border-l-4 border-primary flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-extrabold mb-2 text-primary">Vizyonumuz</h2>
          <p className="text-base text-muted-foreground">Sektörde öncü, yenilikçi ve güvenilir bir marka olmak.</p>
        </div>
        <div className="bg-card rounded-2xl shadow-lg p-8 border-l-4 border-primary flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-extrabold mb-2 text-primary">Misyonumuz</h2>
          <p className="text-base text-muted-foreground">Müşteri memnuniyetini en üst seviyede tutmak, kaliteli ve güvenilir hizmet sunmak.</p>
        </div>
      </div>
    </section>
  );
}
