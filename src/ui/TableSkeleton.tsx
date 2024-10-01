import { Skeleton } from '../shadcn/components/ui/skeleton';
import { useRowsStore } from '../store/selectRows-store';

const TableSkeleton = () => {
  const { numberOfRows } = useRowsStore();

  return (
    <div className='flex flex-col gap-2 overflow-auto border p-4'>
      <Skeleton className='min-h-20' />
      {Array.from({ length: numberOfRows }).map((_, index) => (
        <Skeleton key={index} className='min-h-12' />
      ))}
    </div>
  );
};

export default TableSkeleton;
