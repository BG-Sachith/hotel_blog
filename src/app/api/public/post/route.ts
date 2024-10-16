import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/src/util/prismadb';
import { populateS3SignedUrl } from '../../aws/awsService';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id: any = searchParams.get('id');
    const res: any = await prismadb.post.findFirst({
      where: { id: Number(id) },
      include: {
        postContent: true,
        // comments: {
        //   include: { createdBy: { select: { id: true, name: true } } },
        // },
        createdBy: { select: { id: true, name: true } },
        modifiedBy: { select: { id: true, name: true } },
        likes: { select: { id: true, createdById: true } },
        category: { select: { id: true, name: true } },
        tags: {
          select: { tag: { select: { id: true, name: true } } },
        },
      },
    });
    res.publicUrl = res.image
      ? await populateS3SignedUrl(res.image)
      : res.publicUrl;
    return NextResponse.json(
      { data: { ...res, tags: res.tags.map((t: any) => t.tag) } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
