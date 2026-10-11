import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import StickyBookButton from "@/app/components/StickyBookButton";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { Jost, Montserrat } from 'next/font/google';

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://europeenchantedkohrong.com';

export const viewport: Viewport = {
  themeColor: '#0C3B73',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Europe Enchanted Bungalows | Koh Rong, Cambodia",
    template: "%s | Europe Enchanted Koh Rong",
  },
  description: "A private island escape on Koh Rong, Cambodia — luxury wooden bungalows, crystal-clear turquoise waters, infinity pool, and pristine tropical serenity.",
  keywords: [
    "Europe Enchanted Bungalows",
    "Koh Rong resort",
    "Cambodia island bungalows",
    "Koh Rong accommodation",
    "Koh Toch Beach",
    "Koh Rong beachfront bungalows",
    "Cambodia tropical resort",
    "island getaway Cambodia"
  ],
  authors: [{ name: "Europe Enchanted Bungalows" }],
  creator: "Europe Enchanted Resort",
  publisher: "Europe Enchanted Resort",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Europe Enchanted Bungalows",
    title: "Europe Enchanted Bungalows | Koh Rong, Cambodia",
    description: "A private island escape on Koh Rong — luxury bungalows, beachfront tranquility, and untouched nature.",
    images: [
      {
        url: "/images/common/resort-4.jpg",
        width: 1200,
        height: 630,
        alt: "Europe Enchanted Bungalows on Koh Rong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Europe Enchanted Bungalows | Koh Rong, Cambodia",
    description: "A private island escape on Koh Rong — luxury bungalows, beachfront tranquility, and untouched nature.",
    images: ["/images/common/resort-4.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/common/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/common/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/images/common/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

import { fetchSettings } from "@/lib/laravel/api";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSettings();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    name: 'Europe Enchanted Bungalows & Resort',
    description:
      'A private island escape on Koh Rong, Cambodia — luxury wooden bungalows, crystal-clear turquoise waters, infinity pool, and pristine tropical serenity.',
    url: siteUrl,
    telephone: settings?.site_phone || '+855 92 748 899',
    email: settings?.site_email || 'info@europeenchantedkohrong.com',
    logo: `${siteUrl}/images/common/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Koh Toch Beach',
      addressLocality: 'Koh Rong',
      addressRegion: 'Sihanoukville',
      addressCountry: 'KH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '10.7180',
      longitude: '103.2340',
    },
    priceRange: '$$',
    image: `${siteUrl}/images/common/resort-4.jpg`,
    checkinTime: '14:00',
    checkoutTime: '11:00',
    hasMap: 'https://maps.google.com/?q=Europe+Enchanted+Bungalow+Koh+Rong',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Beachfront', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Boat Transfer', value: true },
    ],
    sameAs: [
      settings?.social_facebook || 'https://www.facebook.com/europeenchanted/',
      settings?.social_instagram || 'https://www.instagram.com/europeenchantedbungalow/',
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${jost.variable} ${montserrat.variable} font-sans antialiased selection:bg-[#00A3C4] selection:text-white`}
      >
        <Header settings={settings} />
        {children}
        <Footer settings={settings} />
        <StickyBookButton settings={settings} />
        <WhatsAppButton settings={settings} />
      </body>
    </html>
  );
}