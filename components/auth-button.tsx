'use client';

import { NavigationButton } from "./navigation-button";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";

interface AuthButtonProps {
    isAuthenticated: boolean;
}

export function AuthButton({ isAuthenticated }: AuthButtonProps) {
    const supabase = createClient();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <NavigationButton
            href="/signin"
            icon={isAuthenticated ? "log-out" : "log-in"}
            title={isAuthenticated ? "Logout" : "Login"}
            className={isAuthenticated ? "hover:bg-red-50 hover:text-red-600" : undefined}
            onClick={isAuthenticated ? handleSignOut : undefined}
        />
    );
}