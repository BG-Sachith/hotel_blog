import { signIn } from 'next-auth/react';

export const createUser = async (user: any) => {
  try {
    const res = await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user }),
    });
    return { data: await res.json(), status: res.status };
  } catch (error: any) {
    throw Error(error);
  }
};

export const findByUserName = async (userName: string) => {
  try {
    const res = await fetch(`/api/auth/find`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName }),
    });
    if (!res) throw new Error('No user Found with Email Please Sign Up...!');
    return await res.json();
  } catch (error: any) {
    throw Error(error);
  }
};

export const signInReq = async (values: any) => {
  const status = await signIn('credentials', {
    redirect: false,
    email: values.email,
    password: values.password,
    rememberPassword: values.rememberPassword,
    // callbackUrl: '/',
  });
  return status;
};

export const sendOTP = async (email: string): Promise<String> => {
  try {
    const res = await fetch(
      `/api/auth/reset-pwd/otp?` +
        new URLSearchParams({
          email: email,
        }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    return error;
  }
};

export const validateOTP = async (
  email: string,
  otpVal: number
): Promise<String> => {
  const res = await fetch(
    `/api/auth/reset-pwd/otp?` +
      new URLSearchParams({
        email: email,
        otpVal: otpVal + '',
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await res.json();
};

export const updatePwd = async (email: string, pwd: string): Promise<any> => {
  try {
    const res = await fetch(`/api/auth/reset-pwd`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, pwd }),
    });
    if (!res) throw new Error('No user Found with Email Please Sign Up...!');
    return await res.json();
  } catch (error) {
    return error;
  }
};
