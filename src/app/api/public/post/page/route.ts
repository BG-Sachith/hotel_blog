import prismadb from '@/src/util/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest) => {
  try {
    const {
      page,
      pageSize,
      field,
      sort,
      quickFilterValues,
      isPublish,
      categoryIds,
      tagIds,
      skipPostIds,
    } = await req.json();
    let sort_: any = {};
    if (sort && field) sort_[field + ''] = sort;
    else sort_ = { modifiedAt: sort };
    let searchQry: any =
      quickFilterValues && quickFilterValues != ''
        ? {
            OR: [
              { title: { contains: quickFilterValues } },
              { createdBy: { name: { contains: quickFilterValues } } },
              { modifiedBy: { name: { contains: quickFilterValues } } },
            ],
          }
        : {};
    if (isPublish != undefined && isPublish != null)
      searchQry['published'] = isPublish;
    if (categoryIds && categoryIds.length > 0)
      searchQry['category'] = { id: { in: categoryIds } };
    if (tagIds && tagIds.length > 0)
      searchQry['tags'] = { some: { id: { in: tagIds } } };
    if (skipPostIds && skipPostIds.length > 0)
      searchQry['id'] = { notIn: skipPostIds };
    const [post, count] = await prismadb.$transaction([
      prismadb.post.findMany({
        where: searchQry,
        skip: Number(pageSize) * Number(page),
        take: Number(pageSize),
        include: {
          createdBy: { select: { id: true, name: true } },
          modifiedBy: { select: { id: true, name: true } },
          likes: { select: { id: true } },
          category: { select: { id: true, name: true } },
          tags: {
            select: { tag: { select: { id: true, name: true } } },
            // include: { tag: { select: { id: true, name: true } } },
          },
        },
        orderBy: sort_,
      }),
      prismadb.post.count({
        where: searchQry,
      }),
    ]);
    return NextResponse.json(
      {
        data:
          count > 0
            ? post.map((p: any) => {
                {
                  return { ...p, tags: p.tags.map((t: any) => t.tag) };
                }
              })
            : [],
        count: count,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
