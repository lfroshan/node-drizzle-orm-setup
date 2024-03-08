import { z } from 'zod';

export const TodoUpdateBody = z.object({
  title: z.string().nullable(),
  description: z.string().nullable()
});

export const TodoUpdateSchema = z.object({
  body: TodoUpdateBody
});

export type TodoUpdatePayload = z.infer<typeof TodoUpdateBody>;
