import supabase from './supabase'; // { supabaseUrl }

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

export async function getRequests(): Promise<LeaveRequest[]> {
  const { data, error } = await supabase.from('LeaveRequests').select(`
      id,
      created_at,
      employee!inner(full_name),
      absence_reason,
      start_date,
      end_date,
      comment,
      status
    `);

  if (error) {
    console.log(error);
    throw new Error('Requests could not be loaded');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requests = data.map((request: any) => ({
    ...request,
    employee: request.employee.full_name,
  }));

  return requests as LeaveRequest[];
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
