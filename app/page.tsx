import { site } from "@/lib/site";
import { getVentures, getAchievements } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";
import Button from "@/components/ui/Button";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Reveal from "@/components/ui/Reveal";
import AchievementsSlider from "@/components/ui/AchievementsSlider";
import Link from "next/link";
import type { Metadata } from "next";

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
  const achievements = getAchievements();
  const posts = getAllPosts().slice(0, 3);

  return (
    <main>
      {/* 1. HERO */}
      <section className="bg-royal-950 text-white min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 py-24 lg:py-0 w-full relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          {/* Left 7 cols */}
          <div className="w-full lg:w-7/12 relative pl-6 lg:pl-10">
            {/* Thin gold vertical hairline */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gold/30"></div>
            
            <Reveal delay={0.1}>
              <span className="block text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gold/80 mb-6 md:mb-8">
                {site.title}
              </span>
            </Reveal>
            
            <Reveal delay={0.2}>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] leading-[1.05] mb-6 md:mb-8 text-white tracking-tight">
                {site.founderName}
              </h1>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-serif mb-6 max-w-2xl leading-relaxed">
                {site.tagline}
              </p>
              <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl leading-relaxed">
                {site.description}
              </p>
            </Reveal>
            
            <Reveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-6">
                <Button as="link" href="/journey" size="lg">
                  Read the Journey
                </Button>
                <Button as="link" href="/contact" variant="secondary" size="lg">
                  Get in touch
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right 5 cols */}
          <div className="w-full lg:w-5/12 lg:-mr-12 relative z-0">
            <Reveal delay={0.5} distance={40}>
              <div className="relative">
                {/* Decorative border frame offset */}
                <div className="absolute -inset-4 border border-gold/10 hidden md:block"></div>
                <ImagePlaceholder
                  aspectRatio="4/5"
                  description="PLACEHOLDER: formal portrait of M. L. Tandon"
                  className="border border-gold/20 shadow-none relative z-10"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="bg-paper text-ink py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-snug text-royal-950 border-l-2 border-gold pl-6">
                  {site.intro.pull}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="max-w-[65ch] space-y-6 text-lg text-ink/80">
                  {site.intro.body.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                  <div className="pt-4">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 text-gold font-medium hover:text-royal-900 transition-colors"
                    >
                      Read more <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
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

      {/* 4. VENTURES PREVIEW */}
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

      {/* 5. KEY ACHIEVEMENTS */}
      <section className="bg-paper py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="font-serif text-4xl md:text-5xl text-royal-950">Key Achievements</h2>
              <Link
                href="/achievements"
                className="inline-flex items-center gap-2 text-gold font-medium hover:text-royal-900 transition-colors uppercase tracking-widest text-sm"
              >
                All achievements <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <AchievementsSlider achievements={achievements} />
          </Reveal>
        </div>
      </section>

      {/* 6. LATEST FROM THE BLOG */}
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
              {/* First post (large) */}
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
                          {/* Note: In a real app we'd need to avoid hydration mismatch with local dates */}
                          {posts[0].date} &middot; {posts[0].readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </div>

              {/* Smaller posts */}
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

      {/* 7. QUOTE BLOCK */}
      <section className="bg-royal-950 text-white py-24 md:py-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gold"></div>
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <Reveal>
            <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-gold/90 mb-8">
              &ldquo;{site.quote.text}&rdquo;
            </blockquote>
            <cite className="block text-sm font-semibold uppercase tracking-widest text-white/50 not-italic">
              &mdash; {site.quote.attribution}
            </cite>
          </Reveal>
        </div>
      </section>

      {/* 8. CLOSING CTA */}
      <section className="bg-white text-ink py-24 md:py-32 text-center">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-royal-950 mb-10 max-w-3xl mx-auto">
              [TO BE FILLED: closing line]
            </h2>
            <Button as="link" href="/contact" size="lg">
              Get in touch
            </Button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}