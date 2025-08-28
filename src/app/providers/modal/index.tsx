import { createContext, type ReactNode, useState } from 'react';

export interface ModalState {
  isOpen: boolean;
  modalId: string | null;
}

export interface ModalContextType extends ModalState {
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    modalId: null,
  });

  const openModal = (modalId: string) => {
    setModal({ isOpen: true, modalId });
  };

  const closeModal = () => {
    setModal({ isOpen: false, modalId: null });
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: modal.isOpen,
        modalId: modal.modalId,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
