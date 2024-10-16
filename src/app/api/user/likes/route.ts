import { PostLikeVM } from '@/src/modules/PostLikeVM';
import prismadb from '@/src/util/prismadb';
import { YouTube } from '@mui/icons-material';
import { Like } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();
    console.log(data);
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const res: Like = await prismadb.like.create({
      data: new PostLikeVM(data),
    });
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
    const postId: any = searchParams.get('postId');
    const userId: any = searchParams.get('userId');

    const res = await prismadb.like.deleteMany({
      where: {
        AND: [{ postId: Number(postId) }, { createdById: Number(userId) }],
      },
    });
    // console.log(category);
    return NextResponse.json({ res: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
