'use client';

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import clsxm from 'lib/clsxm';
import { pb } from 'lib/pb';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/buttons/AppButton';
import { Logo } from '@/core/Logo';
import { TextField } from '@/form/Fields';
import { useUser } from 'lib/useUser';

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const disabled = identity === '' || password === '';
  const authenicate = async (e) => {
    e.preventDefault();
    // Login locally
    const data = await pb
      .collection('users')
      .authWithPassword(identity, password)
      .catch((err) => {
        setError(err.message);
      });
    const cookie = pb.authStore.exportToCookie();
    if (data) {
      // set the user in the global state
      setUser(data);
      // set the auth cookie to server
      const res = await fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookie }),
      });
      if (res.status === 200) {
        router.push('/account');
      }
    }
  };
  if (pb.authStore.isValid) {
    router.push('/account');
  }
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
      <form
        action='#'
        onSubmit={authenicate}
        className='mt-10 grid grid-cols-1 gap-y-8'
      >
        {error && (
          <div className='relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 dark:border-red-700 dark:bg-red-900 dark:text-red-100'>
            <span className='block sm:inline'>{error}</span>
          </div>
        )}
        <TextField
          label='Email address'
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          required
          onChange={(e) => setIdentity(e.target.value)}
        />
        <TextField
          label='Password'
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button
            type='submit'
            variant='solid'
            color='primary'
            disabled={disabled}
            className={clsxm(disabled && 'cursor-not-allowed', 'w-full')}
          >
            <span>Sign in</span>
            <ChevronRightIcon
              className='ml-2 -mr-1 h-5 w-5'
              aria-hidden='true'
            />
          </Button>
        </div>
      </form>
    </>
  );
}
