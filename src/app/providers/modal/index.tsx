import { createContext, type ReactNode, useState } from 'react';

export interface ModalState {
  isOpen: boolean;
  modalId: string | null;
  payload?: unknown;
}

export interface ModalContextType extends ModalState {
  openModal: (modalId: string, payload?: unknown) => void;
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

  const openModal = (modalId: string, payload?: unknown) => {
    setModal({ isOpen: true, modalId, payload });
  };

  const closeModal = () => {
    setModal({ isOpen: false, modalId: null, payload: undefined });
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: modal.isOpen,
        modalId: modal.modalId,
        payload: modal.payload,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
