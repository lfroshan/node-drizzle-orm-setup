import { z } from 'zod';

export const UserLoginBody = z.object({
  username: z.string(),
  password: z.string()
});

export const UserLoginSchema = z.object({
  body: UserLoginBody
});

export type UserLoginPayload = z.infer<typeof UserLoginBody>;
