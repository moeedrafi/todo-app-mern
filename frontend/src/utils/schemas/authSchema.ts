import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z
    .string()
    .min(5, { message: "Username must be atleast 5 letters" }),
  password: z.string().min(8, "Password must be of 8 letters"),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be of 8 letters"),
});
