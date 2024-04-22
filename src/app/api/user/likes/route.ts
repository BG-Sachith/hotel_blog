import prismadb from '@/src/util/prismadb';
import { Like } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();

    const res: Like = await prismadb.like.create({ data: data });
    // console.log(category);
    return NextResponse.json({ like: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const postId: any = searchParams.get('postId');

    const res: Like[] = await prismadb.like.findMany({
      where: { postId: postId },
    });
    // console.log(category);
    return NextResponse.json({ like: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id: any = searchParams.get('id');

    const res = await prismadb.like.delete({ where: { id: id } });
    // console.log(category);
    return NextResponse.json({ res: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
