import { Big_Shoulders_Display, Inter } from '@next/font/google';
import clsxm from 'lib/clsxm';

import '../globals.css';

import { IndexCover } from '@/IndexPage';
import { AppProvider } from 'lib/AppProvider';
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const primary = Big_Shoulders_Display({
  subsets: ['latin'],
  variable: '--font-primary',
});

const random = () => Math.floor(Math.random() * 3) + 1;

export default function AuthLayout({ children }) {
  const index = random();

  return (
    <html lang='en' className={clsxm(primary.variable, inter.variable)}>
      <body className='relative flex h-screen min-h-full justify-center md:px-12 lg:px-0'>
        <AppProvider>
          <div className='relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl dark:bg-gray-900 sm:justify-center md:flex-none md:px-28'>
            <div className='mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0'>
              {children}
            </div>
          </div>
          <div className='hidden sm:contents lg:relative lg:block lg:flex-1'>
            <IndexCover index={index} className='h-screen' />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
