import Search from '../../ui/Search';
import SortBy from '../../ui/SortBy';

const LeaveRequestTableOperations = () => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <Search
        options={[
          { value: 'id' },
          { value: 'employee' },
          { value: 'absence_reason' },
          { value: 'comment' },
          { value: 'status' },
        ]}
      />
      <SortBy
        options={[
          { value: 'id-asc', label: 'Sort by id (low first)' },
          { value: 'id-desc', label: 'Sort by id (high first)' },
          { value: 'employee-asc', label: 'Sort by employee (A-Z)' },
          { value: 'employee-desc', label: 'Sort by employee (Z-A)' },
          {
            value: 'absence_reason-asc',
            label: 'Sort by absence reason (A-Z)',
          },
          {
            value: 'absence_reason-desc',
            label: 'Sort by absence reason (Z-A)',
          },
          { value: 'comment-asc', label: 'Sort by comment (A-Z)' },
          { value: 'comment-desc', label: 'Sort by comment (Z-A)' },
          {
            value: 'status-asc',
            label: 'Sort by status (A-Z)',
          },
          {
            value: 'status-desc',
            label: 'Sort by status (Z-A)',
          },
        ]}
      />
    </div>
  );
};

export default LeaveRequestTableOperations;
