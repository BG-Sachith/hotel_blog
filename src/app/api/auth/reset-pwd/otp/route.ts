import { sendEmail } from '@/src/service/emailService';
import prismadb from '@/src/util/prismadb';
import OTPTemplate from '@/template/email/otp';
import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: any, res: any) => {
  try {
    const { searchParams } = new URL(req.url);
    const email: any = searchParams.get('email');
    const otpVal: any = searchParams.get('otpVal');
    let otp = await prismadb.otp.findFirst({
      where: { email: email },
    });
    console.log(otpVal);
    if (otp) {
      return otp.otp == otpVal
        ? NextResponse.json({ message: 'OK' }, { status: 200 })
        : NextResponse.json(
            { message: 'Invalid Code, check inbox' },
            { status: 400 }
          );
    } else
      NextResponse.json(
        { message: 'Invalid Code, check inbox' },
        { status: 400 }
      );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { email: string } }
) => {
  try {
    const { searchParams } = new URL(req.url);
    const email: any = searchParams.get('email');
    // console.log('emailffffffffffffffffffffffffffffffff');
    // console.log(email);
    const userCount = await prismadb.user.count({
      where: { email: email },
    });
    if (userCount == 0) throw new Error('No user Found with Email!');
    let otp: any = await prismadb.otp.findFirst({
      where: { email: email },
    });
    let data: any = { email: email, otp: Math.floor(Math.random() * 10000) };
    if (otp) otp = { ...otp, ...data };
    else otp = data;

    data = otp.id
      ? await prismadb.otp.update({
          where: { id: otp.id },
          data: otp,
        })
      : await prismadb.otp.create({
          data: otp,
        });
    await sendOtpMail(otp.otp, email);
    return NextResponse.json({ message: 'OK' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

const sendOtpMail = async (message: string, to: string) => {
  try {
    if (!(to && message)) throw Error('Invalid Data');
    await sendEmail({
      to: to,
      subject: 'Rest Password',
      html: render(OTPTemplate(message)),
    });
    // return res.status(200).json({ message: 'Email sent successfully' });
  } catch (e) {
    console.log(e);
    // return res.status(401).json({ message: 'Email sending fail' });
  }
};
