import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AuthCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    footer: {
        text: string;
        linkText: string;
        linkHref: string;
    };
    isLoading: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function AuthCard({
    title,
    description,
    children,
    footer,
    isLoading,
    onSubmit
}: AuthCardProps) {
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
                        <CardTitle className="text-2xl">{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </CardHeader>
                <form onSubmit={onSubmit}>
                    <CardContent className="space-y-4">
                        {children}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    <span>Please wait...</span>
                                </div>
                            ) : title}
                        </Button>
                        <div className="text-sm text-center text-muted-foreground">
                            {footer.text}{' '}
                            <Link
                                href={footer.linkHref}
                                className="text-primary hover:underline font-medium"
                            >
                                {footer.linkText}
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
} 