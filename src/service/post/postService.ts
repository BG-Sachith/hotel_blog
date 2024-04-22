import { PostVM } from '@/src/modules/PostVm';

export const createPost = async (post: PostVM) => {
  const res = await fetch(`/api/admin/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: post }),
  });
  return await res.json();
};

export const updatePost = async (post: any) => {
  const res = await fetch(`/api/admin/post`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: post }),
  });
  return await res.json();
};

export const updatePostStatus = async (id: number, stt: Boolean) => {
  const res = await fetch(`/api/admin/post`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, stt: stt }),
  });
  return await res.json();
};

export const findAllPostPage = async (
  page: Number,
  pageSize: Number,
  field: String,
  sort: String,
  quickFilterValues: String | null,
  isPublish: Boolean | null,
  categoryIds: Number[],
  tagIds: Number[],
  skipPostIds: Number[]
) => {
  const res = await fetch(`/api/public/post/page`, {
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
      isPublish,
      categoryIds,
      tagIds,
      skipPostIds,
    }),
  });
  return await res.json();
};

export const findPost = async (id: number) => {
  const res = await fetch(`/api/public/post?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const deletePost = async (id: Number) => {
  const res = await fetch(`/api/admin/post?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const findPostContent = async (id: number) => {
  const res = await fetch(`/api/public/post/content?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
