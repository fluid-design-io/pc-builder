'use client';

import { Button } from '@/buttons/AppButton';
import {
  ModalBody,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  useModal,
} from 'lib/useModal';

const ConfirmCancelModal2 = ({ onConfirm, dismiss }) => {
  const [nestedModal] = useModal(ConfirmCancelModal, {
    name: 'Test',
    onConfirm: () => console.log('Confirmed'),
  });
  return (
    <ModalContainer>
      <ModalBody>
        <ModalHeader>Are you sure?</ModalHeader>
        <p>
          You have unsaved changes. Are you sure you want to cancel? All unsaved
          changes will be lost.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={nestedModal} type='button'>
          Nest ME!
        </Button>
        <Button onClick={dismiss} color='secondary' type='button'>
          Close
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

const ConfirmCancelModal = ({ onConfirm, dismiss }) => {
  const [nestedModal] = useModal(ConfirmCancelModal2, {
    name: 'Test',
    onConfirm: () => console.log('Confirmed'),
  });
  return (
    <ModalContainer>
      <ModalBody>
        <ModalHeader>Are you sure?</ModalHeader>
        <p>
          You have unsaved changes. Are you sure you want to cancel? All unsaved
          changes will be lost.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={nestedModal} type='button'>
          Nest ME!
        </Button>
        <Button onClick={dismiss} color='secondary' type='button'>
          Close
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const TestPage = () => {
  const [present] = useModal(ConfirmCancelModal, {
    name: 'Test',
    onConfirm: () => console.log('Confirmed'),
  });
  return (
    <div>
      <div className='flex justify-center gap-8 space-x-4'>
        <button
          className='m-2 rounded bg-rose-50 px-2 py-1 font-medium uppercase'
          onClick={() => present()}
        >
          Add
        </button>
        <button
          className='m-2 rounded bg-rose-50 px-2 py-1 font-medium uppercase'
          // onClick={() => setModals(modals.splice(0, modals.length - 1))}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
