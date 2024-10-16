import prismadb from '@/src/util/prismadb';
import { Profile } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    let name = data.name;
    delete data.name;
    if (data.image) {
      let base64Data = data.image.split(',')[1];

      // Convert the base64 string to a buffer
      data.image = Buffer.from(base64Data, 'base64');
    }
    const res: Profile = await prismadb.profile.create({
      data: data,
    });
    if (name) {
      let rr = await prismadb.user.update({
        where: { id: data.userId },
        data: { name: name },
      });
      name = rr.name;
      // console.log(rr);
    }
    // console.log(category);
    return NextResponse.json(
      { profile: { ...res, name: name } },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { data } = await req.json();
    data.updatedAt = new Date();
    let name = data.name;
    delete data.name;
    if (data.image) {
      let base64Data = data.image.split(',')[1];

      // Convert the base64 string to a buffer
      data.image = Buffer.from(base64Data, 'base64');
    }
    const res: Profile = await prismadb.profile.update({
      where: { id: data.id },
      data: data,
    });
    if (name) {
      let rr = await prismadb.user.update({
        where: { id: data.userId },
        data: { name: name },
      });
      name = rr.name;
      // console.log(rr);
    }
    // console.log(category);
    return NextResponse.json(
      { profile: { ...res, name: name } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId: any = searchParams.get('userId');

    const res: Profile = await prismadb.profile.findFirstOrThrow({
      where: { userId: Number(userId) },
      include: { user: { select: { name: true } } },
    });
    // console.log(category);
    return NextResponse.json({ profile: res }, { status: 200 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error }, { status: 400 });
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
