import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/src/util/prismadb';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id: any = searchParams.get('id');
    const res: any = await prismadb.postContent.findFirst({
      where: { id: id },
    });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
