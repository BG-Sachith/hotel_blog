import prismadb from '@/src/util/prismadb';
import { Tag } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const active: any = searchParams.get('active');

    const tag: Tag[] =
      active != 'undefined' && active != 'null'
        ? await prismadb.tag.findMany({
            where: { active: Boolean(active) },
          })
        : await prismadb.tag.findMany();
    // console.log(category);
    return NextResponse.json({ data: tag }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
