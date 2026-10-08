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
});

export type Achievement = z.infer<typeof AchievementSchema>;

// ---------------------------------------------------------------------------
// PressItem
// ---------------------------------------------------------------------------
export const PressItemSchema = z.object({
  outlet: z.string(),
  title: z.string(),
  date: z.string(),
  url: z.string(),
  type: z.enum(["article", "video", "interview"]),
});

export type PressItem = z.infer<typeof PressItemSchema>;
