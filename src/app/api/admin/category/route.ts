import { CategoryVM } from '@/src/modules/CategoryVM';
import prismadb from '@/src/util/prismadb';
import { Category } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    // console.log(new CategoryVM(data));
    const category: Category = await prismadb.category.create({
      data: new CategoryVM(data),
    });
    // console.log(category);
    return NextResponse.json({ data: category }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { data } = await req.json();
    data.updatedAt = new Date();
    // console.log(data);
    const category: Category = await prismadb.category.update({
      where: { id: data.id },
      data: new CategoryVM(data),
    });
    // console.log(category);
    return NextResponse.json({ data: category }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id: any = searchParams.get('id');
    // console.log(id);
    const res = await prismadb.category.delete({
      where: { id: Number(id) },
    });
    // console.log(res);
    return NextResponse.json({ data: 'Deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
