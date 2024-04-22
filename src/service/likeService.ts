export const createLike = async (data: any) => {
  const res = await fetch(`/api/user/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: data }),
  });
  return await res.json();
};

export const findAllByPostId = async (postId: Number) => {
  const res = await fetch(`/api/user/like?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const deleteLike = async (id: any) => {
  const res = await fetch(
    `/api/user/like?` +
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
