import { type TimelineItem } from "@/lib/schema";
import Reveal from "@/components/ui/Reveal";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative max-w-5xl mx-auto py-12">
      {/* Center line (desktop) / Left line (mobile) */}
      <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-px bg-gold/30 -translate-x-1/2"></div>

      <div className="space-y-24 md:space-y-32">
        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <Reveal key={idx} delay={0.1}>
              <div className="relative flex flex-col md:flex-row items-start">
                {/* Marker */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1/2 mt-2 z-10 border-4 border-[var(--color-paper)]"></div>

                {/* Left side content (only visible on desktop for even items) */}
                <div className={`hidden md:block w-1/2 pr-16 lg:pr-24 text-right ${!isEven ? 'md:invisible' : ''}`}>
                  {isEven && (
                    <>
                      <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold mb-6 leading-none">
                        {item.year}
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl text-royal-950 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-ink/80 text-lg">
                        {item.description}
                      </p>
                      {item.image && (
                        <div className="mt-8">
                          <ImagePlaceholder aspectRatio="16/9" description={`PLACEHOLDER: ${item.image}`} className="border border-gold/10" />
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Mobile content wrapper (left aligned) / Right side content for odd items on desktop */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-16 lg:pl-24 ${isEven ? 'md:hidden' : ''}`}>
                  <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold mb-6 leading-none">
                    {item.year}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-royal-950 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-ink/80 text-lg">
                    {item.description}
                  </p>
                  {item.image && (
                    <div className="mt-8">
                      <ImagePlaceholder aspectRatio="16/9" description={`PLACEHOLDER: ${item.image}`} className="border border-gold/10" />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}