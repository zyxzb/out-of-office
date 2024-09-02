import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export type Employee = {
  id: number;
  created_at: Date;
  full_name: string;
  subdivision: string;
  position: string;
  status: string;
  people_partner: number;
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
}) {
  let query = supabase.from('Employees').select(
    `
      id,
      created_at,
      full_name,
      subdivision,
      position,
      status,
      people_partner,
      photo,
      out_of_office_balance
    `,
    { count: 'exact' },
  );

  if (filter && filter.filterHeader && filter.filterValue) {
    const numericFields = ['id', 'out_of_office_balance', 'people_partner'];

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

  const { data: employees, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error('Employees could not be loaded');
  }

  return { employees, count };
}

export async function getEmployeeById(employeeId: number) {
  const { data, error } = await supabase
    .from('Employees')
    .select('*')
    .eq('id', employeeId)
    .single();

  if (error) {
    throw new Error(`Employee ${employeeId} could not be loaded`);
  }

  return data;
}

export async function getEmployeeByName(name: string) {
  const { data, error } = await supabase
    .from('Employees')
    .select('id')
    .ilike('full_name', `%${name}%`);

  if (error) {
    console.log(error);
    throw new Error('Employees could not be loaded');
  }

  return data.map((employee) => employee.id);
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

export async function deleteEmployee(id: number) {
  const { data, error } = await supabase
    .from('Employees')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error);
    throw new Error(`Employee could not be deleted ${error.details ?? null}`);
  }

  return data;
}

export async function getAllEmployees() {
  const { data, error } = await supabase.from('Employees').select('*');

  if (error) {
    console.log(error);
    throw new Error(`Employee could not be deleted ${error.details ?? null}`);
  }

  return data;
}
