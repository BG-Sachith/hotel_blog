export const addSwiper = async (data: any, session: any) => {
  const res = await fetch(`/api/admin/swiper`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ data: data }),
  });
  return await res.json();
};

export const updateSwiper = async (data: any, session: any) => {
  const res = await fetch(`/api/admin/swiper`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ data: data }),
  });
  return await res.json();
};

export const updateListSwiper = async (data: any, session: any) => {
  const res = await fetch(`/api/admin/swiper`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ data: data, list: true }),
  });
  return await res.json();
};

export const updateSwiperSatatus = async (
  id: any,
  active: any,
  session: any
) => {
  const res = await fetch(`/api/admin/swiper`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ active: active, id: id, status: true }),
  });
  return await res.json();
};

export const getAllSwiper = async (session: any) => {
  // console.log(session);
  // console.log('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
  const res = await fetch(`/api/admin/swiper`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
  });
  return await res.json();
};

export const getAllActiveSwiper = async () => {
  const res = await fetch(
    `/api/admin/swiper?` +
      new URLSearchParams({
        active: 'true',
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `bearer ${session?.accessToken}`,
      },
    }
  );
  return await res.json();
};

export const deleteSwiper = async (id: any, session: any) => {
  const res = await fetch(
    `/api/admin/swiper?` +
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
