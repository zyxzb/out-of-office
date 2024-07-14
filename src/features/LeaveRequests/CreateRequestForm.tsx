import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LeaveRequest>({
    defaultValues: {
      employee: undefined,
      absence_reason: '',
      comment: '',
      status: 'new',
      start_date: undefined,
      end_date: undefined,
    },
  });

  const onSubmit: SubmitHandler<LeaveRequest> = (data) => {
    createLeaveRequest(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <Controller
        name='employee'
        control={control}
        rules={{ required: 'Employee selection is required' }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <SelectEmployee
              selectedItem={field.value}
              setSelectedItem={(item) => field.onChange(Number(item))}
            />
            {error && (
              <span className='text-xs text-red-500'>{error.message}</span>
            )}
          </div>
        )}
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

      <div className='flex flex-col gap-2'>
        <Controller
          name='start_date'
          control={control}
          rules={{ required: 'Start Date is required' }}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-[280px] justify-start text-left font-normal dark:bg-black',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  className='rounded-md border shadow dark:bg-black'
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.start_date && (
          <span className='text-xs text-red-500'>
            {errors.start_date.message}
          </span>
        )}
      </div>

      {/* End Date */}

      <div className='flex flex-col gap-2'>
        <Controller
          name='end_date'
          control={control}
          rules={{ required: 'End Date is required' }}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-[280px] justify-start text-left font-normal dark:bg-black',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick an end date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  className='rounded-md border shadow dark:bg-black'
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.end_date && (
          <span className='text-xs text-red-500'>
            {errors.end_date.message}
          </span>
        )}
      </div>

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
