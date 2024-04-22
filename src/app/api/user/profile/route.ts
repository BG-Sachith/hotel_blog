import prismadb from '@/src/util/prismadb';
import { Profile } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();

    const res: Profile = await prismadb.profile.create({ data: data });
    // console.log(category);
    return NextResponse.json({ profile: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId: any = searchParams.get('userId');

    const res: Profile = await prismadb.profile.findFirstOrThrow({
      where: { userId: userId },
    });
    // console.log(category);
    return NextResponse.json({ profile: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId: any = searchParams.get('userId');

    const res = await prismadb.user.update({
      where: { id: userId },
      data: { isDeleted: true },
    });
    // console.log(category);
    return NextResponse.json({ res: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
