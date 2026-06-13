import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { InquiryCartProvider } from '../components/context/inquiry-cart-context';
import { Navbar } from '../components/layout/navbar';
import { Footer } from '../components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LEAF&DEO | Premium Imported Plants',
  description: 'The most premium imported plant discovery and WhatsApp commerce experience in India.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-cream text-brand-forest antialiased min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <InquiryCartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </InquiryCartProvider>
      </body>
    </html>
  );
}
