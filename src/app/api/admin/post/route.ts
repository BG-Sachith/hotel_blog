import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/src/util/prismadb';
import { Post, Tag } from '@prisma/client';
import { PostContentVM, PostDTO } from '@/src/modules/PostVm';

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();

    // console.log(data);
    const res: Post | any = await prismadb.post.create({
      data: new PostDTO(data),
    });
    res.postContent = await prismadb.postContent.create({
      data: new PostContentVM({
        content: data.postContent?.content ?? '',
        language: data.language,
        postId: res.id,
      }),
    });
    await prismadb.postTag.createMany({
      data: data.tags.map((t: Tag) => {
        return { postId: res.id, tagId: t };
      }),
      skipDuplicates: true,
    });
    const postTag = await prismadb.postTag.findMany({
      where: { postId: res.id },
      select: { tag: { select: { id: true, name: true } } },
    });
    res.tags = postTag.map((p: any) => p.tag);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { data } = await req.json();

    const res: Post | any = await prismadb.post.update({
      where: { id: data.id },
      data: new PostDTO(data),
    });
    res.postContent = await prismadb.postContent.update({
      where: { postId: data.id },
      data: new PostContentVM({
        content: data.postContent?.content ?? '',
        language: data.language,
        postId: res.id,
      }),
    });
    await prismadb.postTag.deleteMany({
      where: { postId: res.id },
    });
    await prismadb.postTag.createMany({
      data: data.tags.map((t: Tag) => {
        return { postId: res.id, tagId: t };
      }),
      skipDuplicates: true,
    });
    const postTag = await prismadb.postTag.findMany({
      where: { postId: res.id },
      select: { tag: { select: { id: true, name: true } } },
    });
    res.tags = postTag.map((p: any) => p.tag);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { id, stt } = await req.json();
    console.log(stt);
    console.log(id);
    const res: Post = await prismadb.post.update({
      where: { id: id },
      data: { active: true, published: stt },
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id: any = searchParams.get('id');
    const res = await prismadb.post.delete({ where: { id: Number(id) } });
    return NextResponse.json({ data: 'Deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
