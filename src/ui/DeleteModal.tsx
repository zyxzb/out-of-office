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

export type DeleteEditModalProps = {
  deleteDialogTitle: string;
  onDelete: () => void;
  isDeleting: boolean;
};

const DeleteModal = ({
  deleteDialogTitle,
  onDelete,
  isDeleting,
}: DeleteEditModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive' className='w-max-w flex gap-1'>
          <HiTrash /> Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{deleteDialogTitle}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this permanently? This action cannot
            be undone.
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

export default DeleteModal;
