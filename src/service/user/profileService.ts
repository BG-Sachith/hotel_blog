export const createProfile = async (profile: any) => {
  try {
    const res = await fetch(`/api/user/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: profile }),
    });
    return { data: await res.json(), status: res.status };
  } catch (error: any) {
    throw Error(error);
  }
};

export const findProfileByUserId = async (userId: Number) => {
  try {
    const res = await fetch(`/api/user/profile?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res) throw new Error('No user Found with Email Please Sign Up...!');
    return await res.json();
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateProfile = async (profile: string): Promise<any> => {
  try {
    const res = await fetch(`/api/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: profile }),
    });
    if (!res) throw new Error('No user Found with Email Please Sign Up...!');
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const deleteProfile = async (userId: Number): Promise<any> => {
  try {
    const res = await fetch(`/api/user/profile?userId=${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res) throw new Error('No user Found with Email Please Sign Up...!');
    return await res.json();
  } catch (error) {
    return error;
  }
};
