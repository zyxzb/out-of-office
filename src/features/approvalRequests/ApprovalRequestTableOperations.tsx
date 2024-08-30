import Filter from '../../ui/Filter';
import Search from '../../ui/Search';
import SortBy from '../../ui/SortBy';

const ApprovalRequestTableOperations = () => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <Search
        options={[
          { value: 'id' },
          { value: 'approver' },
          { value: 'subdivision' },
          { value: 'leave_request' },
          { value: 'status' },
          { value: 'comment' },
        ]}
      />
      <div className='flex items-center justify-end gap-4'>
        <Filter
          filterField={'status'}
          options={[
            { value: 'all', label: 'All' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
          ]}
        />
        <SortBy
          options={[
            { value: 'id-asc', label: 'Sort by id (low first)' },
            { value: 'id-desc', label: 'Sort by id (high first)' },
            { value: 'approver-asc', label: 'Sort by approver name (A-Z)' },
            { value: 'approver-desc', label: 'Sort by approver name (Z-A)' },
            {
              value: 'leave_request-asc',
              label: 'Sort by leave request (A-Z)',
            },
            {
              value: 'leave_request-desc',
              label: 'Sort by leave request (Z-A)',
            },
            { value: 'status-asc', label: 'Sort by status (A-Z)' },
            { value: 'status-desc', label: 'Sort by status (Z-A)' },
            {
              value: 'comment-asc',
              label: 'Sort by comment (A-Z)',
            },
            {
              value: 'comment-desc',
              label: 'Sort by comment (Z-A)',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ApprovalRequestTableOperations;
