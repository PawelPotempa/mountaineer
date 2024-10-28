import { MapWrapper } from '@/components/map-wrapper';
import { getQueryClient } from '@/lib/get-query-client';
import { serverPinOptions } from '@/queries/pins';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

export default function Home() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(serverPinOptions)

  return (
    <div className="h-screen w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MapWrapper />
      </HydrationBoundary>
    </div>
  );
}
