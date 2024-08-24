import { useState } from 'react';
import { HiMiniEllipsisVertical, HiPencil } from 'react-icons/hi2';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../shadcn/components/ui/dropdown-menu';

// type EditModalProps = {
//   dialogTitle: string;
//   onDelete: () => void;
//   isDeleting: boolean;
// };

const EditModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='h-8 w-8 p-0'>
          <HiMiniEllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='flex flex-col gap-2'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='flex w-full gap-1'>
              <HiPencil /> Edit
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {/* {dialogTitle} */}
                test title
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to edit this?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='block'>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              {/* <Button onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditModal;
