import Link from 'next/link';
import { TextField } from '@/form/Fields';
import { Button } from '@/buttons/AppButton';
import { Logo } from '@/core/Logo';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      <Head>
        <title>Sign in to your account</title>
      </Head>
      <div className='flex flex-col'>
        <Link href='/' aria-label='Home'>
          <Logo className='h-10 w-auto' />
        </Link>
        <div className='mt-20'>
          <h2>Sign in to your account</h2>
          <p className='mt-2 text-sm text-gray-700'>
            Don’t have an account?{' '}
            <Link
              href='/register'
              className='font-medium text-blue-600 hover:underline'
            >
              Sign up
            </Link>{' '}
            for a free trial.
          </p>
        </div>
      </div>
      <form action='#' className='mt-10 grid grid-cols-1 gap-y-8'>
        <TextField
          label='Email address'
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          required
        />
        <TextField
          label='Password'
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          required
        />
        <div>
          <Button type='submit' variant='solid' color='blue' className='w-full'>
            <span>
              Sign in <span aria-hidden='true'>&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </>
  );
}
