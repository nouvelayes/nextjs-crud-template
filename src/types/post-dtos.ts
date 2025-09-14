import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().optional(),
  published: z.boolean().optional(),
  authorId: z.string().min(1),
});

export type CreatePostDTO = z.infer<typeof CreatePostSchema>;

export const UpdatePostSchema = z.object({
  title: z.string().max(200).optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

export type UpdatePostDTO = z.infer<typeof UpdatePostSchema>;
