'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signup } from "./actions";
import { AuthCard } from "@/components/auth/auth-card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpFormData, signupSchema } from "@/lib/validations/auth";

export default function SignupPage() {
    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: SignUpFormData) {
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
        <AuthCard
            title="Create an account"
            description="Enter your details to create your account"
            footer={{
                text: "Already have an account?",
                linkText: "Sign in",
                linkHref: "/signin"
            }}
            isLoading={form.formState.isSubmitting}
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
            </Form>
        </AuthCard>
    );
} 