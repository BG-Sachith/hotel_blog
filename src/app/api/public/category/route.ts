import prismadb from '@/src/util/prismadb';
import { Category } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const active: any = searchParams.get('active');
    // console.log(active);
    const category: Category[] =
      active != 'undefined' && active != 'null'
        ? await prismadb.category.findMany({
            where: { active: Boolean(active) },
          })
        : await prismadb.category.findMany();
    // console.log(category);
    return NextResponse.json({ data: category }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
