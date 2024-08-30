import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export type Project = {
  id: number;
  created_at: Date;
  project_type: string;
  start_date: Date;
  end_date: Date;
  project_manager: number;
  comment: string;
  status: 'active' | 'inactive';
};

export type PaginatedProjects = {
  employees: Project[];
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

export async function getProjects({
  page,
  sortBy,
  filter,
}: {
  page: number;
  sortBy?: SortBy;
  filter?: Filter;
}) {
  let query = supabase.from('Projects').select(
    `
      id,
      created_at,
      project_type,
      start_date,
      end_date,
      project_manager!inner(full_name),
      comment,
      status
    `,
    { count: 'exact' },
  );

  if (filter && filter.filterHeader && filter.filterValue) {
    const numericFields = ['id', 'out_of_office_balance'];

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
    throw new Error('Projects could not be loaded');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = data.map((project: any) => ({
    ...project,
    project_manager: project.project_manager.full_name,
  }));

  return { projects, count };
}

export async function createProject(project: Project) {
  const { data, error } = await supabase.from('Projects').insert(project);

  if (error) {
    console.log(error);
    throw new Error('Projects could not be loaded');
  }

  console.log(data);

  return data;
}

export async function deleteProject(id: number) {
  const { data, error } = await supabase.from('Projects').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Project could not be deleted');
  }

  return data;
}

export async function editProject(project: Project) {
  const { data, error } = await supabase
    .from('Projects')
    .update(project)
    .eq('id', project.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Project could not be updated');
  }
  return data;
}
