import type { Metadata } from 'next';
import { MapWrapper } from '@/components/map-wrapper';
import { getQueryClient } from '@/lib/get-query-client';
import { serverPinOptions } from '@/queries/pins';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

export const metadata: Metadata = {
    title: 'Tryb gry',
    description: 'Sprawdź swoją wiedzę o górach w interaktywnej grze. Odpowiadaj na pytania o szczyty, przełęcze i schroniska.',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/game`,
    },
    openGraph: {
        title: 'Tryb gry | Mountaineer',
        description: 'Sprawdź swoją wiedzę o górach w interaktywnej grze. Odpowiadaj na pytania o szczyty, przełęcze i schroniska.',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/game`,
    },
};

export default function GamePage() {
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(serverPinOptions)

    return (
        <div className="h-screen w-full">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MapWrapper mode="game" />
            </HydrationBoundary>
        </div>
    );
} 