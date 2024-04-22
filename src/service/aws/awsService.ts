export const uploadImg = async (
  name: any,
  path_: any,
  file: any,
  session: any,
  signal: any
) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('name_', name);
  formData.append('path_', path_);
  const res = await fetch(
    `/api/aws?` +
      new URLSearchParams({
        name_: name,
        path_: path_,
      }),
    {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${session?.accessToken}`,
      },
      signal: signal,
      body: formData,
    }
  );
  return await res.json();
};

export const uploadImgForKey = async (name: any, path_: any, file: any) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('name_', name);
  formData.append('path_', path_);
  const res = await fetch(
    `/api/aws/img-upload?` +
      new URLSearchParams({
        name_: name,
        path_: path_,
      }),
    {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        // Authorization: `bearer ${session?.accessToken}`,
      },
      body: formData,
    }
  );
  return await res.json();
};

export const getImgByName = async (name: any, session: any) => {
  const res = await fetch(
    `/api/aws/name?` +
      new URLSearchParams({
        name_: name,
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${session?.accessToken}`,
      },
    }
  );
  return await res.json();
};
