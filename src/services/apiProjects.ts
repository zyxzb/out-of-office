import supabase from './supabase';

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

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from('Projects').select(`
      id,
      created_at,
      project_type,
      start_date,
      end_date,
      project_manager!inner(full_name),
      comment,
      status
    `);

  if (error) {
    console.log(error);
    throw new Error('Projects could not be loaded');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = data.map((project: any) => ({
    ...project,
    project_manager: project.project_manager.full_name,
  }));

  return projects as Project[];
}

export async function createProject(project: Project): Promise<Project> {
  const { data, error } = await supabase.from('Projects').insert(project);

  if (error) {
    console.log(error);
    throw new Error('Projects could not be loaded');
  }

  console.log(data);

  return data as unknown as Project;
}
