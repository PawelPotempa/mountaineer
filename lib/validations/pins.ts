import * as z from "zod";

export const pinFormSchema = {
    peak: z.object({
        name: z.string().min(1, "Name is required"),
        elevation: z.number().min(0, "Elevation must be positive"),
        description: z.string().optional(),
    }),
    pass: z.object({
        name: z.string().min(1, "Name is required"),
        elevation: z.number().min(0, "Elevation must be positive"),
        description: z.string().optional(),
    }),
    river: z.object({
        name: z.string().min(1, "Name is required"),
        length: z.number().optional(),
        description: z.string().optional(),
    }),
    lake: z.object({
        name: z.string().min(1, "Name is required"),
        depth: z.number().optional(),
        description: z.string().optional(),
    }),
    shelter: z.object({
        name: z.string().min(1, "Name is required"),
        capacity: z.number().min(1, "Capacity must be at least 1"),
        description: z.string().optional(),
    }),
    cave: z.object({
        name: z.string().min(1, "Name is required"),
        depth: z.number().optional(),
        description: z.string().optional(),
    }),
} as const;

export type PinFormSchemaType = typeof pinFormSchema;
export type PinFormData<T extends keyof PinFormSchemaType> = z.infer<PinFormSchemaType[T]>; 