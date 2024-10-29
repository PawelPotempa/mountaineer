import { redirect } from 'next/navigation';
import { MapWrapper } from '@/components/map-wrapper';
import { getQueryClient } from '@/lib/get-query-client';
import { serverPinOptions } from '@/queries/pins';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/server';

export default async function EditPage() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/signin');
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(serverPinOptions);

    return (
        <div className="h-screen w-full">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MapWrapper mode="edit" />
            </HydrationBoundary>
        </div>
    );
} 