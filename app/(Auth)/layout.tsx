import { Big_Shoulders_Display, Inter } from '@next/font/google';
import clsxm from 'lib/clsxm';
import Image from 'next/image';

import '../globals.css';

import backgroundImage from '~/assets/images/background-auth.jpg';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const primary = Big_Shoulders_Display({
  subsets: ['latin'],
  variable: '--font-primary',
});

export default function AuthLayout({ children }) {
  return (
    <html lang='en' className={clsxm(primary.variable, inter.variable)}>
      <body className='relative flex h-screen min-h-full justify-center md:px-12 lg:px-0'>
        <div className='relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl dark:bg-gray-900 sm:justify-center md:flex-none md:px-28'>
          <div className='mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0'>
            {children}
          </div>
        </div>
        <div className='hidden sm:contents lg:relative lg:block lg:flex-1'>
          <Image
            className='absolute inset-0 h-full w-full object-cover'
            src={backgroundImage}
            alt=''
            unoptimized
          />
        </div>
      </body>
    </html>
  );
}
