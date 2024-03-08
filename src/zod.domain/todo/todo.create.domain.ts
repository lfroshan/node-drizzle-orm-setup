import { z } from 'zod';

export const TodoCreateBody = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" })
});

export const TodoCreateSchema = z.object({
  body: TodoCreateBody
});

export type TodoCreatePayload = z.infer<typeof TodoCreateBody>;
