import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.email(),
  name: z.string().max(100),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
  name: z.string().max(100).optional(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
