import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/url";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/blog/MdxComponents";
import ReadingProgress from "@/components/blog/ReadingProgress";
import CopyLinkButton from "@/components/blog/CopyLinkButton";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Reveal from "@/components/ui/Reveal";
import PostCard from "@/components/blog/PostCard";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const post = getPostBySlug(resolvedParams.slug);
    const url = `${siteUrl()}/blog/${post.slug}`;
    const ogImage = post.coverImage ? `${siteUrl()}${post.coverImage}` : undefined;

    return {
      title: post.title,
      description: post.excerpt,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url,
        type: "article",
        publishedTime: post.date,
        images: ogImage ? [{ url: ogImage }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: ogImage ? [ogImage] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let post;
  try {
    post = getPostBySlug(resolvedParams.slug);
  } catch {
    notFound();
  }

  const url = `${siteUrl()}/blog/${post.slug}`;
  const related = getRelatedPosts(post.slug, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: site.founderName,
    },
    url: url,
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      {/* HEADER */}
      <section className="bg-royal-950 text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Reveal>
            <span className="block text-sm font-semibold uppercase tracking-widest text-gold/80 mb-6 text-center">
              {post.category}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 text-center leading-tight">
              {post.title}
            </h1>
            <div className="text-center text-white/60 text-sm flex items-center justify-center gap-2">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readTime}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COVER IMAGE */}
      <section className="bg-paper">
        <div className="container mx-auto px-4 md:px-8 py-12 max-w-5xl">
          <Reveal delay={0.1}>
            <div className="relative w-full overflow-hidden bg-ink/5">
              {post.coverImage ? (
                <div className="relative aspect-[21/9] w-full">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
              ) : (
                <ImagePlaceholder aspectRatio="21/9" description={post.title} />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-paper pb-20 text-ink">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-[65ch] mx-auto">
            <MDXRemote source={post.content} components={mdxComponents} />

            {/* SHARE ROW */}
            <div className="mt-16 pt-8 border-t border-gold/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <span className="text-sm font-semibold uppercase tracking-widest text-royal-950">
                Share
              </span>
              <div className="flex flex-wrap items-center gap-6">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-royal-900 hover:text-gold transition-colors uppercase tracking-widest font-medium text-sm"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-royal-900 hover:text-gold transition-colors uppercase tracking-widest font-medium text-sm"
                  >
                    X
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-royal-900 hover:text-gold transition-colors uppercase tracking-widest font-medium text-sm"
                  >
                    WhatsApp
                  </a>
                  <CopyLinkButton url={url} />
              </div>
            </div>

            {/* AUTHOR BLOCK */}
            <Reveal delay={0.4}>
              <div className="mt-16 bg-white border border-gold/20 p-8 text-center">
                <h3 className="font-serif text-2xl text-royal-950 mb-2">
                  {site.founderName}
                </h3>
                <p className="text-ink/70">
                  {site.blog?.authorLine}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <section className="bg-royal-50 py-20 text-ink">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl text-royal-950 mb-12 text-center">
                Read more
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {related.map((rp) => (
                  <PostCard key={rp.slug} post={rp} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </div>
  );
}
