import Link from 'next/link';

import { Logo } from '@/core/Logo';

import { Login } from './Login';

export default function LoginPage() {
  return (
    <>
      <div className='flex flex-col'>
        <Link href='/' aria-label='Home'>
          <Logo className='h-10 w-auto' />
        </Link>
        <div className='mt-20'>
          <h2>Sign in to your account</h2>
          <p className='mt-2 text-sm'>
            Don’t have an account?{' '}
            <Link
              href='/register'
              className='font-medium text-primary-600 hover:underline dark:text-primary-400'
            >
              Sign up
            </Link>{' '}
            instead.
          </p>
        </div>
      </div>
      <Login />
    </>
  );
}
