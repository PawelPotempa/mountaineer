import { NavigationButton } from "./navigation-button";
import { createClient } from "@/lib/supabase/server";
import { AuthButton } from "./auth-button";
import {
    TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "./ui/separator";

export async function NavigationPanel() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isAuthenticated = !!user;

    return (
        <TooltipProvider delayDuration={0}>
            <div className="fixed left-4 top-4 z-[1000] flex flex-col gap-1.5 bg-white/80 p-2 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200">
                <NavigationButton
                    href="/"
                    icon="book-open"
                    title="Tryb nauki"
                />

                <NavigationButton
                    href="/game"
                    icon="gamepad"
                    title="Tryb gry"
                />

                <NavigationButton
                    href="/edit"
                    icon="edit"
                    title="Tryb edycji"
                    disabled={!isAuthenticated}
                />
                <Separator className="mb-1" />
                <AuthButton isAuthenticated={isAuthenticated} />
            </div>
        </TooltipProvider>
    );
}