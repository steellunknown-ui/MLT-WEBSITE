This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## How to Add Content

### Adding a Blog Post

1. Create a new `.mdx` file in `content/blog/`, e.g. `content/blog/my-new-post.mdx`.
2. Add a YAML frontmatter block at the top:

```yaml
---
title: "Your Post Title"
slug: "your-post-slug"
date: "2024-06-01"          # ISO date: YYYY-MM-DD
excerpt: "One or two sentences, max 160 characters."
category: "Industry"
coverImage: "/images/cover.jpg"   # optional
published: false                  # set to true when ready to go live
---
```

3. Write the body in MDX below the frontmatter. Use standard Markdown headings, lists, blockquotes and links. React components can be imported if needed.
4. Set `published: true` when the post is ready. The site only renders published posts.
5. The `slug` must be unique across all posts and match the URL you want (e.g. `/blog/your-post-slug`).

### Editing JSON Content Files

The following files in `content/` drive the data-driven sections of the site:

| File | Used for |
|------|----------|
| `content/timeline.json` | Career and company milestones |
| `content/ventures.json` | Group companies |
| `content/achievements.json` | Awards and recognitions |
| `content/press.json` | Press and media mentions |

**Rules:**
- All fields are **strings**. Years may be ranges (e.g. `"1979-80"`) or labels (e.g. `"Today"`).
- Fields marked `[CONFIRM: ...]` are intentional placeholders. Replace the entire value (including the brackets) with the confirmed text before the site goes live.
- Do **not** add facts, names, or dates that have not been confirmed by the founder.
- After editing, run `npm run dev` and check the relevant page in the browser. If a field fails Zod validation, the server will throw a readable error naming the file and field.
