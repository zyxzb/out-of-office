import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import useCreateEmployee from './useCreateEmployee';
import { Employee } from '../../services/apiEmployees';
import { Button } from '../../shadcn/components/ui/button';
import { Input } from '../../shadcn/components/ui/input';
import FormRow from '../../ui/FormRow';
import SelectEmployee from '../LeaveRequests/SelectEmployee';

const CreateEmployeeForm = () => {
  const { createEmployee, isCreating } = useCreateEmployee();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Employee>({
    defaultValues: {
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
    createEmployee(data, {
      onSuccess: () => {
        reset();
      },
    });
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

      <Button type='submit' className='max-w-max px-10' disabled={isCreating}>
        {isCreating ? 'Creating...' : 'Create'}
      </Button>
    </form>
  );
};

export default CreateEmployeeForm;
