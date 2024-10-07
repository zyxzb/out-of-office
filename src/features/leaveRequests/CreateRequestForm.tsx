import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import SelectEmployee from './SelectEmployee';
import useCreateLeaveRequest from './useCreateLeaveRequest';
import useEditLeaveRequest from './useEditLeaveRequest';
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

type CreateRequestForm = {
  request?: LeaveRequest;
  closeModal?: () => void;
};

const CreateRequestForm = ({ request, closeModal }: CreateRequestForm) => {
  const { createLeaveRequest, isCreating } = useCreateLeaveRequest();
  const { editLeaveRequest, isEditing } = useEditLeaveRequest();

  const isEditSession = Boolean(request?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    trigger,
  } = useForm<LeaveRequest>({
    defaultValues: isEditSession
      ? { ...request, employee: request?.id }
      : {
          employee: undefined,
          absence_reason: '',
          comment: '',
          status: 'new',
          start_date: undefined,
          end_date: undefined,
        },
  });

  const onSubmit: SubmitHandler<LeaveRequest> = (data) => {
    if (isEditSession && request) {
      editLeaveRequest(data, {
        onSuccess: () => {
          reset();
          closeModal?.();
        },
      });
    } else {
      createLeaveRequest(data, {
        onSuccess: () => {
          reset();
          closeModal?.();
        },
      });
    }
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
              selectName='Select an employee'
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
          rules={{
            required: 'Start Date is required',
            validate: (startDate) => {
              const endDate = getValues('end_date');
              return (
                !endDate ||
                startDate <= endDate ||
                'Start date cannot be after end date'
              );
            },
          }}
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
                  onSelect={async (date) => {
                    field.onChange(date); // update value
                    await trigger('end_date'); // revalidation end_date
                  }}
                  className='rounded-md border shadow dark:bg-black'
                  // Disables past dates from current date
                  // fromDate={new Date()}
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
          rules={{
            required: 'End Date is required',
            validate: (endDate) => {
              const startDate = getValues('start_date');
              return (
                !startDate ||
                endDate >= startDate ||
                'End date cannot be before start date'
              );
            },
          }}
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
                  className='rounded-md border shadow dark:bg-black'
                  onSelect={async (date) => {
                    field.onChange(date); // update value
                    await trigger('start_date'); //  'start_date' revalidation
                  }}
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
          {...register('comment', { required: 'Comment is required' })}
        />
      </FormRow>
      <div className='flex gap-2'>
        <Button
          type='submit'
          className='max-w-max px-10'
          disabled={isCreating || isEditing}
        >
          {isCreating ? 'Creating...' : isEditSession ? 'Edit' : 'Create'}
        </Button>
        <Button
          type='button'
          variant='destructive'
          className='max-w-max px-10'
          onClick={closeModal}
        >
          Close
        </Button>
      </div>
    </form>
  );
};

export default CreateRequestForm;
