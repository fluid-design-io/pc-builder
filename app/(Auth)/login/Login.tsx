'use client';

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import clsxm from 'lib/clsxm';
import { decodePbError } from 'lib/decodePbError';
import { useToast } from 'lib/useToast';
import { useUser } from 'lib/useUser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/buttons/AppButton';
import { TextField } from '@/form/Fields';

export const Login = () => {
  const router = useRouter();
  const [toast] = useToast();
  const { setUser } = useUser();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const disabled = identity === '' || password === '';

  const authenicate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify({
          identity,
          password,
        }),
      }).then((res) => res.json());
      if (!res.success) {
        setError(res.data.message);
        toast({
          title: 'Error',
          component: decodePbError(res.data),
          role: 'error',
          autoDismiss: false,
        });
        return;
      }
      setUser(res.data);
      router.push('/account');
    } catch (error) {
      setError(error.message);
      toast({
        title: 'Error',
        component: decodePbError(error),
        role: 'error',
        autoDismiss: false,
      });
    }
  };
  return (
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
        id='identity'
        name='identity'
        type='email'
        autoComplete='email'
        required
        value={identity}
        onChange={(e) => setIdentity(e.target.value)}
      />
      <TextField
        label='Password'
        id='password'
        name='password'
        type='password'
        autoComplete='current-password'
        required
        value={password}
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
          <ChevronRightIcon className='ml-2 -mr-1 h-5 w-5' aria-hidden='true' />
        </Button>
      </div>
    </form>
  );
};
