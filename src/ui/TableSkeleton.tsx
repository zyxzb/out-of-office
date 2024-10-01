import { Skeleton } from '../shadcn/components/ui/skeleton';
import { useRowsStore } from '../store/selectRows-store';

const TableSkeleton = () => {
  const { numberOfRows } = useRowsStore();
  return (
    <div className='flex flex-col gap-2 border p-4'>
      <Skeleton className='h-20' />
      {Array.from({ length: numberOfRows }).map((_, index) => (
        <Skeleton key={index} className='h-12' />
      ))}
    </div>
  );
};

export default TableSkeleton;
