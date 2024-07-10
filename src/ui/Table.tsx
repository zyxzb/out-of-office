import { createContext, useContext } from 'react';

type TableProps = {
  columns: string;
  children: React.ReactNode;
};

type HeaderProps = {
  children: React.ReactNode;
};

type RowProps = {
  children: React.ReactNode;
};

type BodyProps<T> = {
  data: T[];
  render: (item: T) => React.ReactNode;
};

type TableContextType = {
  columns: string;
};

const TableContext = createContext<TableContextType>({
  columns: 'grid-cols-5',
});

const Table = ({ columns, children }: TableProps) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role='table'
        className='overflow-x-auto border p-4 text-lg transition-[border-color]'
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

const Header = ({ children }: HeaderProps) => {
  const { columns } = useContext(TableContext);

  return (
    <div
      role='row'
      className={`grid ${columns} items-center gap-4 border-b pb-2 transition-[border]`}
    >
      {children}
    </div>
  );
};

const Row = ({ children }: RowProps) => {
  const { columns } = useContext(TableContext);

  return (
    <div role='row' className={`grid ${columns} items-center gap-4 py-4`}>
      {children}
    </div>
  );
};

const Body = <T,>({ data, render }: BodyProps<T>) => {
  if (data.length === 0) return <p>No data to show at the moment</p>;

  return <section>{data.map(render)}</section>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
