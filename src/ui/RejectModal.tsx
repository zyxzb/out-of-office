import { useState } from 'react';
import { HiTrash } from 'react-icons/hi2';

import { Button } from '../shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../shadcn/components/ui/dialog';

type RejectModalProps = {
  dialogTitle: string;
  onDelete: () => void;
  isDeleting: boolean;
};

const RejectModal = ({
  dialogTitle,
  onDelete,
  isDeleting,
}: RejectModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive' className='flex w-full gap-1'>
          <HiTrash /> Reject
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject this request? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='block'>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant='destructive'
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectModal;
