import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  cloneElement,
  ReactElement,
} from 'react';

import { Button } from '../shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn/components/ui/dialog';

type ModalType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
};

// Create the context with default values
const ModalContext = createContext<ModalType>({
  open: false,
  setOpen: () => {},
  closeModal: () => {},
});

export const useModalContext = () => useContext(ModalContext);

const Modal = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <ModalContext.Provider value={{ open, setOpen, closeModal }}>
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
      </Dialog>
    </ModalContext.Provider>
  );
};

const Trigger = ({ children }: { children: ReactNode }) => {
  return (
    <DialogTrigger asChild>
      <Button className='flex max-w-max gap-1'>{children}</Button>
    </DialogTrigger>
  );
};

const Content = ({
  children,
  dialogTitle,
  dialogDescription,
}: {
  children: ReactElement;
  dialogTitle: string;
  dialogDescription?: string;
}) => {
  const { closeModal } = useModalContext();

  return (
    <DialogContent className='flex flex-col gap-8 dark:bg-black'>
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogDescription && (
          <DialogDescription>{dialogDescription}</DialogDescription>
        )}
      </DialogHeader>
      {/* Clone the children and pass closeModal as prop */}
      {cloneElement(children, { closeModal })}
    </DialogContent>
  );
};

Modal.Trigger = Trigger;
Modal.Content = Content;

export default Modal;
