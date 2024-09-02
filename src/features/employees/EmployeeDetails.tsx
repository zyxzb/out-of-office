import { format } from 'date-fns';

import EmployeeGridCard from './EmployeeGridCard';
import useEmployee from './useEmployee';
import Heading from '../../ui/Heading';

const EmployeeDetails = () => {
  const { employee, isLoading, isError, error } = useEmployee();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  const {
    full_name,
    id,
    created_at,
    subdivision,
    position,
    status,
    people_partner,
    out_of_office_balance,
  } = employee;

  return (
    <>
      <Heading as='h1'>
        Employee {full_name}, ID - #{id}
      </Heading>
      <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
        <EmployeeGridCard
          name='Account created at:'
          value={format(created_at, 'yyyy-MM-dd')}
        />
        <EmployeeGridCard name='Subdivision:' value={subdivision} />
        <EmployeeGridCard name='Position:' value={position} />
        <EmployeeGridCard
          name='Status:'
          value={status}
          valueStyles={`uppercase ${status === 'active' ? 'text-green-500' : 'text-red-500'}`}
        />
        <EmployeeGridCard
          name='People partner:'
          value={people_partner === id ? 'no partner' : people_partner}
        />
        <EmployeeGridCard
          name='Available day-offs:'
          value={out_of_office_balance}
        />
      </div>
    </>
  );
};

export default EmployeeDetails;
