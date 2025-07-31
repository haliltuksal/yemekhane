export default function Menu() {
  return (
    <section className="flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
      {/* Hero Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-12 px-4 md:px-0 max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col items-start gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow mb-2">Günün Menüsü</h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-xl font-medium mb-2">Her gün taze ve lezzetli menülerimizle hizmetinizdeyiz.</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[220px] h-[160px] md:w-[320px] md:h-[220px] rounded-3xl shadow-2xl bg-gradient-to-tr from-primary/30 to-secondary/20 flex items-center justify-center">
            <span className="text-6xl">🍛</span>
          </div>
        </div>
      </div>
      {/* Menü kartı */}
      <div className="max-w-xl w-full rounded-lg shadow bg-card p-8 mt-4">
        <ul className="space-y-6">
          <li className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-lg">Çorba</span>
            <span className="text-muted-foreground text-base">Mercimek Çorbası</span>
          </li>
          <li className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-lg">Ana Yemek</span>
            <span className="text-muted-foreground text-base">Tavuk Sote</span>
          </li>
          <li className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-lg">Yardımcı Yemek</span>
            <span className="text-muted-foreground text-base">Pirinç Pilavı</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="font-semibold text-lg">Tatlı</span>
            <span className="text-muted-foreground text-base">Sütlaç</span>
          </li>
        </ul>
      </div>
    </section>
  );
} 