'use client';

import { Button } from '@/buttons/AppButton';
import { TextField } from '@/form/Fields';
import useForm from 'lib/useForm';
import { useToast } from 'lib/useToast';
import { decodePbError } from 'lib/decodePbError';
import { useState } from 'react';
import { BACKEND_URL } from 'lib/pb';
import { useUser } from 'lib/useUser';

export default function Page() {
  const { inputs, handleChange } = useForm({
    oldPassword: '',
    password: '',
    passwordConfirm: '',
  });
  const [toast] = useToast();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const handeFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(
        `${BACKEND_URL}/api/collections/users/records/${user.record.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        }
      );
      toast({
        title: 'Password Updated',
        message: 'Your password has been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        component: decodePbError(error),
        role: 'error',
        autoDismiss: false,
      });
    }
    setIsLoading(false);
  };
  return (
    <div className='lg:col-span-9'>
      <h2 className='mt-8 px-4 tracking-wide sm:px-6 md:mt-10 lg:mt-12'>
        Reset Password
      </h2>
      <form action='#' className='py-6 px-4 sm:p-6 lg:pb-8'>
        <div>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            Edit your account details and preferences.
          </p>
        </div>
        <div className='mt-6'>
          <div className='flex max-w-sm flex-col gap-4'>
            {Object.keys(inputs).map((key) => (
              <TextField
                label={
                  // split on capital letters, capitalize each word, join with spaces
                  key
                    .split(/(?=[A-Z])/)
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                }
                placeholder={key
                  .split(/(?=[A-Z])/)
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
                id={key}
                name={key}
                value={inputs[key]}
                onChange={handleChange}
                key={`change-pw-${key}`}
                required
                type='password'
              />
            ))}
          </div>
        </div>
        <div className='mt-4 flex justify-end py-4 px-4 sm:px-6'>
          <Button
            color='primary'
            type='submit'
            onClick={handeFormSubmit}
            disabled={
              Object.values(inputs).some((input) => input === '') ||
              inputs.password !== inputs.passwordConfirm
            }
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
