import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export type ApprovalRequest = {
  id: number;
  created_at: Date;
  approver: string;
  leave_request: number;
  status: string;
  comment: number;
};

export type PaginatedProjects = {
  employees: ApprovalRequest[];
  count: number | null;
};

export type SortBy = {
  field: string;
  direction: 'asc' | 'desc';
};

export type Filter = {
  filterHeader?: string;
  filterValue?: string | number;
  status?: string;
};

export async function getApprovalRequests({
  page,
  sortBy,
  filter,
}: {
  page: number;
  sortBy?: SortBy;
  filter?: Filter;
}) {
  let query = supabase.from('ApprovalRequests').select(
    `
      id,
      created_at,
      approver!inner(full_name),
      leave_request,
      status,
      comment
    `,
    { count: 'exact' },
  );

  if (filter && filter.filterHeader && filter.filterValue) {
    const numericFields = ['id'];

    if (numericFields.includes(filter.filterHeader)) {
      query = query.eq(filter.filterHeader, filter.filterValue);
    } else {
      query = query.ilike(filter.filterHeader, `%${filter.filterValue}%`);
    }
  }

  if (filter && filter.status) {
    if (filter.status === 'all') query;
    else query = query.eq('status', filter.status);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.log(error);
    throw new Error('ApprovalRequests could not be loaded');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const approvalRequests = data.map((approvalRequest: any) => ({
    ...approvalRequest,
    approver: approvalRequest.approver.full_name,
  }));

  return { approvalRequests, count };
}
