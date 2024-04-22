import { hash } from 'bcryptjs';
import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import prismadb from '@/src/util/prismadb';

export const POST = async (req: any, res: any) => {
  // console.log(
  //   'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu'
  // );
  const req_ = await req.json();
  const { name, email, password, isNotificationOn } = req_;
  if (!email || !password)
    return NextResponse.json({ message: 'Invalid data...!' }, { status: 422 });
  try {
    const checkexisting = await prismadb.user.count({
      where: { email: email },
    });
    if (checkexisting > 0)
      return NextResponse.json(
        { message: 'User Already Exists...!' },
        { status: 422 }
      );

    const newUser = await prismadb.user.create({
      data: {
        role: Role.USER,
        ...{ name: name, email: email, isNotificationOn: isNotificationOn },
        ...{ password: await hash(password, 12) },
      },
    });
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
};
