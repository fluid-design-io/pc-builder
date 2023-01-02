import { Big_Shoulders_Display, Inter } from '@next/font/google';
import clsxm from 'lib/clsxm';

import '../globals.css';

import { Container } from '@/core/Container';
import { Footer } from '@/core/Footer';
import { MarketingHeader } from '@/core/MarketingHeader';
import { AccountSidebarNavigation } from '@/account/AccountSidebarNavigation';
import { getAuth } from 'lib/auth';
import { useRouter } from 'next/navigation';
import { AppProvider } from 'lib/AppProvider';

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
  const auth = getAuth();
  const router = useRouter();
  if (!auth) router.push('/login');
  return (
    <html lang='en' className={clsxm(primary.variable, inter.variable)}>
      <body>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <MarketingHeader theme='light' />
        <div
          aria-hidden='true'
          className={clsxm(
            'top-0 h-72',
            'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0'
          )}
        >
          <div className='absolute inset-0 flex'>
            <div className='h-full w-1/2 bg-primary-400 dark:bg-primary-700' />
            <div className='h-full w-1/2 bg-primary-300 dark:bg-primary-600' />
          </div>
          <div className='relative flex justify-center'>
            <svg
              className='flex-shrink-0'
              width={1750}
              height={308}
              viewBox='0 0 1750 308'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M284.161 308H1465.84L875.001 182.413 284.161 308z'
                className='fill-primary-200 dark:fill-primary-600'
              />
              <path
                d='M1465.84 308L16.816 0H1750v308h-284.16z'
                className='fill-primary-300 dark:fill-primary-600'
              />
              <path
                d='M1733.19 0L284.161 308H0V0h1733.19z'
                className='fill-primary-400 dark:fill-primary-700'
              />
              <path
                d='M875.001 182.413L1733.19 0H16.816l858.185 182.413z'
                className='fill-primary-500 dark:fill-primary-900'
              />
            </svg>
          </div>
        </div>
        <AppProvider>
          <Container className='px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16'>
            <main className='relative'>
              <div className='card-primary overflow-hidden bg-opacity-90 !p-0 shadow backdrop-blur-lg dark:bg-opacity-80'>
                <div className='divide-y divide-gray-100 dark:divide-gray-600/40 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x'>
                  <AccountSidebarNavigation />
                  {children}
                </div>
              </div>
            </main>
          </Container>
        </AppProvider>
        <Footer />
      </body>
    </html>
  );
}
