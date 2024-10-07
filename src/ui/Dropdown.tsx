import { ReactElement } from 'react';
import { HiPencil } from 'react-icons/hi2';
import { RxDotsVertical } from 'react-icons/rx';

import Modal from './CCPModal';
import DeleteModal, { DeleteEditModalProps } from './DeleteModal';
import { Button } from '../shadcn/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../shadcn/components/ui/dropdown-menu';

type DropdownProps = {
  children: React.ReactNode;
  dialogTitle: string;
};

type DropdownWithDeleteEditModal = DropdownProps & DeleteEditModalProps;

const Dropdown = ({
  children,
  dialogTitle,
  deleteDialogTitle,
  isDeleting,
  onDelete,
}: DropdownWithDeleteEditModal) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='rounded-md border p-2'>
          <RxDotsVertical size={22} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='absolute right-0 flex flex-col gap-2 p-2'>
        <DropdownMenuItem asChild>
          <Modal>
            <Modal.Trigger>
              <HiPencil /> Edit
            </Modal.Trigger>
            <Modal.Content dialogTitle={dialogTitle}>
              {children as ReactElement}
            </Modal.Content>
          </Modal>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteModal
            deleteDialogTitle={deleteDialogTitle}
            isDeleting={isDeleting}
            onDelete={onDelete}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
