import supabase from './supabase';

type signupProps = {
  fullName: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  password: any;
};

export type LoginProps = {
  email: string;
  password: string;
};

type updateCurrentUserProps = {
  fullName?: string;
  password: string;
};

export async function signup({ fullName, email, password }: signupProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: '' } },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: LoginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
}: updateCurrentUserProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let updateData: any;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  return data;
}
