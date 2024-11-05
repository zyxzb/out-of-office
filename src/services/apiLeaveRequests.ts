import supabase from './supabase';

export type LeaveRequest = {
  id: number;
  created_at: Date;
  employee: number;
  absence_reason: string;
  start_date: Date;
  end_date: Date;
  comment: string;
  status: string;
};

export type PaginatedProjects = {
  employees: LeaveRequest[];
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

export async function getRequests({
  page,
  numberOfRows,
  sortBy,
  filter,
}: {
  page: number;
  numberOfRows: number;
  sortBy?: SortBy;
  filter?: Filter;
}) {
  let query = supabase.from('LeaveRequests').select(
    `
      id,
      created_at,
      employee!inner(full_name),
      absence_reason,
      start_date,
      end_date,
      comment,
      status
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
    const from = (page - 1) * numberOfRows;
    const to = from + numberOfRows - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error('Requests could not be loaded');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requests = data.map((request: any) => ({
    ...request,
    employee: request.employee.full_name,
  }));

  return { requests, count };
}

export async function deleteLeaveRequest(id: number) {
  const { data, error } = await supabase
    .from('LeaveRequests')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('LeaveRequests could not be deleted');
  }

  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createEditRequest(leaveRequests: any, id?: number) {
  // const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');

  // const imagePath = hasImagePath
  //   ? newCabin.image
  //   : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin

  console.log('leaveRequests --->', leaveRequests);

  let query;

  // A) CREATE

  if (!id) {
    query = supabase.from('LeaveRequests').insert(leaveRequests);
  }

  // B) EDIT

  if (id) {
    query = supabase
      .from('LeaveRequests')
      .update({
        ...leaveRequests,
        // image: imagePath
      })
      .eq('id', id)
      .select();
  }

  const response = await query;

  // Check if the query was successful

  if (response?.error) {
    console.error(response.error);
    throw new Error('LeaveRequests could not be created/updated');
  }

  return response?.data;
  // 2. upload image if successful

  // if (hasImagePath) return data;

  // const { error: storageError } = await supabase.storage
  //   .from('cabin-images')
  //   .upload(
  //     imageName,
  //     newCabin.image);

  // 3. Delete the cabin if there was an error uploading image

  // console.log('storageError ->', storageError);

  // if (storageError) {
  //   await supabase.from('cabins').delete().eq('id', data.id);
  //   throw new Error(
  //     'Cabins image could not be uploaded and the cabin was not created',
  //   );
  // }
}

export async function editLeaveRequest(leaveRequests: LeaveRequest) {
  const { data, error } = await supabase
    .from('LeaveRequests')
    .update(leaveRequests)
    .eq('id', leaveRequests.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Leave Request could not be updated');
  }
  return data;
}

// for testing

export async function getAcceptedApprovalRequests() {
  const { data, error } = await supabase
    .from('LeaveRequests')
    .select(
      `
      created_at,
      employee!inner(full_name),
      absence_reason,
      start_date,
      end_date,
      comment,
      status`,
    )
    .eq('status', 'accepted');

  if (error) {
    console.log(error);
    throw new Error('LeaveRequests could not be loaded');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requests = data.map((request: any) => ({
    ...request,
    employee: request.employee.full_name,
  }));

  return requests;
}
