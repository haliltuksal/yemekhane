export default function Hakkimizda() {
  return (
    <section className="flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
      {/* Hero Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-12 px-4 md:px-0 max-w-6xl mx-auto text-center md:text-left">
        <div className="flex-1 flex flex-col items-center md:items-start gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow mb-2 text-center md:text-left">Hakkımızda</h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-medium mb-2 text-center md:text-left">YEMEKHANE, toplu yemek ve catering sektöründe yılların tecrübesiyle hizmet vermektedir. Amacımız, müşterilerimize hijyenik, sağlıklı ve lezzetli yemekler sunmaktır.</p>
        </div>
        <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
          <div className="w-[180px] h-[120px] md:w-[320px] md:h-[220px] rounded-3xl shadow-2xl bg-gradient-to-tr from-primary/30 to-secondary/20 flex items-center justify-center">
            <span className="text-6xl">👨‍🍳</span>
          </div>
        </div>
      </div>
      {/* Vizyon & Misyon kartları yan yana */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 px-2">
        <div className="bg-card rounded-2xl shadow-lg p-8 border-l-4 border-primary flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-extrabold mb-2 text-primary">Vizyonumuz</h2>
          <p className="text-base text-muted-foreground">Sektörde öncü, yenilikçi ve güvenilir bir marka olmak.</p>
        </div>
        <div className="bg-card rounded-2xl shadow-lg p-8 border-l-4 border-primary flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-extrabold mb-2 text-primary">Misyonumuz</h2>
          <p className="text-base text-muted-foreground">Müşteri memnuniyetini en üst seviyede tutmak, kaliteli ve güvenilir hizmet sunmak.</p>
        </div>
      </div>
      {/* Ek bilgi kartları */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-2">
        <div className="p-8 rounded-2xl shadow-xl bg-card flex flex-col items-center border border-primary/20 text-center">
          <span className="text-4xl mb-3">👩‍🍳</span>
          <h3 className="font-extrabold text-xl mb-2 text-primary">Deneyimli Ekip</h3>
          <p className="text-base text-muted-foreground text-center">Uzman aşçılar ve profesyonel servis ekibiyle hizmet.</p>
        </div>
        <div className="p-8 rounded-2xl shadow-xl bg-card flex flex-col items-center border border-primary/20 text-center">
          <span className="text-4xl mb-3">🏆</span>
          <h3 className="font-extrabold text-xl mb-2 text-primary">Kalite Belgeleri</h3>
          <p className="text-base text-muted-foreground text-center">Hijyen ve kalite belgeli mutfak, güvenli üretim.</p>
        </div>
        <div className="p-8 rounded-2xl shadow-xl bg-card flex flex-col items-center border border-primary/20 text-center">
          <span className="text-4xl mb-3">🍲</span>
          <h3 className="font-extrabold text-xl mb-2 text-primary">Zengin Menü</h3>
          <p className="text-base text-muted-foreground text-center">Her ihtiyaca uygun, lezzetli ve çeşitli menüler.</p>
        </div>
      </div>
    </section>
  );
} 