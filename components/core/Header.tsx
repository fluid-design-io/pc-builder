import { BeakerIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import HeaderLink from '../links/HeaderLink';

export function Header() {
  return (
    <header className='relative z-50 bg-white text-xs uppercase tracking-widest dark:bg-black'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8'>
        <div className='flex justify-start lg:flex-1'>
          <Link href='/'>
            <span className='sr-only'>Your Company</span>
            <BeakerIcon className='h-6 w-auto text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200 sm:h-8' />
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-end gap-4 md:gap-6 lg:gap-8 xl:gap-10'>
          <HeaderLink href='#'>Projects</HeaderLink>
          <HeaderLink href='/track'>Track</HeaderLink>
          <Link
            href='#'
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-6 py-2 font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'
          >
            Build
          </Link>
        </div>
      </div>
    </header>
  );
}
