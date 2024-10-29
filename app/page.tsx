import { MapWrapper } from '@/components/map-wrapper';
import { getQueryClient } from '@/lib/get-query-client';
import { serverPinOptions } from '@/queries/pins';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/json-ld';

const metadata: Metadata = {
  title: 'Tryb nauki',
  description: 'Poznaj topografię gór w interaktywny sposób. Odkryj szczyty, przełęcze, schroniska i inne punkty na mapie.',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  openGraph: {
    title: 'Tryb nauki | Mountaineer',
    description: 'Poznaj topografię gór w interaktywny sposób. Odkryj szczyty, przełęcze, schroniska i inne punkty na mapie.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mountaineer',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  description: 'Interaktywna mapa górska z możliwością nauki, gry i edycji punktów.',
  author: {
    '@type': 'Organization',
    name: 'Mountaineer',
  },
};

export default function LearnPage() {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(serverPinOptions)

  return (
    <>
      <JsonLd data={websiteSchema} />
      <div className="h-screen w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MapWrapper mode="learn" />
        </HydrationBoundary>
      </div>
    </>
  );
} 