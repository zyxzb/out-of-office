import supabase from './supabase';

export type Employee = {
  id: number;
  created_at: Date;
  full_name: string;
  subdivision: string;
  position: string;
  status: number;
  people_partner: string;
  photo?: string;
  out_of_office_balance: number;
};

export async function getEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase.from('Employees').select(`
      id,
      created_at,
      full_name,
      subdivision,
      position,
      status,
      people_partner!inner(full_name),
      photo,
      out_of_office_balance
    `);

  if (error) {
    console.log(error);
    throw new Error('Employees could not be loaded');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const employees = data.map((employee: any) => ({
    ...employee,
    people_partner: employee.people_partner.full_name,
  }));

  return employees as Employee[];
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
