import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export type Employee = {
  id: number;
  created_at: Date;
  full_name: string;
  subdivision: string;
  position: string;
  status: string;
  people_partner: string;
  photo?: string;
  out_of_office_balance: number;
};

export type PaginatedEmployees = {
  employees: Employee[];
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

export async function getEmployees({
  page,
  sortBy,
  filter,
}: {
  page: number;
  sortBy?: SortBy;
  filter?: Filter;
}): Promise<PaginatedEmployees> {
  let query = supabase.from('Employees').select(
    `
      id,
      created_at,
      full_name,
      subdivision,
      position,
      status,
      people_partner!inner(full_name),
      photo,
      out_of_office_balance
    `,
    { count: 'exact' },
  );

  if (filter && filter.filterHeader && filter.filterValue) {
    query = query.eq(filter.filterHeader, filter.filterValue);
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
    throw new Error('Employees could not be loaded');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const employees = data.map((employee: any) => ({
    ...employee,
    people_partner: employee.people_partner.full_name,
  }));

  return { employees, count };
}

export async function getEmployeeById(id: number): Promise<Employee[]> {
  const { data, error } = await supabase
    .from('Employees')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    throw new Error('Employees could not be loaded');
  }

  return data as Employee[];
}

export async function createEditEmployee(employee: Employee, id?: number) {
  console.log('Employee --->', employee);

  let query;

  // A) CREATE

  if (!id) {
    query = supabase.from('Employees').insert(employee);
  }

  // B) EDIT

  if (id) {
    query = supabase
      .from('Employees')
      .update({
        ...employee,
        // image: imagePath
      })
      .eq('id', id)
      .select();
  }

  const response = await query;

  // Check if the query was successful

  if (response?.error) {
    console.error(response.error);
    throw new Error('Employee could not be created/updated');
  }

  return response?.data;
}
