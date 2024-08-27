import { Skeleton } from '../shadcn/components/ui/skeleton';
import { PAGE_SIZE } from '../utils/constants';

const TableSkeleton = () => {
  return (
    <div className='flex flex-col gap-2 border p-4'>
      <Skeleton className='h-20' />
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <Skeleton key={index} className='h-12' />
      ))}
    </div>
  );
};

export default TableSkeleton;
