import { z } from "zod";
import { loginSchema } from "@/schema/loginSchema";

type AdminCredentials = z.infer<typeof loginSchema>;

export type { AdminCredentials };
