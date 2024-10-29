'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { signup } from "./actions";

// UI Components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signupSchema } from "@/lib/validations/auth";

type FormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const form = useForm<FormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: FormData) {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);

        try {
            const result = await signup(formData);
            if (result?.error) {
                if (result.error.includes('User already registered')) {
                    toast.error("This email is already registered. Try logging in instead!");
                } else {
                    toast.error(result.error);
                }
            }
        } catch (error) {
            // Only show error if it's not a redirect
            if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
                toast.error("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/50">
            <Card className="w-[380px]">
                <CardHeader className="space-y-3">
                    <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <div className="space-y-2 text-center">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your details to create your account
                        </CardDescription>
                    </div>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="name@example.com"
                                                type="email"
                                                disabled={form.formState.isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                disabled={form.formState.isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        <span>Please wait...</span>
                                    </div>
                                ) : (
                                    'Create account'
                                )}
                            </Button>
                            <div className="text-sm text-center text-muted-foreground">
                                Already have an account?{' '}
                                <Link
                                    href="/signin"
                                    className="text-primary hover:underline font-medium"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
} 