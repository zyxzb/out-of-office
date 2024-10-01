import { ReactNode } from 'react';

import { Table as TableShadCn, TableBody } from '../shadcn/components/ui/table';

type Table2Props<T> = {
  children: ReactNode;
  data: T[];
  render: (item: T) => ReactNode;
};

const Table = <T,>({ children, data, render }: Table2Props<T>) => {
  return (
    <TableShadCn>
      {children}
      <TableBody>{data.map(render)}</TableBody>
    </TableShadCn>
  );
};

export default Table;
