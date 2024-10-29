import { z } from "zod";

export const emailSchema = z.string().email("Please enter a valid email");

export const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least 1 special character");

export const signupSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const signinSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Please enter your password"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type SigninFormData = z.infer<typeof signinSchema>; 