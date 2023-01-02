import { Inter, Big_Shoulders_Display } from '@next/font/google';

import '../globals.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

import { Footer } from '@/core/Footer';
import { BuildHeader } from '@/core/BuildHeader';
import clsxm from 'lib/clsxm';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const primary = Big_Shoulders_Display({
  subsets: ['latin'],
  variable: '--font-primary',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={clsxm(primary.variable, inter.variable)}>
      <body>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <BuildHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
