import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  message: z.string().trim().min(20).max(3000),
  website: z.string().max(0).default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
