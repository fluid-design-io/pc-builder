'use client';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsxm from 'lib/clsxm';
import { Fragment } from 'react';

import { NavLink } from '@/links/NavLink';
import Link from 'next/link';
import { MobileNavLink } from './MobileNavigation';

const accountNavigation = [
  [
    { name: 'Account settings', href: '/account' },
    { name: 'Orders', href: '/account/orders' },
  ],
  [{ name: 'Sign out', href: '/logout' }],
];

export const AccountNavigation = ({ isSignedIn, theme = 'auto' }) => {
  if (isSignedIn) {
    return (
      <div className='hidden md:block'>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button
              className={clsxm(
                'flex items-center',
                theme === 'light' ? 'nav-button-light' : 'nav-button'
              )}
            >
              Account
              <ChevronDownIcon
                className='-mr-1 ml-2 h-5 w-5'
                aria-hidden='true'
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-700 dark:bg-gray-900 dark:ring-white dark:ring-opacity-10'>
              <div className='px-4 py-3'>
                <p className='text-sm'>Signed in as</p>
                <p className='truncate text-sm font-medium'>tom@example.com</p>
              </div>
              {accountNavigation.map((group, groupIdx) => (
                <div key={`acc-navgroup-${groupIdx}`} className='py-1'>
                  {group.map((item, itemIdx) => (
                    <Menu.Item key={`acc-navitem-${itemIdx}`}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={clsxm(
                            active
                              ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                              : 'text-gray-700 dark:text-gray-300',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  }
  return (
    <div className='hidden md:block'>
      <NavLink href='/login' theme={theme}>
        Sign in
      </NavLink>
    </div>
  );
};

export const MobileAccountNavigation = ({ isSignedIn }) => {
  if (isSignedIn) {
    return (
      <Fragment>
        {accountNavigation.map((group, groupIdx) => (
          <div key={`acc-mobile-navgroup-${groupIdx}`}>
            <hr className='m-2 border-gray-300/40 dark:border-gray-500/40' />
            {group.map((item, itemIdx) => (
              <MobileNavLink
                key={`acc-mobile-navitem-${itemIdx}`}
                href={item.href}
              >
                {item.name}
              </MobileNavLink>
            ))}
          </div>
        ))}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <hr className='m-2 border-slate-300/40 dark:border-slate-500/40' />
      <MobileNavLink href='/login'>Sign in</MobileNavLink>
    </Fragment>
  );
};
