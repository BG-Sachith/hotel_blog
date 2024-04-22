import nodemailer from 'nodemailer';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

type EmailPayload2 = {
  to: string;
  subject: string;
  html: string;
  replyTo: string;
};

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: parseInt(process.env.SMTP_PORT || '2525'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    ...data,
  });
};

export const sendByClientEmail = async (data: EmailPayload2, from: string) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });
  // console.log(data);
  return await transporter.sendMail({
    from: from,
    ...data,
  });
};

export const EmailFromClient = async (data: any) => {
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

export const EmailToClient = async (data: any) => {
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
