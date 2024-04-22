export const EmailFromClient = async (data) => {
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

export const EmailToClient = async (data) => {
  // console.log(data);
  const res = await fetch(`/api/email/client-reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};
