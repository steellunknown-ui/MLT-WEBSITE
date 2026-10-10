import { site } from "@/lib/site";
import { getAchievements } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import ImageLightbox from "@/components/ui/ImageLightbox";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Achievements - ${site.founderName}`,
  description: site.pages.achievements.intro,
};

export default function AchievementsPage() {
  const achievements = getAchievements();

  // Group achievements by decade based on the first 4 digits of the year string.
  // We assume year strings look like "1978-79".
  const grouped = achievements.reduce((acc, curr) => {
    const yearMatch = curr.year.match(/^(\d{4})/);
    if (!yearMatch) return acc;
    const yearNum = parseInt(yearMatch[1], 10);
    const decade = `${Math.floor(yearNum / 10) * 10}s`;
    if (!acc[decade]) {
      acc[decade] = [];
    }
    acc[decade].push(curr);
    return acc;
  }, {} as Record<string, typeof achievements>);

  const sortedDecades = Object.keys(grouped).sort();

  return (
    <div className="w-full">
      {/* HEADER */}
      <section className="relative bg-royal-950 text-white pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: "url('/images/achievements-hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <Reveal>
            <span className="block text-xs font-semibold uppercase tracking-widest text-gold mb-6">
              Achievements
            </span>
            <h1 className="font-serif text-5xl md:text-7xl mb-8">Achievements</h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-serif mb-8">
              {site.pages.achievements.intro}
            </p>
            <p className="text-sm text-white/50 max-w-2xl mx-auto">
              {site.pages.achievements.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ACHIEVEMENTS LIST BY DECADE */}
      <section className="bg-paper py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          {sortedDecades.map((decade) => (
            <div key={decade} className="mb-24 last:mb-0">
              <Reveal>
                <h2 className="font-serif text-6xl md:text-8xl text-gold/30 mb-12">
                  {decade}
                </h2>
              </Reveal>
              
              <div className="border-t border-gold/20">
                {grouped[decade].map((item, idx) => (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b border-gold/20 hover:bg-white/50 transition-colors">
                      <div className="md:col-span-3">
                        <h3 className="font-serif text-3xl text-royal-900">
                          {item.year}
                        </h3>
                      </div>
                      <div className={`md:col-span-6 flex flex-col justify-center ${!item.image ? 'md:col-span-9' : ''}`}>
                        <h4 className="font-serif text-2xl md:text-3xl text-royal-950 mb-3">
                          {item.title}
                        </h4>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                          {item.issuer}
                        </p>
                        {item.description && (
                          <p className="text-ink/70 leading-relaxed max-w-3xl">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.image && (
                        <div className="md:col-span-3 mt-4 md:mt-0 flex items-center justify-end">
                          <ImageLightbox src={item.image} alt={item.title} />
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
