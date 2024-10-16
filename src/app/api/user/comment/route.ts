import prismadb from '@/src/util/prismadb';
import { Comment } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();

    const res: Comment = await prismadb.comment.create({
      data: data,
      include: {
        createdBy: { select: { id: true, name: true } },
        modifiedBy: { select: { id: true, name: true } },
      },
    });
    // console.log(category);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { data } = await req.json();

    const res: Comment = await prismadb.comment.update({
      where: { id: Number(data.id) },
      data: data,
      include: {
        createdBy: { select: { id: true, name: true } },
        modifiedBy: { select: { id: true, name: true } },
      },
    });
    // console.log(category);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const postId: any = searchParams.get('postId');
    const res: Comment[] = await prismadb.comment.findMany({
      where: { AND: { postId: Number(postId), hide: false } },
      include: {
        createdBy: { select: { id: true, name: true } },
        modifiedBy: { select: { id: true, name: true } },
      },
    });
    // console.log(category);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id: any = searchParams.get('id');

    const res = await prismadb.comment.update({
      where: { id: Number(id) },
      data: { hide: true },
    });
    // console.log(category);
    return NextResponse.json({ res: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
