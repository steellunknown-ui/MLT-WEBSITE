import { z } from "zod";

// ---------------------------------------------------------------------------
// BlogFrontmatter
// Years and date strings are kept as plain strings to preserve
// "[CONFIRM: ...]" markers and intentional ranges (e.g. "1979-80").
// ---------------------------------------------------------------------------
export const BlogFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(), // ISO date string, e.g. "2024-01-15"
  excerpt: z.string().max(160),
  category: z.string(),
  coverImage: z.string().optional(),
  published: z.boolean(),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;

// ---------------------------------------------------------------------------
// TimelineItem
// ---------------------------------------------------------------------------
export const TimelineItemSchema = z.object({
  year: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
});

export type TimelineItem = z.infer<typeof TimelineItemSchema>;

// ---------------------------------------------------------------------------
// Venture
// ---------------------------------------------------------------------------
export const VentureSchema = z.object({
  name: z.string(),
  role: z.string(),
  since: z.string(),
  description: z.string(),
  website: z.string().optional(),
  logo: z.string().optional(),
});

export type Venture = z.infer<typeof VentureSchema>;

// ---------------------------------------------------------------------------
// Achievement
// ---------------------------------------------------------------------------
export const AchievementSchema = z.object({
  year: z.string(),
  title: z.string(),
  issuer: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export type Achievement = z.infer<typeof AchievementSchema>;

// ---------------------------------------------------------------------------
// ProductArtifact
// ---------------------------------------------------------------------------
export const ProductArtifactSchema = z.object({
  id: z.string(),
  name: z.string(),
  venture: z.string(),
  since: z.string(),
  category: z.string(),
  image: z.string(),
  description: z.string(),
  spec: z.string().optional(),
});

export type ProductArtifact = z.infer<typeof ProductArtifactSchema>;

// ---------------------------------------------------------------------------
// PressItem
// ---------------------------------------------------------------------------
export const PressItemSchema = z.object({
  outlet: z.string(),
  title: z.string(),
  date: z.string(),
  url: z.string(),
  type: z.enum(["article", "video", "interview"]),
  slug: z.string().nullable().optional(),
  pdfUrl: z.string().nullable().optional(),
});

export type PressItem = z.infer<typeof PressItemSchema>;

// ---------------------------------------------------------------------------
// MediaArticle
// ---------------------------------------------------------------------------
export const MediaArticleMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const MediaArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  outlet: z.string(),
  date: z.string(),
  type: z.string(),
  byline: z.string().optional(),
  pdfUrl: z.string().nullable().optional(),
  sourceUrl: z.string().nullable().optional(),
  portrait: z.string().optional(),
  portraitCaption: z.string().optional(),
  metrics: z.array(MediaArticleMetricSchema).optional(),
  leadQuote: z.string().optional(),
  paragraphs: z.array(z.string()),
  qaList: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional(),
  sourceNote: z.string().optional(),
});

export type MediaArticle = z.infer<typeof MediaArticleSchema>;

