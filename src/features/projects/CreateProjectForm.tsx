import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import SelectStatus from './SelectStatus';
import useCreateProject from './useCreateProject';
import useEditProject from './useEditProject';
import { Project } from '../../services/apiProjects';
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
import SelectEmployee from '../leaveRequests/SelectEmployee';

type ProjectRowProps = {
  project?: Project;
  closeModal?: () => void;
};

const CreateProjectForm = ({ project, closeModal }: ProjectRowProps) => {
  const { createProject, isCreating } = useCreateProject();
  const { editProject, isEditing } = useEditProject();
  const isEditSession = Boolean(project?.id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    trigger,
  } = useForm<Project>({
    defaultValues: isEditSession
      ? // change project manager later
        { ...project, project_manager: undefined }
      : {
          project_type: '',
          start_date: undefined,
          end_date: undefined,
          project_manager: undefined,
          comment: '',
          status: undefined,
        },
  });

  const onSubmit: SubmitHandler<Project> = (data) => {
    if (isEditSession) {
      editProject(data, {
        onSuccess: () => {
          reset();
          closeModal?.();
        },
      });
    } else {
      createProject(data, {
        onSuccess: () => {
          reset();
          closeModal?.();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <FormRow label='Full name' error={errors?.project_type?.message}>
        <Input
          id='project_type'
          {...register('project_type', {
            required: 'Project type is required',
          })}
        />
      </FormRow>

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
                  className='rounded-md border shadow dark:bg-black'
                  onSelect={async (date) => {
                    field.onChange(date); // update value
                    await trigger('end_date'); // revalidation end_date
                  }}
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

      <Controller
        name='project_manager'
        control={control}
        rules={{ required: 'Project Manager selection is required' }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <SelectEmployee
              selectName='Select project manager'
              selectedItem={field.value}
              setSelectedItem={(item) => field.onChange(Number(item))}
              position='Project Manager'
            />
            {error && (
              <span className='text-xs text-red-500'>{error.message}</span>
            )}
          </div>
        )}
      />

      <Controller
        name='status'
        control={control}
        rules={{ required: 'Status selection is required' }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <SelectStatus
              selectedStatus={field.value}
              setSelectedStatus={(item) => field.onChange(item)}
            />
            {error && (
              <span className='text-xs text-red-500'>{error.message}</span>
            )}
          </div>
        )}
      />

      <FormRow label='Comment' error={errors?.comment?.message}>
        <Input
          id='comment'
          {...register('comment')}
          className='cursor-pointer hover:opacity-80'
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

export default CreateProjectForm;
