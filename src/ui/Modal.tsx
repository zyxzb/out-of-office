import { Dispatch, SetStateAction } from 'react';

import { Button } from '../shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn/components/ui/dialog';

type ModalProps = {
  buttonText: string;
  dialogTitle: string;
  children: React.ReactNode;
  dialogDescription?: string;
  icon?: JSX.Element;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>> | ((isOpen: boolean) => void);
};

const Modal = ({
  buttonText,
  dialogTitle,
  dialogDescription,
  children,
  icon,
  open,
  setOpen,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='flex max-w-max gap-1'>
          {icon} {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-8 dark:bg-black'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
