export const createCommnt = async (data: any) => {
  const res = await fetch(`/api/user/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: data }),
  });
  return await res.json();
};

export const updateCommnt = async (data: any) => {
  const res = await fetch(`/api/user/comment`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: data }),
  });
  return await res.json();
};

export const findCommntsByPostId = async (postId: Number) => {
  const res = await fetch(`/api/user/comment?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const deleteCommnt = async (id: any) => {
  const res = await fetch(
    `/api/user/comment?` +
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
