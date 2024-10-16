export const createLike = async (data: any) => {
  const res = await fetch(`/api/user/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: data }),
  });
  return await res.json();
};

export const findAllByPostId = async (postId: Number) => {
  const res = await fetch(`/api/user/likes?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const deleteLike = async (postId: number, userId: number) => {
  const res = await fetch(
    `/api/user/likes?` +
      new URLSearchParams({
        postId: postId + '',
        userId: userId + '',
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
