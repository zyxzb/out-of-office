import { useSearchParams } from 'react-router-dom';

import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../shadcn/components/ui/pagination';
import { useRowsStore } from '../store/selectRows-store';

type PaginationProps = {
  count: number;
};

const Pagination = ({ count }: PaginationProps) => {
  const { numberOfRows } = useRowsStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  const pageCount = Math.ceil(count / numberOfRows);

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', String(next));
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', String(prev));
    setSearchParams(searchParams);
  };

  if (pageCount <= 1) return null;

  const renderPaginationItems = () => {
    const pages = [];
    const pageNeighbors = 1;

    const startPage = Math.max(2, currentPage - pageNeighbors);
    const endPage = Math.min(pageCount - 1, currentPage + pageNeighbors);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={(e) => {
              e.preventDefault();
              searchParams.set('page', String(i));
              setSearchParams(searchParams);
            }}
            className='cursor-pointer'
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (startPage > 2) {
      pages.unshift(
        <PaginationItem key='ellipsis1'>
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    if (endPage < pageCount - 1) {
      pages.push(
        <PaginationItem key='ellipsis2'>
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    pages.unshift(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={(e) => {
            e.preventDefault();
            searchParams.set('page', '1');
            setSearchParams(searchParams);
          }}
          className='cursor-pointer'
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    if (pageCount > 1) {
      pages.push(
        <PaginationItem key={pageCount}>
          <PaginationLink
            onClick={(e) => {
              e.preventDefault();
              searchParams.set('page', String(pageCount));
              setSearchParams(searchParams);
            }}
            className='cursor-pointer'
            isActive={currentPage === pageCount}
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <ShadPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={prevPage} className='cursor-pointer'>
            <span>Prev</span>
          </PaginationPrevious>
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext onClick={nextPage} className='cursor-pointer'>
            <span>Next</span>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </ShadPagination>
  );
};

export default Pagination;
