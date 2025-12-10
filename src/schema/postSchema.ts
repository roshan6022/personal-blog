import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url().optional().or(z.literal("")),
  published: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
});

export type PostInput = z.infer<typeof postSchema>;
