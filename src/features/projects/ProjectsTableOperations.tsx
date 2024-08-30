import Filter from '../../ui/Filter';
import Search from '../../ui/Search';
import SortBy from '../../ui/SortBy';

const ProjectsTableOperations = () => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <Search
        options={[
          { value: 'id' },
          { value: 'project_type' },
          { value: 'project_manager' },
          { value: 'comment' },
          { value: 'status' },
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
            { value: 'project_type-asc', label: 'Sort by project type (A-Z)' },
            { value: 'project_type-desc', label: 'Sort by project type (Z-A)' },
            {
              value: 'project_manager-asc',
              label: 'Sort by project manager (A-Z)',
            },
            {
              value: 'project_manager-desc',
              label: 'Sort by project manager (Z-A)',
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
    </div>
  );
};

export default ProjectsTableOperations;
