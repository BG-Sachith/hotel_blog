import prismadb from '@/src/util/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest) => {
  try {
    const { page, pageSize, field, sort, quickFilterValues, active } =
      await req.json();
    let sort_: any = {};
    if (sort && field) sort_[field + ''] = sort;
    else sort_ = { modifiedAt: sort };
    let searchQry: any =
      quickFilterValues && quickFilterValues != ''
        ? {
            OR: [
              { name: { contains: quickFilterValues } },
              { createdBy: { name: { contains: quickFilterValues } } },
              { modifiedBy: { name: { contains: quickFilterValues } } },
            ],
          }
        : {};
    if (active != undefined) searchQry['active'] = active;
    const [tag, count] = await prismadb.$transaction([
      prismadb.tag.findMany({
        where: searchQry,
        skip: Number(pageSize) * Number(page),
        take: Number(pageSize),
        include: {
          createdBy: true,
          modifiedBy: true,
        },
        orderBy: sort_,
      }),
      prismadb.tag.count({
        where: searchQry,
      }),
    ]);
    return NextResponse.json(
      { page: { data: tag, count: count } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
