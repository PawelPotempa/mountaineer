import { redirect } from 'next/navigation';
import { MapWrapper } from '@/components/map-wrapper';
import { getQueryClient } from '@/lib/get-query-client';
import { serverPinOptions } from '@/queries/pins';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tryb edycji',
    description: 'Edytuj i dodawaj nowe punkty na mapie górskiej. Współtwórz bazę wiedzy o górach.',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/edit`,
    },
    openGraph: {
        title: 'Tryb edycji | Mountaineer',
        description: 'Edytuj i dodawaj nowe punkty na mapie górskiej. Współtwórz bazę wiedzy o górach.',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/edit`,
    },
};

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