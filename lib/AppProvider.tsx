import { ModalProvider } from './useModal';

export const AppProvider = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};
