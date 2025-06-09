import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation | RePrecinct',
  description: 'Interactive API documentation for RePrecinct',
  openGraph: {
    title: 'API Documentation | RePrecinct',
    description: 'Interactive API documentation for RePrecinct',
    url: 'https://reprecinct.app/api-doc',
    siteName: 'RePrecinct',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Documentation | RePrecinct',
    description: 'Interactive API documentation for RePrecinct',
  },
};

export default function ApiDocLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
