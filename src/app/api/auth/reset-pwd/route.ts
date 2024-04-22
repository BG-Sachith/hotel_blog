import { hash } from 'bcryptjs';
import prismadb from '@/util/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, res: NextResponse) => {
  const { email, pwd } = await req.json();
  try {
    const user = await prismadb.user.update({
      where: { email: email },
      data: { password: await hash(pwd, 12) },
    });
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
};
