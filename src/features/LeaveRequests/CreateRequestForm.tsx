import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import SelectEmployee from './SelectEmployee';
import useCreateLeaveRequest from './useCreateLeaveRequest';
import { LeaveRequest } from '../../services/apiLeaveRequests';
import { Button } from '../../shadcn/components/ui/button';
import { Calendar } from '../../shadcn/components/ui/calendar';
import { Input } from '../../shadcn/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../shadcn/components/ui/popover';
import { cn } from '../../shadcn/lib/utils';
import FormRow from '../../ui/FormRow';

const CreateRequestForm = () => {
  const { createLeaveRequest, isCreating } = useCreateLeaveRequest();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedItem, setSelectedItem] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    // getValues,
  } = useForm<LeaveRequest>();

  const onSubmit: SubmitHandler<LeaveRequest> = (data) => {
    if (!startDate || !endDate) return toast.error('Please select the dates');

    const request = {
      ...data,
      employee: 1,
      status: 'new',
      start_date: startDate,
      end_date: endDate,
    };

    createLeaveRequest(request);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <FormRow label='Employee Name' error={errors?.employee?.message}>
        <Input
          id='employee'
          className='dark:bg-black'
          {...register('employee', { required: 'Employee Name is required' })}
        />
      </FormRow>

      <SelectEmployee
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <FormRow label='Absence reason' error={errors?.absence_reason?.message}>
        <Input
          id='Absence reason'
          className='dark:bg-black'
          {...register('absence_reason', {
            required: 'Absence reason is required',
          })}
        />
      </FormRow>

      {/* Start Date */}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal dark:bg-black',
              !startDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {startDate ? (
              format(startDate, 'PPP')
            ) : (
              <span>Pick a start date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            id='start_date'
            selected={startDate}
            onSelect={setStartDate}
            className='rounded-md border shadow dark:bg-black'
          />
        </PopoverContent>
      </Popover>

      {/* End Date */}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal dark:bg-black',
              !endDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {endDate ? format(endDate, 'PPP') : <span>Pick an end date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            id='start_date'
            selected={endDate}
            onSelect={setEndDate}
            className='rounded-md border shadow dark:bg-black'
          />
        </PopoverContent>
      </Popover>

      <FormRow label='Comment' error={errors?.comment?.message}>
        <Input
          id='comment'
          className='dark:bg-black'
          {...register('comment', { required: 'Start Date is required' })}
        />
      </FormRow>

      <Button type='submit' className='max-w-max px-10' disabled={isCreating}>
        {isCreating ? 'Creating...' : 'Create'}
      </Button>
    </form>
  );
};

export default CreateRequestForm;
