'use client';

import clsxm from 'lib/clsxm';

import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { primaryNavigation } from 'lib/navigation';
import { MobileAccountNavigation } from './AccountNavigation';

function MobileNavIcon({ open, theme = 'auto' }) {
  const navStyle =
    theme === 'light'
      ? 'stroke-slate-300'
      : 'stroke-slate-700 dark:stroke-slate-300';
  return (
    <svg
      aria-hidden='true'
      className={clsxm(`h-3.5 w-3.5 overflow-visible`, navStyle)}
      fill='none'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <path
        d='M0 1H14M0 7H14M0 13H14'
        className={clsxm(
          'origin-center transition',
          open && 'scale-90 opacity-0'
        )}
      />
      <path
        d='M2 2L12 12M12 2L2 12'
        className={clsxm(
          'origin-center transition',
          !open && 'scale-90 opacity-0'
        )}
      />
    </svg>
  );
}

export function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className='block w-full p-2'>
      {children}
    </Popover.Button>
  );
}

export function MobileNavigation({ isSignedIn, theme = 'auto' }) {
  return (
    <Popover>
      <Popover.Button
        className='relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none'
        aria-label='Toggle Navigation'
      >
        {({ open }) => <MobileNavIcon open={open} theme={theme} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='duration-150 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Overlay className='fixed inset-0 bg-slate-300/50 backdrop-blur-sm dark:bg-slate-800/40' />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            as='div'
            className='absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-md bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 dark:bg-gray-900 dark:text-gray-100 dark:ring-white/10'
          >
            {primaryNavigation.map(({ href, label }) => (
              <MobileNavLink href={href} key={`mobile-nav-link-${href}`}>
                {typeof label === 'string' ? label : label.mobile}
              </MobileNavLink>
            ))}
            <MobileAccountNavigation isSignedIn={isSignedIn} />
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}
