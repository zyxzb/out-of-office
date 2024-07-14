import { format } from 'date-fns';
import { useState } from 'react';
import { HiTrash, HiPencil, HiMiniEllipsisVertical } from 'react-icons/hi2';

import useDeleteLeaveRequest from './useDeleteLeaveRequest';
import { LeaveRequest } from '../../services/apiLeaveRequests';
import { Button } from '../../shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../../shadcn/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../shadcn/components/ui/dropdown-menu';
import Table from '../../ui/Table';

type LeaveRequestProps = {
  request: LeaveRequest;
};

const LeaveRequestRow = ({
  request: {
    id: requestId,
    employee,
    absence_reason,
    start_date,
    end_date,
    comment,
    status,
  },
}: LeaveRequestProps) => {
  const { isDeleting, deleteRequest } = useDeleteLeaveRequest();
  const [open, setOpen] = useState(false);

  return (
    <Table.Row>
      <div>{requestId}</div>
      <div>{employee}</div>
      <div>{absence_reason}</div>
      <div>{format(new Date(start_date), 'MMM dd yyyy')}</div>
      <div>{format(new Date(end_date), 'MMM dd yyyy')}</div>
      <div>{comment}</div>
      <div>{status}</div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <HiMiniEllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='flex flex-col gap-2'>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant='destructive' className='flex w-full gap-1'>
                  <HiTrash /> Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Request</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this Request permanently?
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className='block'>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button
                    variant='destructive'
                    onClick={() => deleteRequest(requestId)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button className='flex w-full gap-1' onClick={() => {}}>
              <HiPencil /> Edit
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Table.Row>
  );
};

export default LeaveRequestRow;
