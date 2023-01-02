'use client';

import {
  ArchiveBoxIcon,
  KeyIcon,
  MapPinIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import clsxm from 'lib/clsxm';
import { usePathname } from 'next/navigation';

const subNavigation = [
  { name: 'Account', href: '/account', icon: UserCircleIcon },
  {
    name: 'Addresses',
    href: '/account/addresses',
    icon: MapPinIcon,
  },
  {
    name: 'Orders',
    href: '/account/orders',
    icon: ArchiveBoxIcon,
  },
  {
    name: 'Password',
    href: '/account/password',
    icon: KeyIcon,
  },
];

export const AccountSidebarNavigation = () => {
  const pathname = usePathname();
  return (
    <aside className='py-6 lg:col-span-3'>
      <nav className='space-y-1'>
        {subNavigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={clsxm(
              pathname === item.href
                ? 'border-primary-500 bg-primary-50/80 text-primary-700 hover:bg-primary-50/80 hover:text-primary-700 dark:border-primary-200 dark:bg-primary-700/80 dark:text-primary-50 dark:hover:bg-primary-800/80 dark:hover:text-primary-50'
                : 'border-transparent text-gray-900 hover:bg-gray-50/80 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700/80 dark:hover:text-gray-100',
              'group flex items-center border-l-4 px-3 py-2 text-sm font-medium'
            )}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            <item.icon
              className={clsxm(
                pathname === item.href
                  ? 'text-primary-500 group-hover:text-primary-500 dark:text-primary-300 dark:group-hover:text-primary-300'
                  : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300',
                '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
              )}
              aria-hidden='true'
            />
            <span className='truncate'>{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};
