import CreateRequestForm from '../features/LeaveRequests/CreateRequestForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn/components/ui/dialog';

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='font-sono flex flex-col gap-8 dark:bg-black'>
        <DialogHeader>
          <DialogTitle>Leave Request</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <CreateRequestForm />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
