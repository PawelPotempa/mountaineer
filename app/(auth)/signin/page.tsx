'use client';

import { signin } from './actions';
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth/auth-card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInFormData, signinSchema } from "@/lib/validations/auth";


export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<SignInFormData>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: SignInFormData) {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('password', data.password);

            const result = await signin(formData);
            if (result?.error) {
                toast.error(result.error === 'Invalid login credentials'
                    ? "Invalid email or password"
                    : result.error
                );
            }
        } catch (error) {
            // Only show error if it's not a redirect
            if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthCard
            title="Sign in"
            description="Enter your email to sign in to your account"
            footer={{
                text: "Don't have an account?",
                linkText: "Sign up",
                linkHref: "/signup"
            }}
            isLoading={isLoading}
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <Form {...form}>
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Form>
        </AuthCard>
    );
} 