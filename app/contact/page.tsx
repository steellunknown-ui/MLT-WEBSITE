import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Manohar Lal Tandon or the Tandon Group.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* HEADER */}
      <section className="relative bg-neutral-950 text-white pt-32 pb-20 md:pt-36 md:pb-24 min-h-[380px] md:min-h-[420px] flex items-center justify-center overflow-hidden border-b border-gold/20">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 opacity-65 md:opacity-75"
          style={{
            backgroundImage: "url('/images/contact-hero-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
          }}
        />
        {/* Executive dark royal scrim overlay for crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-950/80 via-royal-950/50 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(6,18,46,0.65)_100%)]" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <Reveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-5 bg-black/40 px-3 py-1 rounded-xs border border-gold/30 backdrop-blur-xs font-mono">
              Contact
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white uppercase tracking-wide">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gold-light/95 font-serif max-w-2xl mx-auto font-light leading-relaxed mb-6">
              Enquiries regarding Manohar Lal Tandon, Tandon Group corporate initiatives, and technology venture incubation.
            </p>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-sans leading-relaxed">
              Executive Offices: SEEPZ, Andheri East, Mumbai, India &bull; Silicon Valley, California
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT DETAILS & ENQUIRY CHANNELS */}
      <section className="bg-paper text-ink py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Left 5 cols: Corporate Headquarters */}
            <div className="md:col-span-5">
              <Reveal>
                <div className="border-l-2 border-gold pl-6 mb-8">
                  <span className="text-xs uppercase font-mono tracking-widest text-gold font-semibold mb-2 block">
                    Headquarters
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-royal-950">
                    Tandon Group
                  </h2>
                </div>

                <div className="space-y-6 text-sm text-ink/80 leading-relaxed font-sans">
                  <div>
                    <h3 className="font-serif text-base text-royal-950 font-semibold mb-1">
                      SEEPZ Manufacturing Campus
                    </h3>
                    <p className="text-ink/70">
                      Santacruz Electronic Export Processing Zone (SEEPZ-SEZ)<br />
                      Andheri (East), Mumbai 400 096, Maharashtra, India
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-base text-royal-950 font-semibold mb-1">
                      Silicon Valley Technology Office
                    </h3>
                    <p className="text-ink/70">
                      San Jose &bull; Santa Clara, California, USA
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gold/20">
                    <h3 className="font-serif text-base text-royal-950 font-semibold mb-1">
                      Industrial Focus
                    </h3>
                    <p className="text-ink/70">
                      Precision Electronics &bull; Healthcare AI (Infinx) &bull; Hardware Venture Incubation
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right 7 cols: Interactive Enquiry Form */}
            <div id="enquiry-form" className="md:col-span-7 scroll-mt-28">
              <Reveal delay={0.1}>
                <div className="bg-white p-8 md:p-10 rounded-xs border border-gold/25 shadow-md">
                  <div className="mb-6 pb-4 border-b border-gold/20">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-gold block mb-1 font-semibold">
                      Direct Communication
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-royal-950">
                      Send an Enquiry
                    </h3>
                  </div>

                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
