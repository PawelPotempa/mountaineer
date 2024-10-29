import * as z from "zod";

export const pinFormSchema = {
    peak: z.object({
        name: z.string().min(1, "Nazwa jest wymagana"),
        elevation: z.number().min(0, "Wysokość musi być dodatnia"),
        description: z.string().optional(),
    }),
    pass: z.object({
        name: z.string().min(1, "Nazwa jest wymagana"),
        elevation: z.number().min(0, "Wysokość musi być dodatnia"),
        description: z.string().optional(),
    }),
    river: z.object({
        name: z.string().min(1, "Nazwa jest wymagana"),
        length: z.number().optional(),
        description: z.string().optional(),
    }),
    lake: z.object({
        name: z.string().min(1, "Nazwa jest wymagana"),
        depth: z.number().optional(),
        description: z.string().optional(),
    }),
    shelter: z.object({
        name: z.string().min(1, "Nazwa jest wymagana"),
        capacity: z.number().min(1, "Pojemność musi wynosić co najmniej 1"),
        description: z.string().optional(),
    }),
    cave: z.object({
        name: z.string().min(1, "Nazwa jest wymagana"),
        depth: z.number().optional(),
        description: z.string().optional(),
    }),
} as const;

export type PinFormSchemaType = typeof pinFormSchema;
export type PinFormData<T extends keyof PinFormSchemaType> = z.infer<PinFormSchemaType[T]>; 