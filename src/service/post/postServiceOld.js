export const addPost = async (post, session) => {
  const res = await fetch(process.env.BASE_URL + `post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ data: post }),
  });
  return await res.json();
};

export const updatePost = async (id, data, session) => {
  const res = await fetch(process.env.BASE_URL + `post/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ data: data }),
  });
  return await res.json();
};

export const updatePostStatus = async (id, stt, session) => {
  const res = await fetch(
    process.env.BASE_URL +
      `post/status?` +
      new URLSearchParams({
        id: id,
      }),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({ data: stt }),
    }
  );
  return await res.json();
};

export const getAllPost = async (pageState, session, signal) => {
  delete pageState.data;
  const res = await fetch(process.env.BASE_URL + `admin/post-manage`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },

    signal: signal,
    body: JSON.stringify(pageState),
  });
  return await res.json();
};

export const getAllActivePosts = async (pageNumber, perPage, session) => {
  const res = await fetch(
    process.env.BASE_URL +
      `post?` +
      new URLSearchParams([
        ['isPublish', true],
        ['pageNumber', pageNumber],
        ['perPage', perPage],
      ]),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${session?.accessToken}`,
      },
    },
    5000,
    (e) => {
      console.log(e);
    }
  );
  return await res.json();
};

export const getPostById = async (id, session) => {
  const res = await fetch(process.env.BASE_URL + `post/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
  });
  let a = await res.json();
  // console.log(a);
  return a;
};

export const getPostDrftById = async (id, session) => {
  const res = await fetch(process.env.BASE_URL + `post/draft/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
  });
  let a = await res.json();
  // console.log(a);
  return a;
};

export const getPostContentById = async (id, session) => {
  const res = await fetch(process.env.BASE_URL + `post/content/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
  });
  // console.log(a);
  return await res.json();
};

export const getPostCmmentsById = async (id, session) => {
  const res = await fetch(process.env.BASE_URL + `post/comment/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
  });
  // console.log(a);
  return await res.json();
};

export const deletePost = async (id, session) => {
  const res = await fetch(
    process.env.BASE_URL +
      `post/${id}?` +
      new URLSearchParams({
        id: id,
      }),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${session?.accessToken}`,
      },
    }
  );
  return await res.json();
};

export const getAllActiveRelatedPosts = async (
  id,
  currentPostCat,
  session,
  signal
) => {
  const res = await fetch(
    process.env.BASE_URL +
      `post/relatedPost?` +
      new URLSearchParams({
        isPublish: true,
        category: currentPostCat,
        id: id,
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${session?.accessToken}`,
      },
      signal: signal,
    }
  );
  return await res.json();
};

export const getAllLatestPosts = async (session) => {
  const res = await fetch(
    process.env.BASE_URL +
      `post/latestPost?` +
      new URLSearchParams({
        isPublish: true,
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

// #####################################################################

// export const getPostImgId = async (id, session) => {
//   const {fileRes} =
//   const res = await fetch(`/api/post/${id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `bearer ${session?.accessToken}`,
//     },
//   });
//   return await res.json();
// };
// #####################################################################
export const addPostLikeById = async (id, session) => {
  const res = await fetch(process.env.BASE_URL + `post/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ email: session?.user?.email, postId: id }),
  });
  return await res.json();
};

export const removePostLikeById = async (id, session) => {
  const res = await fetch(
    process.env.BASE_URL +
      `post/likes?` +
      new URLSearchParams({
        postId: id,
        email: session?.user?.email,
      }),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${session?.accessToken}`,
      },
    }
  );
  return await res.json();
};

export const getAllPostsfilterByTag = async (
  pageNumber,
  perPage,
  tag,
  session
) => {
  const res = await fetch(process.env.BASE_URL + `post/filter/by-tag`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      tag: tag,
      pageNumber: pageNumber,
      perPage: perPage,
    }),
  });
  return await res.json();
};

export const getAllActivePostsfilterByTagAndCat = async (
  pageNumber,
  perPage,
  tag,
  category,
  session
) => {
  const res = await fetch(process.env.BASE_URL + `post/filter/by-tag-cat`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      tag: tag,
      category: category,
      pageNumber: pageNumber,
      perPage: perPage,
    }),
  });
  return await res;
};

export const getAllActivePostsfilterByTagAndCatAndSearch = async (
  pageNumber,
  perPage,
  search,
  tag,
  category,
  session,
  signal
) => {
  const res = await fetch(
    process.env.BASE_URL + `post/filter/by-tag-cat-search`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${session?.accessToken}`,
      },
      signal: signal,
      body: JSON.stringify({
        search: search,
        tag: tag,
        category: category,
        pageNumber: pageNumber,
        perPage: perPage,
      }),
    },
    5000
  );
  return await res;
};

// #####################################################################
export const getAllPost_ = async (session, req) => {
  const host = req.headers.host;
  const res = await fetch(`http://${host}/api/post`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
  });
  return await res.json();
};

export const getAllActivePosts_ = async (
  session,
  req,
  pageNumber,
  perPage,
  signal
) => {
  const host = req.headers.host;
  const res = await fetch(
    `http://${host}/api/post?` +
      new URLSearchParams({
        isPublish: true,
        pageNumber: pageNumber,
        perPage: perPage,
      }),
    { signal: signal },
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

export const getAllLatestRelatedPosts = async (session) => {
  const res = await fetch(
    `/api/post/latestPost?` +
      new URLSearchParams({
        isPublish: true,
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

export const getAllActiveTagsfilterByTagOrCategory = async (
  session,
  tag,
  category
) => {
  const res = await fetch(`/api/post`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ tag: tag, category: category }),
  });
  return await res.json();
};

export const getPostById_ = async (id, session, req) => {
  const host = req.headers.host;
  const res = await fetch(`http://${host}/api/post/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
  });
  return await res.json();
};

export const getPostDrftById_ = async (id, req, signal) => {
  const host = req.headers.host;
  const res = await fetch(
    `http://${host}/api/post/draft/${id}`,
    { signal: signal },
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  let a = await res.json();
  // console.log(a);
  return a;
};

export const getAllLatestRelatedPosts_ = async (session, req) => {
  const host = req.headers.host;
  const res = await fetch(
    `http://${host}/api/post/latestPost?` +
      new URLSearchParams({
        isPublish: true,
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
