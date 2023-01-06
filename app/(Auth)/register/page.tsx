'use client';

import HCaptcha from '@hcaptcha/react-hcaptcha';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import clsxm from 'lib/clsxm';
import { decodePbError } from 'lib/decodePbError';
import { useToast } from 'lib/useToast';
import { useUser } from 'lib/useUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/buttons/AppButton';
import { Logo } from '@/core/Logo';
import { TextField } from '@/form/Fields';

export default function Register() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [presentToast] = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [isCapchaVerified, setIsCapchaVerified] = useState(false);
  const disabled =
    identity === '' ||
    password === '' ||
    password !== passwordConfirm ||
    !isCapchaVerified;
  const regester = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://billowing-hill-1662.fly.dev/api/collections/users/records`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: identity,
            password,
            passwordConfirm,
          }),
        }
      ).then((res) => res.json());
      if (res.code !== 200) {
        presentToast({
          title: 'Error',
          component: decodePbError(res),
          role: 'error',
          autoDismiss: false,
        });
        setIsLoading(false);
        return;
      }
    } catch (error) {
      presentToast({
        title: 'Error',
        component: decodePbError(error),
        role: 'error',
        autoDismiss: false,
      });
      return;
    }
    // set the auth cookie to server
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity,
        password,
      }),
    }).then((res) => res.json());
    if (res.success) {
      presentToast({
        title: 'Success',
        component: 'You have successfully registered',
      });
      setUser(res.data);
      setTimeout(() => {
        router.push('/account');
      }, 800);
    } else {
      presentToast({
        title: 'Error',
        component: decodePbError(res.data),
        role: 'error',
        autoDismiss: false,
      });
    }
    setIsLoading(false);
  };
  /* if (user) {
    router.push('/account');
  } */
  function handleVerificationSuccess(token: string, ekey: string): any {
    setIsCapchaVerified(true);
  }
  return (
    <>
      <div className='flex flex-col'>
        <Link href='/' aria-label='Home'>
          <Logo className='h-10 w-auto' />
        </Link>
        <div className='mt-20'>
          <h2>Sign Up</h2>
          <p className='mt-2 text-sm'>
            Already have an account?{' '}
            <Link
              href='/login'
              className='font-medium text-primary-600 hover:underline dark:text-primary-400'
            >
              Sign in
            </Link>{' '}
            instead.
          </p>
        </div>
      </div>
      <form
        action='#'
        onSubmit={regester}
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
          value={identity}
          required
          onChange={(e) => setIdentity(e.target.value)}
        />
        <TextField
          label='Password'
          id='password'
          name='password'
          type='password'
          value={password}
          autoComplete='current-password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label='Confirm Password'
          id='passwordConfirm'
          name='passwordConfirm'
          type='password'
          value={passwordConfirm}
          autoComplete='current-password'
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {
          // Only render the captcha in production
          process.env.NODE_ENV === 'production' && (
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
              onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
            />
          )
        }
        <div>
          <Button
            type='submit'
            variant='solid'
            color='primary'
            disabled={process.env.NODE_ENV === 'production' ? disabled : false}
            className={clsxm('w-full')}
            isLoading={isLoading}
          >
            <span>Sign Up</span>
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
