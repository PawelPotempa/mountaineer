import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import Providers from "@/lib/providers";
import { Toaster } from "@/components/ui/sonner";
import { NavigationPanel } from "@/components/navigation-panel";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Mountaineer',
    default: 'Mountaineer - Interaktywna mapa górska',
  },
  description: 'Odkryj interaktywną mapę górską z szczytami, przełęczami, schroniskami i innymi punktami. Ucz się, graj i edytuj mapę w czasie rzeczywistym.',
  keywords: ['mapa górska', 'szczyty', 'przełęcze', 'schroniska', 'turystyka górska', 'nauka topografii'],
  authors: [{ name: 'Mountaineer' }],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Mountaineer',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <NavigationPanel />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
