'use client';

import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ToastProvider } from './useToast';

type PresentModalProps = {
  children?: React.PropsWithChildren<any>;
  title?: string;
  message?: string;
  role?: 'success' | 'destructive' | 'info';
  id?: string;
};

type ModalProps = {
  present: (options: PresentModalProps) => void;
  dismiss: (id: string) => void;
};

export const Modal = forwardRef(
  (
    {
      options,
      dismiss,
      count,
      index,
    }: {
      options: PresentModalProps;
      dismiss: (id: string) => void;
      count?: number;
      index?: number;
    },
    ref
  ) => {
    const customOnClose = useRef(null);
    const role = options?.role || 'success';
    const Component = options?.children;
    const y = Math.abs(count - index) * 20 - 20;
    let filterBrightness = 1 - count * 0.3 + (index + 1) * 0.3;
    let scale = 1 - Math.pow(Math.abs(count - index + 1), 2) * 0.01;
    scale < 0.5 && (scale = 0.5);
    filterBrightness < 0.5 && (filterBrightness = 0.5);

    const handleClose = () => {
      // only dismiss the topmost modal
      if (index === count - 1) {
        if (customOnClose.current) {
          customOnClose.current();
        } else {
          dismiss(options.id);
        }
      }
    };

    // capture user `Escape` key press
    useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          // only dismiss the topmost modal
          if (index === count - 1) {
            handleClose();
          }
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [dismiss, options.id]);

    return (
      <Dialog
        open={true}
        onClose={handleClose}
        className='fixed inset-0 z-50 overflow-y-auto'
      >
        {index === 0 && (
          <Dialog.Overlay
            as={motion.div}
            className='fixed inset-0 bg-black/30 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.preventDefault()}
          />
        )}
        <motion.div
          ref={ref as any}
          initial={{
            opacity: 0,
            y: index === 0 ? 0 : 20,
            scale: 1.02,
            filter: 'brightness(1)',
          }}
          animate={{
            opacity: 1,
            y: y,
            scale,
            filter: `brightness(${filterBrightness})`,
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.2,
            },
            scale: scale - 0.03,
          }}
          transition={{
            duration: 0.5,
            type: 'spring',
            bounce: 0.15,
          }}
          className='mx-auto flex min-h-screen items-center justify-center px-4'
        >
          <Component
            {...options}
            onClose={(onClose) => {
              customOnClose.current = onClose;
            }}
            dismiss={() => dismiss(options.id)}
          />
        </motion.div>
      </Dialog>
    );
  }
);

export const ModalContext = createContext<ModalProps>(null);
export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState<PresentModalProps[]>([]);
  const present = (options: PresentModalProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    setModals([...modals, { ...options, id }]);
  };
  const dismiss = (id: string) => {
    setModals(modals.filter((modal) => modal.id !== id));
  };
  return (
    <ModalContext.Provider value={{ present, dismiss }}>
      <ToastProvider>
        {children}
        <AnimatePresence>
          {modals.map((modal, modalIdx) => (
            <Modal
              key={modal.id}
              options={modal}
              dismiss={dismiss}
              index={modalIdx}
              count={modals.length}
            />
          ))}
        </AnimatePresence>
      </ToastProvider>
    </ModalContext.Provider>
  );
};

export const useModal = (
  children: React.PropsWithChildren<any>,
  props: any
) => {
  const { present, dismiss } = useContext(ModalContext);
  const presentModal = (options: PresentModalProps) =>
    present({ ...options, children, ...props });

  return [presentModal as any, dismiss];
};

export const ModelHeader = ({ children }) => (
  <Dialog.Title as='h1' className='mb-4 font-bold md:text-2xl lg:text-2xl'>
    {children}
  </Dialog.Title>
);

export const ModalFooter = ({ children }) => {
  return (
    <div className='flex flex-col gap-4 bg-gray-50 px-4 py-3 dark:bg-gray-800 sm:flex-row-reverse sm:px-6'>
      {children}
    </div>
  );
};

export const ModalContainer = forwardRef(
  ({ children }: { children: ReactNode }, ref) => (
    <Dialog.Panel
      ref={ref as any}
      className='card-primary w-full max-w-2xl rounded-md !p-0 shadow-lg'
    >
      {children}
    </Dialog.Panel>
  )
);

export const ModalBody = ({ children }) => (
  <div className='px-4 py-5 sm:p-6'>{children}</div>
);

export const ModalDescription = ({ children }) => (
  <Dialog.Description as='p' className='mb-4'>
    {children}
  </Dialog.Description>
);
