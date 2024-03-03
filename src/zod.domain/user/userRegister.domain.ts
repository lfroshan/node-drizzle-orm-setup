import { z } from "zod";

export const UserRegisterBody = z.object({
  username: z.string().refine((value) => /^[a-z0-9]+$/.test(value), {
    message: 'Invalid username. It must contain only lowercase letters and numbers.'
  }),
  email: z.string().email(),
  fullname: z.string(),
  password: z.string().refine((value) => /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/.test(value), {
    message: 'Password not strong. Put at least 1 special character and capital letter.'
  }),
  confirmPassword: z.string()
});

export const UserRegisterSchema = z.object({
  body: UserRegisterBody
});

export type UserRegisterPayload = z.infer<typeof UserRegisterBody>;
