import prismadb from '@/src/util/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { PostContent } from '@prisma/client';

export const POST = async (req: NextRequest) => {
  try {
    const { postContent } = await req.json();
    const res: PostContent = await prismadb.postContent.create({
      data: postContent,
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { post } = await req.json();
    const res: PostContent = await prismadb.postContent.update({
      where: { id: post.id },
      data: post,
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
