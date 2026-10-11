import type { Metadata } from 'next';
import ContactHeader from '@/app/components/contact/ContactHeader';
import ContactInfo from '@/app/components/contact/ContactInfo';
import ContactForm from '@/app/components/contact/ContactForm';
import WhatsAppCTA from '@/app/components/contact/WhatsAppCTA';
import { fetchPage } from '@/lib/laravel/api';

export const metadata: Metadata = {
  title: 'Contact Us & Island Location | Europe Enchanted Koh Rong',
  description:
    'Contact Europe Enchanted Bungalows & Resort on Koh Rong Island, Cambodia. Speedboat transfers, room reservations, arrival assistance, and direct WhatsApp support.',
  alternates: {
    canonical: 'https://europeenchantedkohrong.com/contact',
  },
  openGraph: {
    title: 'Contact Us & Island Location | Europe Enchanted Koh Rong',
    description:
      'Contact Europe Enchanted Bungalows & Resort on Koh Rong Island, Cambodia. Speedboat transfers, room reservations, arrival assistance, and direct WhatsApp support.',
    url: 'https://europeenchantedkohrong.com/contact',
    images: [
      {
        url: '/images/common/resort-4.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Europe Enchanted Resort',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us & Island Location | Europe Enchanted Koh Rong',
    description:
      'Contact Europe Enchanted Bungalows & Resort on Koh Rong Island, Cambodia.',
    images: ['/images/common/resort-4.jpg'],
  },
};

export default async function ContactPage() {
  const pageData = await fetchPage('contact').catch(() => null);
  const content = pageData?.content || [];
  const headerData = content.find((c: any) => c.type === 'header')?.data;
  const infoData = content.find((c: any) => c.type === 'contact_info')?.data;
  const formData = content.find((c: any) => c.type === 'contact_form')?.data;
  const ctaData = content.find((c: any) => c.type === 'whatsapp_cta')?.data;

  return (
    <main className="min-h-screen bg-[#f8f9fc] flex flex-col">
      {/* Hero Header */}
      <ContactHeader data={headerData} />

      {/* Contact Content Section: Info & Form */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left: Contact Info & Map (5 cols) */}
            <div className="lg:col-span-5">
              <ContactInfo data={infoData} />
            </div>

            {/* Right: Direct Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm data={formData} />
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Fast Support Banner */}
      <WhatsAppCTA data={ctaData} />
    </main>
  );
}
