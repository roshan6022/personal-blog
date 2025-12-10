import { z } from "zod";
import { postSchema } from "@/schema/postSchema";

type IPost = z.infer<typeof postSchema>;

export type { IPost };
