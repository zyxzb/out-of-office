import { ReactNode } from 'react';

import { Table as TableShadCn, TableBody } from '../shadcn/components/ui/table';

type TableProps<T> = {
  children: ReactNode;
  data: T[];
  render: (item: T) => ReactNode;
};

const Table = <T,>({ children, data, render }: TableProps<T>) => {
  return (
    <TableShadCn>
      {children}
      <TableBody>{data.map(render)}</TableBody>
    </TableShadCn>
  );
};

export default Table;
