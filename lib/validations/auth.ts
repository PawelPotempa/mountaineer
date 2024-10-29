import { z } from "zod";

export const emailSchema = z.string().email("Proszę podać prawidłowy adres email");

export const passwordSchema = z.string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .regex(/[0-9]/, "Hasło musi zawierać co najmniej 1 cyfrę")
    .regex(/[a-z]/, "Hasło musi zawierać co najmniej 1 małą literę")
    .regex(/[A-Z]/, "Hasło musi zawierać co najmniej 1 wielką literę")
    .regex(/[^a-zA-Z0-9]/, "Hasło musi zawierać co najmniej 1 znak specjalny");

export const signupSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const signinSchema = z.object({
    email: z.string().email("Proszę podać prawidłowy adres email"),
    password: z.string().min(1, "Proszę podać hasło"),
});

export type SignUpFormData = z.infer<typeof signupSchema>;
export type SignInFormData = z.infer<typeof signinSchema>; 