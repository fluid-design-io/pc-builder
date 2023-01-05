import { getAuth } from 'lib/auth';
import { primaryNavigation } from 'lib/navigation';
import Link from 'next/link';

import { NavLink } from '@/links/NavLink';

import { AccountNavigation } from './AccountNavigation';
import { Container } from './Container';
import { Logo } from './Logo';
import { MobileNavigation } from './MobileNavigation';

export async function BuildHeader({ theme = 'auto' }) {
  const isSignedIn = await getAuth();
  return (
    <header className='py-10'>
      <Container>
        <nav className='relative z-50 flex justify-between'>
          <div className='flex items-center md:gap-x-12'>
            <Link href='/' aria-label='Home'>
              <Logo className='h-10 w-auto' />
            </Link>
            <div className='hidden md:flex md:gap-x-6'>
              {primaryNavigation.map(({ href, label }) => (
                <NavLink href={href} key={`nav-link-${href}`}>
                  {typeof label === 'string' ? label : label.desktop}
                </NavLink>
              ))}
            </div>
          </div>
          <div className='flex items-center gap-x-5 md:gap-x-8'>
            <div className='hidden md:block'>
              <AccountNavigation isSignedIn={isSignedIn} theme={theme} />
            </div>
            <div className='-mr-1 md:hidden'>
              <MobileNavigation isSignedIn={isSignedIn} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
