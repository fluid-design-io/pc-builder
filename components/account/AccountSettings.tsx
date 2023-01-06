'use client';

import { Switch } from '@headlessui/react';
import clsxm from 'lib/clsxm';
import { decodePbError } from 'lib/decodePbError';
import { BACKEND_URL } from 'lib/pb';
import useForm from 'lib/useForm';
import {
  ModalBody,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  useModal,
} from 'lib/useModal';
import { useToast } from 'lib/useToast';
import { useUser } from 'lib/useUser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/buttons/AppButton';
import { TextField } from '@/form/Fields';

const ConfirmDeleteModal = ({ user, dismiss }) => {
  const { user: u, clearUser } = useUser();
  const [username, setUsername] = useState('');
  const [presentToast] = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/collections/users/records/${user.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${u.token}`,
        },
      });
      dismiss();
      clearUser();
      presentToast({
        title: 'Success',
        message: 'Your account has been deleted',
        role: 'info',
      });
      setTimeout(() => {
        router.push('/login');
      }, 800);
    } catch (err) {
      presentToast({
        title: 'Error',
        component: decodePbError(err),
        role: 'error',
        autoDismiss: false,
      });
      return;
    }
  };

  return (
    <ModalContainer>
      <ModalBody>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalDescription>
          This action cannot be undone. All of your data will be permanently
          removed from our servers forever. This action is irreversible.
        </ModalDescription>
        <TextField
          label={'Re-enter your username: ' + user.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={user.username}
          id='confirm-username'
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color='red'
          disabled={username !== user.username}
          onClick={handleDelete}
        >
          Confirm
        </Button>
        <Button onClick={dismiss} color='secondary'>
          Close
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const AccountSettings = ({ user }) => {
  const [allowMarketing, setAllowMarketing] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { inputs, handleChange } = useForm({
    username: user.username,
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const [presentToast] = useToast();
  const [presentModal] = useModal(ConfirmDeleteModal, {
    user,
  });
  if (!user) return null;
  const presentErrorToast = (component = undefined) =>
    presentToast({
      title: 'Error',
      component: component || 'Something went wrong.',
      role: 'error',
      autoDismiss: false,
    });
  const handeFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/collections/users/records/${user.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(inputs),
        }
      );
      const data = await res.json();
      if (data?.code === 400) {
        presentErrorToast(decodePbError(data));
        return;
      }
      presentToast({
        title: 'Success',
        message: 'Your account has been updated.',
      });
      // set disabled to true for 3 seconds
      setDisabled(true);
      setTimeout(() => setDisabled(false), 3000);
    } catch (error) {
      presentErrorToast();
    }
  };
  return (
    <form
      className='divide-y divide-gray-100 dark:divide-gray-600/40'
      action='#'
      method='POST'
      onSubmit={handeFormSubmit}
    >
      {/* Profile section */}
      <div className='py-6 px-4 sm:p-6 lg:pb-8'>
        <div>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            Edit your account details and preferences.
          </p>
        </div>

        <div className='mt-6 grid grid-cols-12 gap-6'>
          <div className='col-span-12 sm:col-span-6'>
            <TextField
              label='Username'
              id='username'
              name='username'
              type='text'
              required
              onChange={handleChange}
              value={inputs.username}
            />
          </div>
          <div className='col-span-12 sm:col-span-6'>
            <TextField
              label='Name'
              id='name'
              name='name'
              type='text'
              autoComplete='given-name'
              required
              onChange={handleChange}
              value={inputs.name}
            />
          </div>
          <div className='col-span-12 sm:col-span-6'>
            <TextField
              label='Email'
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              onChange={handleChange}
              value={inputs.email}
              readOnly
              disabled
              className='read-only:opacity-70'
            />
          </div>
          <div className='col-span-12 sm:col-span-6'>
            <TextField
              label='Phone'
              id='phone'
              name='phone'
              type='tel'
              autoComplete='tel'
              onChange={handleChange}
              value={inputs.phone}
            />
          </div>
        </div>
      </div>

      {/* Privacy section */}
      <div className='divide-y divide-gray-100 pt-6 dark:divide-gray-600/40'>
        <div className='px-4 sm:px-6'>
          <div>
            <h2 className='text-lg font-medium leading-6 tracking-wide'>
              Privacy
            </h2>
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
              Manage your privacy settings.
            </p>
          </div>
          <ul
            role='list'
            className='mt-2 divide-y divide-gray-100 dark:divide-gray-600/40'
          >
            <Switch.Group
              as='li'
              className='flex items-center justify-between py-4'
            >
              <div className='flex flex-col'>
                <Switch.Label
                  as='p'
                  className='text-sm font-medium text-gray-900 dark:text-gray-100'
                  passive
                >
                  Allow marketing emails
                </Switch.Label>
                <Switch.Description className='text-sm text-gray-500 dark:text-gray-400'>
                  Allowing us to send you marketing emails so you can stay up to
                  date with our latest news and offers.
                </Switch.Description>
              </div>
              <Switch
                checked={allowMarketing}
                onChange={setAllowMarketing}
                className={clsxm(
                  allowMarketing
                    ? 'bg-primary-500 dark:bg-primary-400'
                    : 'bg-gray-100 dark:bg-gray-700',
                  'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden='true'
                  className={clsxm(
                    allowMarketing ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out dark:bg-gray-100'
                  )}
                />
              </Switch>
            </Switch.Group>
          </ul>
        </div>
        {/* Destroy account section */}
        <div className='py-6 px-4 sm:px-6'>
          <div>
            <h2 className='text-lg font-medium leading-6 tracking-wide'>
              Destroy account
            </h2>
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
              Permanently delete your account. Including all of your data.
            </p>
          </div>
          <div className='mt-6 flex items-center justify-between'>
            <Button
              color='red'
              type='button'
              variant='outline'
              onClick={() =>
                presentModal({
                  title: 'Destroy account',
                })
              }
            >
              Destroy account
            </Button>
          </div>
        </div>
        <div className='mt-4 flex justify-end py-4 px-4 sm:px-6'>
          <Button
            color='primary'
            type='submit'
            onClick={handeFormSubmit}
            disabled={disabled}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
