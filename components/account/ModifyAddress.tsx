'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsxm from 'lib/clsxm';
import { decodePbError } from 'lib/decodePbError';
import { pb } from 'lib/pb';
import useForm from 'lib/useForm';
import {
  ModalBody,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModelHeader,
  useModal,
} from 'lib/useModal';
import { useToast } from 'lib/useToast';
import { useUser } from 'lib/useUser';
import { useRouter } from 'next/navigation';
import { Fragment, useState, useTransition } from 'react';

import { Button } from '@/buttons/AppButton';
import { TextField } from '@/form/Fields';

const ConfirmCancelModal = ({ onConfirm, dismiss }) => {
  return (
    <ModalContainer>
      <ModalBody>
        <ModelHeader>Are you sure?</ModelHeader>
        <p>
          You have unsaved changes. Are you sure you want to cancel? All unsaved
          changes will be lost.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color='red' onClick={onConfirm} type='button'>
          Confirm
        </Button>
        <Button onClick={dismiss} color='secondary' type='button'>
          Close
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

const EditAddressModal = ({ address, dismiss, isNew = false, onClose }) => {
  const router = useRouter();
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [toast] = useToast();
  const { inputs, handleChange } = useForm({
    street: address.street || '',
    city: address.city || '',
    state: address.state || '',
    zip: address.zip || '',
    country: address.country || '',
  });
  const isMutating = isPending || isLoading;
  const hasUnsavedChanges =
    !isUpdated &&
    Object.keys(inputs).some((key) =>
      isNew ? inputs[key] !== '' : inputs[key] !== address[key]
    );
  const [presentConfirmCancelModal] = useModal(ConfirmCancelModal, {
    onConfirm: dismiss,
  });
  onClose(hasUnsavedChanges ? presentConfirmCancelModal : dismiss);

  const saveAddress = async () => {
    setIsLoading(true);
    const data = await pb.collection('addresses').update(address.id, inputs);
    if (data.updated) {
      setIsLoading(false);
      setIsUpdated(true);
      toast({
        title: 'Address updated',
        message: 'Your address has been updated.',
      });
      startTransition(() => {
        router.refresh();
      });
      dismiss();
    }
  };

  const addAddress = async () => {
    setIsLoading(true);
    const data = {
      ...inputs,
      user: user.record.id,
    };
    await pb
      .collection('addresses')
      .create(data)
      .then((data) => {
        if (data.created) {
          setIsLoading(false);
          setIsUpdated(true);
          toast({
            title: 'Address added',
            message: 'Your address has been added.',
          });
          startTransition(() => {
            router.refresh();
          });
          dismiss();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: 'Error',
          component: decodePbError(err),
          role: 'error',
          autoDismiss: false,
        });
      });
  };

  return (
    <ModalContainer>
      <form action='#'>
        <ModalBody>
          <ModelHeader>{isNew ? 'Add' : 'Edit'} Address</ModelHeader>
          {isNew ? (
            <ModalDescription>
              Add a new address to your account
            </ModalDescription>
          ) : (
            <ModalDescription>
              Past orders used this address will not be updated.
            </ModalDescription>
          )}
          <div className='grid gap-4 sm:grid-cols-2'>
            {Object.keys(inputs).map((key) => (
              <TextField
                label={key}
                placeholder={key}
                id={key}
                name={key}
                value={inputs[key]}
                onChange={handleChange}
                key={`EditAddressModal-${key}`}
                className={clsxm(
                  key === 'street' && 'sm:col-span-2',
                  'capitalize'
                )}
                required
              />
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            disabled={!hasUnsavedChanges || isMutating}
            onClick={isNew ? addAddress : saveAddress}
            isLoading={isMutating}
            type='submit'
          >
            {isNew ? 'Add' : 'Save'}
          </Button>
          <Button
            onClick={hasUnsavedChanges ? presentConfirmCancelModal : dismiss}
            color='secondary'
            disabled={isMutating}
          >
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </ModalContainer>
  );
};

const ConfirmDeleteModal = ({ address, dismiss }) => {
  const router = useRouter();
  const [toast] = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isPending || isLoading;
  const handleDeleteAddress = async () => {
    setIsLoading(true);
    await pb
      .collection('addresses')
      .delete(address.id)
      .then((data) => {
        toast({
          title: 'Address deleted',
          message: 'Your address has been deleted.',
        });
        setIsLoading(false);
        startTransition(() => {
          router.refresh();
        });
        dismiss();
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: 'Error',
          component: decodePbError(err),
          role: 'error',
          autoDismiss: false,
        });
      });
  };
  return (
    <ModalContainer>
      <ModalBody>
        <ModelHeader>Are you sure?</ModelHeader>
        <ModalDescription>
          Are you sure you want to delete this address?
        </ModalDescription>
      </ModalBody>

      <ModalFooter>
        <Button
          color='red'
          onClick={handleDeleteAddress}
          disabled={isMutating}
          isLoading={isMutating}
        >
          Delete
        </Button>
        <Button onClick={dismiss} color='secondary'>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const ModifyAddress = ({ address }) => {
  const [presentEditModal] = useModal(EditAddressModal, {
    address,
  });
  const [presentDeleteModal] = useModal(ConfirmDeleteModal, {
    address,
  });
  if (!address) return null;
  return (
    <Fragment>
      <button
        onClick={() => presentEditModal()}
        className='w-full px-4 py-2 text-center text-sm text-gray-700 transition-colors hover:bg-blue-500/30 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300 dark:hover:bg-blue-700/30'
      >
        Edit
      </button>
      <button
        onClick={() => presentDeleteModal()}
        className='w-full px-4 py-2 text-center text-sm text-gray-700 transition-colors hover:bg-red-500/30 hover:text-red-500 focus:text-red-500 dark:text-gray-300 dark:hover:bg-red-700/30'
      >
        Delete
      </button>
    </Fragment>
  );
};

export const AddAddress = () => {
  const [presentAddModal] = useModal(EditAddressModal, {
    address: {},
    isNew: true,
  });
  return (
    <div className='card-secondary card-secondary-hover !p-0'>
      <div className='flex h-full flex-col gap-4 p-2'>
        <button
          onClick={() => presentAddModal()}
          className='flex flex-1 items-center justify-center rounded-md border border-dashed border-gray-200 px-4 py-12 text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600'
        >
          <PlusIcon className='h-6 w-6' />
          <span>Add Address</span>
        </button>
      </div>
    </div>
  );
};