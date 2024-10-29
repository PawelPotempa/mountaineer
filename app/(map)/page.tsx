// This will be our main "learning" route
import { MapWrapper } from '@/components/map-wrapper';
import { getQueryClient } from '@/lib/get-query-client';
import { serverPinOptions } from '@/queries/pins';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

export default function LearnPage() {
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(serverPinOptions)

    return (
        <div className="h-screen w-full">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MapWrapper mode="learn" />
            </HydrationBoundary>
        </div>
    );
} 