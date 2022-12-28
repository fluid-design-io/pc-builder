import Link from 'next/link';
import { Button } from '@/buttons/AppButton';
import { Container } from './Container';
import { Logo } from './Logo';
import { NavLink } from '@/links/NavLink';
import { MobileNavigation } from './MobileNavigation';

export function Header() {
  return (
    <header className='py-10'>
      <Container>
        <nav className='relative z-50 flex justify-between'>
          <div className='flex items-center md:gap-x-12'>
            <Link href='#' aria-label='Home'>
              <Logo className='h-10 w-auto' />
            </Link>
            <div className='hidden md:flex md:gap-x-6'>
              <NavLink href='/about-us'>About Us</NavLink>
              <NavLink href='/reviews'>Reviews</NavLink>
              <NavLink href='/support'>Support</NavLink>
              <NavLink href='/track'>Track</NavLink>
            </div>
          </div>
          <div className='flex items-center gap-x-5 md:gap-x-8'>
            <div className='hidden md:block'>
              <NavLink href='/login'>Sign in</NavLink>
            </div>
            <Button href='/build' color='primary'>
              <span>
                Start build <span className='hidden lg:inline'>today</span>
              </span>
            </Button>
            <div className='-mr-1 md:hidden'>
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
