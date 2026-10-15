import path from "path";
import fs from "fs";
import {
  TimelineItemSchema,
  VentureSchema,
  AchievementSchema,
  PressItemSchema,
  ProductArtifactSchema,
} from "@/lib/schema";
import type {
  TimelineItem,
  Venture,
  Achievement,
  PressItem,
  ProductArtifact,
} from "@/lib/schema";

const contentDir = path.join(process.cwd(), "content");

/**
 * Reads and parses a JSON content file, validates each item against the given
 * Zod schema, and throws a readable error naming the file and field on failure.
 */
function loadJson<T>(
  filename: string,
  schema: { safeParse: (data: unknown) => { success: boolean; error?: { message: string }; data?: T } },
): T[] {
  const filePath = path.join(contentDir, filename);
  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    throw new Error(`[content] Failed to read or parse "${filename}": ${String(err)}`);
  }

  if (!Array.isArray(raw)) {
    throw new Error(`[content] "${filename}" must be a JSON array.`);
  }

  return raw.map((item, index) => {
    const result = schema.safeParse(item);
    if (!result.success) {
      throw new Error(
        `[content] Validation error in "${filename}" at index ${index}: ${result.error?.message}`,
      );
    }
    return result.data as T;
  });
}

export function getTimeline(): TimelineItem[] {
  return loadJson<TimelineItem>("timeline.json", TimelineItemSchema);
}

export function getVentures(): Venture[] {
  return loadJson<Venture>("ventures.json", VentureSchema);
}

export function getAchievements(): Achievement[] {
  return loadJson<Achievement>("achievements.json", AchievementSchema);
}

export function getPress(): PressItem[] {
  return loadJson<PressItem>("press.json", PressItemSchema);
}

export function getProducts(): ProductArtifact[] {
  return loadJson<ProductArtifact>("products.json", ProductArtifactSchema);
}