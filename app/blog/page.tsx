import { Metadata } from "next";
import { site } from "@/lib/site";
import { getAllPosts, getCategories } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: site.pages.blog?.intro || "Blog",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const currentCategory =
    typeof params.category === "string" ? params.category : "";
  const query = typeof params.q === "string" ? params.q.toLowerCase() : "";
  const pageStr = typeof params.page === "string" ? params.page : "1";
  const page = parseInt(pageStr, 10) || 1;
  const limit = 9;

  const categories = getCategories();
  const allPosts = getAllPosts();

  let filtered = allPosts;
  if (currentCategory) {
    filtered = filtered.filter((p) => p.category === currentCategory);
  }
  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query)
    );
  }

  const totalPages = Math.ceil(filtered.length / limit);
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return (
    <div className="w-full">
      {/* HEADER */}
      <section className="bg-royal-950 text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <Reveal>
            <span className="block text-sm font-semibold uppercase tracking-widest text-gold/80 mb-6">
              Blog
            </span>
            <h1 className="font-serif text-5xl md:text-7xl mb-8">Blog</h1>
            <p className="text-xl md:text-2xl text-white/80 font-serif max-w-2xl mx-auto">
              {site.pages.blog?.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FILTER & CONTENT */}
      <section className="py-20 bg-paper text-ink">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <Reveal delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href={`/blog${query ? `?q=${encodeURIComponent(query)}` : ""}`}
                  className={`text-sm tracking-widest uppercase font-medium transition-colors hover:text-royal-900 ${
                    !currentCategory
                      ? "text-royal-950 border-b-2 border-gold"
                      : "text-ink/80"
                  }`}
                >
                  All
                </a>
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href={`/blog?category=${encodeURIComponent(cat)}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                    className={`text-sm tracking-widest uppercase font-medium transition-colors hover:text-royal-900 ${
                      currentCategory === cat
                        ? "text-royal-950 border-b-2 border-gold"
                        : "text-ink/80"
                    }`}
                  >
                    {cat}
                  </a>
                ))}
              </div>

              <form method="GET" action="/blog" className="flex items-center relative">
                {currentCategory && (
                  <input type="hidden" name="category" value={currentCategory} />
                )}
                <label htmlFor="blog-search" className="sr-only">
                  Search articles
                </label>
                <input
                  id="blog-search"
                  type="text"
                  name="q"
                  defaultValue={typeof params.q === "string" ? params.q : ""}
                  placeholder="Search articles"
                  className="bg-transparent border-b border-gold/30 pb-1 text-royal-950 placeholder:text-ink/40 focus:outline-none focus:border-gold w-full md:w-64"
                />
              </form>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {paginated.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 text-ink/80">
                No articles match the selected criteria.
              </div>
            )}
          </Reveal>

          {totalPages > 1 && (
            <Reveal delay={0.3}>
              <div className="flex items-center justify-center gap-8 mt-20 pt-8 border-t border-gold/20">
                {page > 1 ? (
                  <a
                    href={`/blog?page=${page - 1}${currentCategory ? `&category=${encodeURIComponent(currentCategory)}` : ""}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                    className="text-sm uppercase tracking-widest text-royal-900 hover:text-gold font-medium"
                  >
                    Previous
                  </a>
                ) : (
                  <span className="text-sm uppercase tracking-widest text-ink/40 font-medium cursor-not-allowed">
                    Previous
                  </span>
                )}
                
                {page < totalPages ? (
                  <a
                    href={`/blog?page=${page + 1}${currentCategory ? `&category=${encodeURIComponent(currentCategory)}` : ""}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                    className="text-sm uppercase tracking-widest text-royal-900 hover:text-gold font-medium"
                  >
                    Next
                  </a>
                ) : (
                  <span className="text-sm uppercase tracking-widest text-ink/40 font-medium cursor-not-allowed">
                    Next
                  </span>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}
