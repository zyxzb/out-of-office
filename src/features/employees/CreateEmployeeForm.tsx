import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import useCreateEmployee from './useCreateEmployee';
import useEditEmployee from './useEditEmployee';
import { Employee } from '../../services/apiEmployees';
import { Button } from '../../shadcn/components/ui/button';
import { Input } from '../../shadcn/components/ui/input';
import FormRow from '../../ui/FormRow';
import SelectEmployee from '../leaveRequests/SelectEmployee';
import SelectStatus from '../projects/SelectStatus';

type EmployeeRowProps = {
  employee?: Employee;
  closeModal?: () => void;
};

const CreateEmployeeForm = ({ employee, closeModal }: EmployeeRowProps) => {
  const { createEmployee, isCreating } = useCreateEmployee();
  const { editEmployee, isEditing } = useEditEmployee();

  const isEditSession = Boolean(employee?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Employee>({
    defaultValues: isEditSession
      ? // edit later default select
        { ...employee, people_partner: undefined }
      : {
          full_name: '',
          subdivision: '',
          position: '',
          status: '',
          people_partner: '',
          photo: '',
          out_of_office_balance: undefined,
        },
  });

  const onSubmit: SubmitHandler<Employee> = (data) => {
    if (isEditSession && employee) {
      editEmployee(
        { newEmployeeData: { ...data }, id: employee.id },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        },
      );
    } else {
      createEmployee(data, {
        onSuccess: () => {
          reset();
          closeModal?.();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <FormRow label='Full name' error={errors?.full_name?.message}>
        <Input
          id='full_name'
          {...register('full_name', {
            required: 'Full name is required',
          })}
        />
      </FormRow>
      <FormRow label='Subdivision' error={errors?.subdivision?.message}>
        <Input
          id='subdivision'
          {...register('subdivision', {
            required: 'Subdivision is required',
          })}
        />
      </FormRow>
      <FormRow label='Position' error={errors?.position?.message}>
        <Input
          id='position'
          {...register('position', {
            required: 'Position is required',
          })}
        />
      </FormRow>

      <Controller
        name='people_partner'
        control={control}
        rules={{ required: 'People partner selection is required' }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <SelectEmployee
              selectName='Select people partner'
              selectedItem={field.value}
              setSelectedItem={(item) => field.onChange(Number(item))}
              employee={employee}
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
        rules={{ required: 'Employee status is required' }}
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

      <FormRow
        label='Out of office balance'
        error={errors?.out_of_office_balance?.message}
      >
        <Input
          id='out_of_office_balance'
          type='number'
          {...register('out_of_office_balance', {
            required: 'Out of office balance is required',
            validate: (value) =>
              value >= 0 || 'Out of office balance must be at least 0',
          })}
        />
      </FormRow>

      <FormRow label='Photo' error={errors?.photo?.message}>
        <Input
          id='photo'
          {...register('photo')}
          type='file'
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

export default CreateEmployeeForm;
