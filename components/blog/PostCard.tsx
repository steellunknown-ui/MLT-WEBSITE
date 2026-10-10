import Image from "next/image";
import Link from "next/link";
import { type PostMeta } from "@/lib/blog";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block border-t border-gold/20 pt-6">
      <div className="mb-4 relative w-full bg-ink/5 overflow-hidden">
        {post.coverImage ? (
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <ImagePlaceholder aspectRatio="16/10" description={post.title} />
        )}
      </div>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-xs uppercase tracking-widest text-royal-900 font-medium">
          {post.category}
        </span>
      </div>
      <h2 className="font-serif text-2xl text-royal-950 mb-3 group-hover:underline decoration-gold underline-offset-4 decoration-2">
        {post.title}
      </h2>
      <p className="text-ink/70 mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      <div className="text-sm text-ink/80 flex items-center gap-2">
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
    </Link>
  );
}
