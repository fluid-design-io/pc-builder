'use client';

import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';
import clsxm from './clsxm';
import { ToastProvider } from './useToast';

type PresentModalProps<P = unknown> = P & {
  /**
   * This `children` props is custom component that user can pass in
   * to render in the modal.
   */
  children?: React.PropsWithChildren<any>;
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
      children,
      ...props
    }: {
      options: PresentModalProps;
      dismiss: (id: string) => void;
      count?: number;
      index?: number;
      /**
       * This `children` props is the nested modals that are rendered
       * when the user clicks on the `present` button of a modal.
       * This is a recursive component.
       */
      children?: ReactNode;
    },
    ref
  ) => {
    const customOnClose = useRef(null);
    const Component = options?.children;
    const y = Math.abs(count - index) * 20 - 20;
    let filterBrightness = 1 - count * 0.15 + (index + 1) * 0.15;
    let scale = 1 - Math.pow(Math.abs(count - index + 1), 2) * 0.01;
    scale < 0.5 && (scale = 0.5);
    filterBrightness < 0.7 && (filterBrightness = 0.7);

    /**
     * This is a custom hook that is used to dismiss the modal.
     * If the user has passed in a custom `onClose` function,
     * then we call that function instead of the default `dismiss`
     * function.
     */
    const handleClose = () => {
      if (customOnClose.current) {
        customOnClose.current();
      } else {
        dismiss(options.id);
      }
    };

    return (
      <Dialog
        open={true}
        onClose={handleClose}
        className='fixed inset-0 z-50 overflow-y-auto'
        key={`dialog-root-${options.id}`}
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

          <AnimatePresence mode='wait'>{children}</AnimatePresence>
        </motion.div>
      </Dialog>
    );
  }
);

export const TestComponent = ({ children = null, ...props }) => {
  return (
    <div
      className='m-4 rounded border border-dashed border-blue-300 px-4'
      {...props}
    >
      <h1 className='text-2xl'>Component (Nested {props?.count})</h1>
      {children} -- {props?.id}
    </div>
  );
};

export const ModalContext = createContext<ModalProps>(null);
export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState<PresentModalProps[]>([]);
  // const present = (options: PresentModalProps) => {
  //   const id = Math.random().toString(36).substr(2, 9);
  //   setModals([...modals, { ...options, id }]);
  // };
  const dismiss = (id: string) => {
    setModals(modals.filter((modal) => modal.id !== id));
  };

  /* ====== start expiremental feature ===== */
  const present = ({ ...options }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const m = {
      id,
      component: ({ ...props }) => (
        <Modal
          key={`modal-${id}`}
          {...({
            dismiss,
            options: {
              ...options,
              id,
            },
            ...props,
          } as any)}
        />
      ),
    };
    setModals([...modals, m]);
  };
  const result = modals.reduceRight(
    (all, item, index) => ({ [index]: { ...item, ...all } }),
    {}
  );

  const getChildren = (obj, index = -1) => {
    const children = [];
    for (const key in obj) {
      if (obj[key].component) {
        index++;
        children.push(
          obj[key].component({
            children: getChildren(obj[key], index),
            count: modals.length,
            index,
          })
        );
      }
    }
    return children;
  };

  const modalComponents = getChildren(result);

  return (
    <ModalContext.Provider value={{ present, dismiss }}>
      <ToastProvider>
        {children}
        <AnimatePresence mode='wait'>{modalComponents}</AnimatePresence>
      </ToastProvider>
    </ModalContext.Provider>
  );
};

/**
 * This is a custom hook that is used to present a single modal.
 * @param userFunctionalComponent - The component to be rendered in the modal, props will be passed to this component
 * @param props - Any props to be passed to the modal
 * @returns `[presentModal, dismissModal]`
 */
export const useModal = (
  userFunctionalComponent: React.PropsWithChildren<any>,
  props = {}
) => {
  const { present, dismiss } = useContext(ModalContext);
  const presentModal = (options: PresentModalProps) =>
    present({ ...options, children: userFunctionalComponent, ...props });

  return [presentModal as any, dismiss];
};

export const ModalHeader = ({ className = '', children }) => (
  <Dialog.Title
    as='h1'
    className={clsxm('mb-4 font-bold md:text-2xl lg:text-2xl', className)}
  >
    {children}
  </Dialog.Title>
);

export const ModalFooter = ({ className = '', children }) => {
  return (
    <div
      className={clsxm(
        'flex flex-col gap-4 bg-gray-50 px-4 py-3 dark:bg-gray-800 sm:flex-row-reverse sm:px-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export const ModalContainer = forwardRef(
  (
    { className = '', children }: { className?: string; children: ReactNode },
    ref
  ) => (
    <Dialog.Panel
      ref={ref as any}
      className={clsxm(
        'card-primary w-full max-w-2xl rounded-md !p-0 shadow-lg',
        className
      )}
    >
      {children}
    </Dialog.Panel>
  )
);

export const ModalBody = ({ className = '', children }) => (
  <div className={clsxm('px-4 py-5 sm:p-6', className)}>{children}</div>
);

export const ModalDescription = ({ className = '', children }) => (
  <Dialog.Description as='p' className={clsxm('mb-4', className)}>
    {children}
  </Dialog.Description>
);
