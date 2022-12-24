import { Inter } from '@next/font/google';

import './globals.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

import { Footer } from '@/core/Footer';
import { Header } from '@/core/Header';

const inter = Inter({
  // variable: '--font-inter',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
