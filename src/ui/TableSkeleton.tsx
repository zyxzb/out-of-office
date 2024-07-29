import { Skeleton } from '../shadcn/components/ui/skeleton';

const TableSkeleton = () => {
  return (
    <div className='flex flex-col gap-2 border p-4'>
      <Skeleton className='h-20' />
      <Skeleton className='h-12' />
      <Skeleton className='h-12' />
      <Skeleton className='h-12' />
      <Skeleton className='h-12' />
      <Skeleton className='h-12' />
    </div>
  );
};

export default TableSkeleton;
