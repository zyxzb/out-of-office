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
  dialogDescription: string;
};

const Modal = ({
  buttonText,
  dialogTitle,
  dialogDescription,
  children,
}: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='max-w-max'>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-8 dark:bg-black'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
