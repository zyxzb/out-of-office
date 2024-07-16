import Filter from '../../ui/Filter';
import Search from '../../ui/Search';
import SortBy from '../../ui/SortBy';

const EmployeesTableOperations = () => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <Search
        options={[
          { value: 'id' },
          { value: 'full_name' },
          { value: 'subdivision' },
          { value: 'position' },
          { value: 'status' },
          { value: 'people_partner' },
          { value: 'out_of_office_balance' },
        ]}
      />
      <div className='flex items-center justify-end gap-4'>
        <Filter
          filterField={'status'}
          options={[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
        />
        <SortBy
          options={[
            { value: 'id-asc', label: 'Sort by id (low first)' },
            { value: 'id-desc', label: 'Sort by id (high first)' },
            { value: 'full_name-asc', label: 'Sort by name (A-Z)' },
            { value: 'full_name-desc', label: 'Sort by name (Z-A)' },
            { value: 'subdivision-asc', label: 'Sort by subdivision (A-Z)' },
            { value: 'subdivision-desc', label: 'Sort by subdivision (Z-A)' },
            { value: 'position-asc', label: 'Sort by position (A-Z)' },
            { value: 'position-desc', label: 'Sort by position (Z-A)' },
            {
              value: 'people_partner-asc',
              label: 'Sort by People Partner (A-Z)',
            },
            {
              value: 'people_partner-desc',
              label: 'Sort by People Partner (Z-A)',
            },
            {
              value: 'out_of_office_balance-asc',
              label: 'Sort by Day-offs (low first)',
            },
            {
              value: 'out_of_office_balance-desc',
              label: 'Sort by Day-offs (high first)',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default EmployeesTableOperations;
