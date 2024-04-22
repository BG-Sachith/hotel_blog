export const sendClientMsg = async (data: any) => {
  // console.log(data);
  const res = await fetch(`/api/contact/client-msg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getClientMsgs = async (data: any, session: any, req: any) => {
  const host = req.headers.host;
  const res = await fetch(
    `http://${host}/api/contact/client-msg?` + new URLSearchParams(data),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${session?.accessToken}`,
      },
    }
    //   5000
  );
  return res.json();
};

export const updateClientMsgs = async (
  data: any,
  session: { accessToken: any }
) => {
  // console.log(data);
  const res = await fetch(`/api/contact/client-msg`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteClientMsgs = async (
  id: any,
  session: { accessToken: any }
) => {
  // console.log(data);
  const res = await fetch(
    `/api/contact/client-msg?` +
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
