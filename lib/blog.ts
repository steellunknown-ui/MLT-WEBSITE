import path from "path";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BlogFrontmatterSchema } from "@/lib/schema";
import type { BlogFrontmatter } from "@/lib/schema";

const blogDir = path.join(process.cwd(), "content", "blog");

export interface PostMeta extends BlogFrontmatter {
  readTime: string; // e.g. "4 min read"
}

export interface Post extends PostMeta {
  content: string; // raw MDX source
}

/**
 * Returns validated frontmatter + readTime for all published posts,
 * sorted by date descending.
 */
export function getAllPosts(): PostMeta[] {
  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts: PostMeta[] = files
    .map((filename) => {
      const filePath = path.join(blogDir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      const result = BlogFrontmatterSchema.safeParse(data);
      if (!result.success) {
        throw new Error(
          `[blog] Frontmatter validation error in "content/blog/${filename}": ${result.error.message}`,
        );
      }

      const fm = result.data;
      return {
        ...fm,
        readTime: readingTime(content).text,
      };
    })
    .filter((p) => p.published);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * Returns a single post including its raw MDX content, by slug.
 * Throws if the post is not found or frontmatter is invalid.
 */
export function getPostBySlug(slug: string): Post {
  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  for (const filename of files) {
    const filePath = path.join(blogDir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const result = BlogFrontmatterSchema.safeParse(data);
    if (!result.success) {
      throw new Error(
        `[blog] Frontmatter validation error in "content/blog/${filename}": ${result.error.message}`,
      );
    }

    const fm = result.data;
    if (fm.slug === slug) {
      return {
        ...fm,
        readTime: readingTime(content).text,
        content,
      };
    }
  }

  throw new Error(`[blog] No post found with slug: "${slug}"`);
}

/**
 * Returns a sorted deduplicated list of all categories from published posts.
 */
export function getCategories(): string[] {
  const posts = getAllPosts();
  const set = new Set(posts.map((p) => p.category));
  return Array.from(set).sort();
}

/**
 * Returns up to `limit` published posts in the same category as the given
 * slug, excluding the post itself. Falls back to recency if category has
 * fewer than `limit` matches.
 */
export function getRelatedPosts(slug: string, limit = 2): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const sameCat = all.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );

  if (sameCat.length >= limit) return sameCat.slice(0, limit);

  const rest = all.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCat, ...rest].slice(0, limit);
}