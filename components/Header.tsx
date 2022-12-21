import { BeakerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <header className='relative z-50'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8'>
        <div className='flex justify-start lg:w-0 lg:flex-1'>
          <Link href='/'>
            <span className='sr-only'>Your Company</span>
            <BeakerIcon className='h-8 w-auto text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200 sm:h-10' />
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-end lg:w-0'>
          <Link
            href='#'
            className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'
          >
            Sign in
          </Link>
          <Link
            href='#'
            className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'
          >
            Build
          </Link>
        </div>
      </div>
    </header>
  );
}
