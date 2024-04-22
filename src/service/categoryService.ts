export const createCategory = async (data: any) => {
  const res = await fetch(`/api/admin/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: data }),
  });
  return await res.json();
};

export const updateCategory = async (data: any) => {
  const res = await fetch(`/api/admin/category`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: data }),
  });
  return await res.json();
};

export const findAllCategories = async (active: Boolean | null) => {
  const res = await fetch(`/api/public/category?active=${active}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const findCategoryPage = async (
  page: Number,
  pageSize: Number,
  field: String,
  sort: String,
  quickFilterValues: String,
  active: Boolean
) => {
  const res = await fetch(`/api/public/category/page`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page,
      pageSize,
      field,
      sort,
      quickFilterValues,
      active,
    }),
  });
  return await res.json();
};

export const deleteCategory = async (id: any) => {
  const res = await fetch(
    `/api/admin/category?` +
      new URLSearchParams({
        id: id,
      }),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await res.json();
};

//################### API V2
export const findAllCategoryV2 = async (session: any, req: any) => {
  const host = req.headers.host;
  // console.log(session);
  // console.log('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
  const res = await fetch(`http://${host}/api/admin/category`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
  });
  return await res.json();
};
