import { z } from "zod";
import { postCreateSchema } from "@/schema/postSchema";

type Post = z.infer<typeof postCreateSchema>;

export type { Post };
