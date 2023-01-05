import { Big_Shoulders_Display, Inter } from '@next/font/google';
import { AppProvider } from 'lib/AppProvider';
import clsxm from 'lib/clsxm';

import '../globals.css';

import { Footer } from '@/core/Footer';
import { FullWidthBackground } from '@/core/FullWidthBackground';
import { MarketingHeader } from '@/core/MarketingHeader';

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
        <MarketingHeader theme='light' />
        <FullWidthBackground />
        <AppProvider>{children}</AppProvider>
        <Footer />
      </body>
    </html>
  );
}
