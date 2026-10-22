import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getMediaArticles, getMediaArticleBySlug } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import ImageLightbox from "@/components/ui/ImageLightbox";
import CopyLinkButton from "@/components/blog/CopyLinkButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getMediaArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getMediaArticleBySlug(slug);

  if (!article) {
    return {
      title: `Article Not Found - ${site.founderName}`,
    };
  }

  return {
    title: `${article.title} - ${article.outlet} | ${site.founderName}`,
    description: article.subtitle || article.leadQuote || article.paragraphs[0],
    openGraph: {
      title: `${article.title} - ${article.outlet}`,
      description: article.subtitle || article.leadQuote || article.paragraphs[0],
      url: `/media/${article.slug}`,
      siteName: site.siteName,
      type: "article",
    },
  };
}

export default async function MediaArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getMediaArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getMediaArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <div className="w-full bg-paper min-h-screen text-ink">
      {/* ── 1. REGAL HERO BANNER ── */}
      <section className="relative bg-royal-950 text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-gold/20">
        {/* Subtle Ambient Background Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-950 via-[#0a1f5c]/70 to-royal-950 opacity-95 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #c9a24b 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-4xl">
          <Reveal>
            {/* Breadcrumb Backlink */}
            <div className="mb-6">
              <Link
                href="/media"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold hover:text-white transition-colors group"
              >
                <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
                <span>Back to Press &amp; Media</span>
              </Link>
            </div>

            {/* Publication Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-gold/15 text-gold border border-gold/30 rounded-xs text-xs font-mono uppercase tracking-wider font-semibold">
                {article.outlet}
              </span>
              <span className="text-white/60 text-xs font-mono uppercase tracking-wider">
                {article.date}
              </span>
              <span className="text-gold/40">&bull;</span>
              <span className="text-xs uppercase tracking-wider font-mono text-gold-light/80 bg-white/5 px-2.5 py-0.5 rounded-xs border border-white/10">
                {article.type}
              </span>
              {article.byline && (
                <>
                  <span className="text-gold/40">&bull;</span>
                  <span className="text-xs font-sans text-white/70 italic">
                    By {article.byline}
                  </span>
                </>
              )}
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-tight mb-6">
              {article.title}
            </h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p className="text-lg sm:text-xl text-gold-light/90 font-serif leading-relaxed mb-8 max-w-3xl font-light">
                {article.subtitle}
              </p>
            )}

            {/* Action Buttons: PDF & Share */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gold/20">
              <a
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-gold text-royal-950 text-xs font-semibold uppercase tracking-widest hover:bg-white transition-colors rounded-xs shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v3H6V7.5h3.5c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2zm1 7h-1.5v-5h1.5v5zm6.5-3.5c0 .8-.7 1.5-1.5 1.5h-3V7.5h3c.8 0 1.5.7 1.5 1.5v6zm-6-8.5v3h1.5c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5H11zm5 5h-1.5v-3H16v3z"/>
                </svg>
                <span>View Original Archival PDF Scan</span>
                <span aria-hidden="true">&rarr;</span>
              </a>

              <div className="px-4 py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-xs border border-white/15 text-xs text-white">
                <CopyLinkButton url={`/media/${article.slug}`} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. METRICS BAR (If Available) ── */}
      {article.metrics && article.metrics.length > 0 && (
        <section className="bg-royal-900 text-white border-b border-gold/20 py-8">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {article.metrics.map((metric, idx) => (
                <div key={idx} className="border-l-2 border-gold pl-4 py-1">
                  <div className="font-serif text-2xl sm:text-3xl text-gold font-medium mb-1">
                    {metric.value}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/70">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. ARTICLE CONTENT CONTAINER ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {/* Authentic Archival Portrait (If Present) */}
          {article.portrait && (
            <Reveal className="mb-14">
              <div className="bg-white p-3 sm:p-4 rounded-xs border border-gold/30 shadow-xl max-w-2xl mx-auto">
                <ImageLightbox src={article.portrait} alt={article.portraitCaption || article.title}>
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xs bg-royal-950/10">
                    <Image
                      src={article.portrait}
                      alt={article.portraitCaption || article.title}
                      fill
                      priority
                      className="object-contain hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                </ImageLightbox>
                {article.portraitCaption && (
                  <p className="mt-3 text-xs text-ink/70 font-sans italic text-center border-t border-gold/15 pt-2">
                    {article.portraitCaption}
                  </p>
                )}
              </div>
            </Reveal>
          )}

          {/* Lead Quote Pull */}
          {article.leadQuote && (
            <Reveal className="mb-12">
              <div className="bg-white/80 p-6 md:p-8 rounded-xs border-l-4 border-gold shadow-sm">
                <blockquote className="font-serif text-xl md:text-2xl text-royal-950 font-normal italic leading-relaxed">
                  &ldquo;{article.leadQuote}&rdquo;
                </blockquote>
                <cite className="block text-xs uppercase tracking-widest font-mono text-gold font-semibold mt-3 not-italic">
                  &mdash; {article.outlet} ({article.date})
                </cite>
              </div>
            </Reveal>
          )}

          {/* Paragraphs */}
          <div className="space-y-6 text-lg text-ink/85 leading-relaxed font-sans mb-14">
            {article.paragraphs.map((p, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <p
                  className={
                    idx === 0
                      ? "first-letter:font-serif first-letter:text-6xl md:first-letter:text-7xl first-letter:float-left first-letter:mr-3.5 first-letter:leading-[0.8] first-letter:text-gold first-line:tracking-wide first-line:uppercase first-line:text-sm first-line:font-semibold first-line:text-royal-950"
                      : ""
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Interview Q&A Section (If Available) */}
          {article.qaList && article.qaList.length > 0 && (
            <div className="mt-12 pt-10 border-t border-gold/25 space-y-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                <h3 className="text-xs uppercase font-mono tracking-widest text-royal-950 font-bold">
                  Interview Transcript &bull; {article.outlet}
                </h3>
              </div>

              {article.qaList.map((qa, idx) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="bg-white p-6 md:p-8 rounded-xs border border-gold/20 shadow-xs">
                    {/* Question */}
                    <div className="mb-4 pb-3 border-b border-gold/15">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-gold font-bold block mb-1">
                        Question {idx + 1}
                      </span>
                      <h4 className="font-serif text-xl md:text-2xl text-royal-950 font-semibold leading-snug">
                        {qa.question}
                      </h4>
                    </div>

                    {/* Answer */}
                    <div className="text-ink/80 text-base md:text-lg leading-relaxed font-sans">
                      <p>{qa.answer}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* ── 4. ARCHIVAL PROVENANCE NOTICE BOX ── */}
          <div className="mt-16 pt-10 border-t border-gold/30">
            <Reveal>
              <div className="bg-white p-6 sm:p-8 rounded-xs border border-gold/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs uppercase font-mono tracking-widest text-gold font-semibold">
                      Archival Provenance &amp; Verification
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-sans max-w-xl">
                    {article.sourceNote || `Transcribed from original print publication in ${article.outlet} (${article.date}).`}
                  </p>
                </div>

                <a
                  href={article.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-royal-950 text-white hover:bg-gold hover:text-royal-950 transition-colors text-xs font-semibold uppercase tracking-widest rounded-xs flex-shrink-0"
                >
                  <span>Open PDF Scan</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* ── 5. PREVIOUS / NEXT NAVIGATION ── */}
          <div className="mt-16 pt-10 border-t border-gold/20 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              {prevArticle && (
                <Link
                  href={`/media/${prevArticle.slug}`}
                  className="group block p-5 bg-white rounded-xs border border-gold/20 hover:border-gold transition-all"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold block mb-1">
                    &larr; Previous Article
                  </span>
                  <h5 className="font-serif text-lg text-royal-950 group-hover:text-gold transition-colors line-clamp-2">
                    {prevArticle.title}
                  </h5>
                  <span className="text-xs text-ink/50 font-mono mt-2 block">
                    {prevArticle.outlet} &bull; {prevArticle.date}
                  </span>
                </Link>
              )}
            </div>

            <div className="sm:text-right">
              {nextArticle && (
                <Link
                  href={`/media/${nextArticle.slug}`}
                  className="group block p-5 bg-white rounded-xs border border-gold/20 hover:border-gold transition-all"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold block mb-1">
                    Next Article &rarr;
                  </span>
                  <h5 className="font-serif text-lg text-royal-950 group-hover:text-gold transition-colors line-clamp-2">
                    {nextArticle.title}
                  </h5>
                  <span className="text-xs text-ink/50 font-mono mt-2 block">
                    {nextArticle.outlet} &bull; {nextArticle.date}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
