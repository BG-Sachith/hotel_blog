import { TagVM } from '@/src/modules/TagVM';
import prismadb from '@/src/util/prismadb';
import { Tag } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const res: Tag = await prismadb.tag.create({ data: new TagVM(data) });
    // console.log(category);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { data } = await req.json();
    data.updatedAt = new Date();
    const res: Tag = await prismadb.tag.update({
      where: { id: data.id },
      data: new TagVM(data),
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

    const res = await prismadb.tag.delete({
      where: { id: Number(id) },
    });
    // console.log(res);
    return NextResponse.json({ data: 'Deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
