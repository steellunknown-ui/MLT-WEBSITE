import { site } from "@/lib/site";
import { getVentures, getAchievements, getProducts } from "@/lib/content";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ImageLightbox from "@/components/ui/ImageLightbox";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import HeroSlider from "@/components/home/HeroSlider";
import AchievementsCarousel from "@/components/home/AchievementsCarousel";
import ArchivalImageSlider from "@/components/home/ArchivalImageSlider";
import RecentEventsSection from "@/components/home/RecentEventsSection";
import ContactModalTrigger from "@/components/contact/ContactModalTrigger";

export const metadata: Metadata = {
  title: `${site.founderName} - ${site.title}`,
  description: site.description,
  openGraph: {
    title: `${site.founderName} - ${site.title}`,
    description: site.description,
    url: "/",
    siteName: site.siteName,
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  const ventures = getVentures().slice(0, 4);
  const achievements = getAchievements().filter((a) => Boolean(a.image));
  const products = getProducts();

  return (
    <main>
      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. INTRODUCTION */}
      <section className="bg-paper text-ink py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          {/* Row 1: Vision Pull Quote & Narrative Story (Parallel) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-14 lg:mb-16">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="border-l-2 border-gold pl-6 py-1">
                  <span className="text-xs uppercase font-mono tracking-widest text-gold font-semibold mb-3 block">
                    Foundational Legacy
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-snug text-royal-950">
                    {site.intro.pull}
                  </h2>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="space-y-5 text-lg text-ink/80 leading-relaxed">
                  {site.intro.body.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Row 2: Parallel Archival Photo & Key Milestones Grid */}
          <div className="pt-12 border-t border-gold/25 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Archival Cleanroom Image */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <ArchivalImageSlider />
                <p className="mt-2.5 text-xs text-ink/65 font-sans italic border-l border-gold/40 pl-3 leading-relaxed">
                  Historical SEEPZ cleanroom, Mumbai: Mr. M. L. Tandon reviewing precision magnetic head assembly with visiting dignitaries and technicians.
                </p>
              </Reveal>
            </div>

            {/* Right: Key Milestones Cards & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <Reveal delay={0.2}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                  <span className="text-xs uppercase font-mono tracking-widest text-royal-950/70 font-semibold">
                    Foundational Milestones &amp; Impact
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {site.intro.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-4 bg-white/70 hover:bg-white rounded-xs border border-gold/20 hover:border-gold/60 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-gold font-semibold mb-1">
                          {item.tag}
                        </div>
                        <h4 className="font-serif text-base text-royal-950 font-medium mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-xs text-ink/70 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions & Deep Dives */}
                <div className="mt-6 pt-5 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-medium text-royal-950 hover:text-gold transition-colors group"
                  >
                    <span className="font-serif">Read Full Biography &amp; Advisory Roles</span>
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 text-gold">&rarr;</span>
                  </Link>

                  <Link
                    href="/achievements"
                    className="inline-flex items-center gap-1.5 text-xs text-ink/65 hover:text-royal-950 transition-colors"
                  >
                    <span>Explore 40+ State Honors &amp; Export Trophies</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MILESTONES STRIP */}
      <section className="bg-royal-900 text-white border-y border-gold/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gold/20">
            {site.stats.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 0.1} className="py-12 md:py-16 md:px-8 first:md:pl-0 last:md:pr-0 text-center md:text-left flex flex-col justify-center">
                <div className="font-serif text-4xl md:text-5xl text-gold mb-3">
                  {stat.value}
                </div>
                <div className="text-sm font-medium tracking-wide uppercase text-white/70">
                  {stat.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HARDWARE & MANUFACTURING SHOWCASE */}
      <section className="bg-paper text-ink py-24 md:py-32 border-b border-gold/15">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <div className="max-w-3xl mb-16">
              <span className="text-xs uppercase font-mono tracking-widest text-gold font-semibold mb-3 block">
                Archival Hardware Artifacts
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-royal-950 mb-4">
                Hardware &amp; Precision Engineering
              </h2>
              <p className="text-lg text-ink/75 leading-relaxed font-sans">
                Authentic archival hardware engineered and manufactured at SEEPZ, Mumbai—from sub-micron voice coil actuators and precision motors to certified power electronics and portable computing systems.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, idx) => (
              <Reveal key={product.id} delay={idx * 0.1} className="h-full">
                <div className="h-full flex flex-col bg-white rounded-xs border border-gold/25 hover:border-gold shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Image Frame with Lightbox Zoom */}
                  <ImageLightbox
                    src={product.image}
                    alt={`${product.name} - ${product.venture}`}
                    className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <div className="relative aspect-[4/3] w-full bg-royal-950/5 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`${product.name} - ${product.venture}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-contain p-3.5 group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-royal-950/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="text-[11px] text-white/95 flex items-center gap-1 font-medium tracking-wide">
                          <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          Click to enlarge artifact
                        </span>
                      </div>
                    </div>
                  </ImageLightbox>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-semibold truncate">
                          {product.category}
                        </span>
                        <span className="text-[10px] font-mono text-ink/40 font-semibold">
                          {product.since}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg text-royal-950 font-medium leading-snug mb-2 group-hover:text-gold transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-ink/70 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between text-[11px]">
                      <span className="font-medium text-royal-950/80">
                        {product.venture}
                      </span>
                      {product.spec && (
                        <span className="text-[10px] font-mono text-ink/50 bg-paper-light px-1.5 py-0.5 rounded border border-gold/10">
                          SEEPZ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VENTURES PREVIEW */}
      <section className="bg-white text-ink py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="font-serif text-4xl md:text-5xl text-royal-950">Group Ventures</h2>
              <Link
                href="/ventures"
                className="inline-flex items-center gap-2 text-gold font-medium hover:text-royal-900 transition-colors uppercase tracking-widest text-sm"
              >
                All ventures <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          <div className="border-t border-gold/20">
            {ventures.map((venture, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <Link href="/ventures" className="group block border-b border-gold/20 py-8 hover:bg-paper/50 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center px-4 md:px-0">
                    <div className="md:col-span-4">
                      <h3 className="font-serif text-2xl md:text-3xl text-royal-950 group-hover:text-gold transition-colors">
                        {venture.name}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-widest text-ink/50 mt-2">
                        {venture.role} / {venture.since}
                      </p>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-ink/70 max-w-[65ch]">
                        {venture.description}
                      </p>
                    </div>
                    <div className="md:col-span-1 flex justify-start md:justify-end">
                      <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300 text-2xl" aria-hidden="true">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ACHIEVEMENTS CAROUSEL (Option A: Royal Award Cards Slider) */}
      <AchievementsCarousel achievements={achievements} />

      {/* 6. RECENT EVENTS & DIGNITARY ENGAGEMENTS: HON'BLE UNION MINISTER SHRI PIYUSH GOYAL & ML TANDON */}
      <RecentEventsSection />

      {/* 6. LATEST FROM THE BLOG (HIDDEN FOR NOW) 
      <section className="bg-paper text-ink py-24 md:py-32 border-t border-gold/10">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="font-serif text-4xl md:text-5xl text-royal-950">Latest from the Blog</h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gold font-medium hover:text-royal-900 transition-colors uppercase tracking-widest text-sm"
              >
                All articles <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <Reveal delay={0.1}>
                  <Link href={`/blog/${posts[0].slug}`} className="group block">
                    <div className="bg-white rounded-sm overflow-hidden border border-gold/10 h-full flex flex-col">
                      <div className="relative aspect-[16/9] bg-royal-900 overflow-hidden">
                         {posts[0].coverImage ? (
                           // eslint-disable-next-line @next/next/no-img-element
                           <img src={posts[0].coverImage} alt={posts[0].title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                         ) : (
                           <ImagePlaceholder aspectRatio="16/9" description="Blog post cover" className="group-hover:scale-105 transition-transform duration-500" />
                         )}
                      </div>
                      <div className="p-8 flex-1 flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gold mb-3 block">
                          {posts[0].category}
                        </span>
                        <h3 className="font-serif text-2xl md:text-3xl text-royal-950 mb-4 group-hover:text-gold transition-colors">
                          {posts[0].title}
                        </h3>
                        <p className="text-ink/70 mb-6 flex-1">
                          {posts[0].excerpt}
                        </p>
                        <div className="text-xs font-medium text-ink/40 tracking-wide uppercase">
                          {posts[0].date} &middot; {posts[0].readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-8">
                {posts.slice(1).map((post, idx) => (
                  <Reveal key={post.slug} delay={0.2 + (idx * 0.1)} className="flex-1">
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="bg-white p-8 rounded-sm border border-gold/10 h-full flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gold mb-3 block">
                          {post.category}
                        </span>
                        <h3 className="font-serif text-xl md:text-2xl text-royal-950 mb-4 group-hover:text-gold transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-ink/70 mb-6 flex-1 text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="text-xs font-medium text-ink/40 tracking-wide uppercase">
                          {post.date} &middot; {post.readTime}
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : (
            <Reveal delay={0.1}>
              <div className="bg-white border border-gold/10 p-16 text-center rounded-sm">
                <p className="font-serif text-xl text-ink/60">No articles published yet.</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>
      */}

      {/* 7. QUOTE BLOCK */}
      <section className="relative bg-royal-950 text-white py-16 md:py-20 overflow-hidden border-y border-gold/20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-80 md:opacity-85"
          style={{
            backgroundImage: "url('/images/quote-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 50%",
          }}
        />
        {/* Slightly more transparent scrim to reveal the sunset & harbor while preserving text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-950/70 via-royal-950/45 to-royal-950/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(6,18,46,0.65)_100%)]" />

        {/* Top Accent Divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl relative z-10">
          <Reveal>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/40 bg-royal-950/70 text-gold mb-5 backdrop-blur-xs shadow-md">
              <svg className="w-4 h-4 fill-current opacity-85" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-[2.2rem] leading-snug md:leading-normal text-gold-light/95 mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] font-light italic">
              &ldquo;{site.quote.text}&rdquo;
            </blockquote>
            <cite className="inline-block text-[11px] md:text-xs font-semibold uppercase tracking-widest text-gold/90 not-italic font-mono border-t border-gold/30 pt-3 px-5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              &mdash; {site.quote.attribution}
            </cite>
          </Reveal>
        </div>

        {/* Bottom Accent Divider */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      {/* 8. CLOSING CTA */}
      <section className="bg-white text-ink py-24 md:py-32 text-center">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-royal-950 mb-10 max-w-3xl mx-auto leading-tight">
              {site.about.closingLine}
            </h2>
            <ContactModalTrigger size="lg">
              Get in touch
            </ContactModalTrigger>
          </Reveal>
        </div>
      </section>
    </main>
  );
}