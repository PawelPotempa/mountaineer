import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
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
                        <CardTitle className="text-2xl">Nie znaleziono strony</CardTitle>
                        <CardDescription>
                            Strona, której szukasz nie istnieje lub została przeniesiona.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Button asChild>
                        <Link href="/">
                            Wróć do strony głównej
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
} 