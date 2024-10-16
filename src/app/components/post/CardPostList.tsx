'use client';
import { Box, Card, Paper, Typography, styled } from '@mui/material';
import React, { lazy, useCallback, useEffect, useRef, useState } from 'react';

import dynamic from 'next/dist/shared/lib/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/provider/redux/store';
import { Post } from '@prisma/client';
import {
  setHasMore,
  setPageLoading,
  setPageLoadingMore,
  setPageNumber,
  setPosts,
} from '@/src/provider/redux/features/Paginate';
import { findAllPostPage } from '@/src/service/post/postService';

const CardPost = lazy(() => import('./CardPost'));
// const CardSkeleton = dynamic(() => import('../skeleton/CardSkeleton'));
const CardSkeleton = dynamic(() => import('../skeleton/CardSkeleton'), {
  ssr: true,
});

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const perPage = 8;
export default function CardPostList({}: any) {
  const dispatch = useDispatch();
  const { posts, isPageLoading, isPageLoadingMore, hasMore, pageNumber }: any =
    useSelector((state: RootState) => state.paginate);

  const [isLoading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  useEffect(() => {
    dispatch(setPageLoading(true));
    findAllPostPage(pageNumber, perPage, 'id', 'desc', null, true, [], [], [])
      .then((d: any) => {
        dispatch(setPageLoading(false));
        dispatch(setPageLoadingMore(false));
        // console.log(d);
        if (d && d?.data) {
          dispatch(setPosts([...d.data]));
          dispatch(setHasMore(d?.data?.length < d.count));
        }
        setLoading(() => false);
      })
      .catch((e: any) => {
        dispatch(setPageLoading(false));
        dispatch(setPageLoadingMore(false));
        setLoading(() => false);
      });
    // setSwiperLoading((p) => false);
  }, []);

  useEffect(() => {
    if ((isPageLoading || isPageLoadingMore) && pageNumber != 0) {
      findAllPostPage(
        pageNumber,
        perPage,
        'id',
        'desc',
        null,
        true,
        [],
        selectedTags ? selectedTags.map((t: any) => t.id) : [],
        []
      ).then((d: any) => {
        dispatch(setPageLoading(false));
        dispatch(setPageLoadingMore(false));
        if (d && d?.data) {
          let pst: any = [...posts, ...d.data];
          // pst = [...new Map(pst.map((x) => [x.id, x])).values()];
          dispatch(setPosts(pst));
          dispatch(setHasMore(pst.length < d.count));
          // getLatestPost(pst.length < d.count);
        }
      });
    }
  }, [pageNumber]);

  const showMoreCrds = () => {
    if (hasMore) {
      dispatch(setPageNumber(pageNumber + 1));
      dispatch(setPageLoadingMore(true));
      setShowMore(() => false);
    }
  };

  const observer = useRef<any>();
  const lastElmntRef = useCallback<any>(
    (node: any) => {
      if (isLoading || isPageLoading || isPageLoadingMore || pageNumber > 1)
        return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // console.log('Visible');
          dispatch(setPageNumber(pageNumber + 1));
          dispatch(setPageLoadingMore(true));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, isPageLoadingMore, isPageLoading]
  );

  return (
    <>
      {!isLoading ? (
        <>
          <Box
            sx={{
              display: 'grid',
              gap: 2.5,
              gridTemplateColumns: {
                xs: 'repeat(auto-fill, min(200px, .8fr))',
                sm: 'repeat(auto-fill, minmax(300px, .8fr))',
                md: 'repeat(auto-fill, minmax(300px, .8fr))',
              },
              mb: 10,
            }}
          >
            {!isPageLoading && posts?.length > 0
              ? posts?.map((p: Post, i: number) =>
                  posts.length == i + 1 ? (
                    <Item
                      ref={lastElmntRef}
                      key={i + 'x'}
                      sx={{
                        padding: 0,
                        boxShadow: 'none !important',
                        border: 'none !important',
                        backgroundColor: 'transparent !important',
                        // maxHeight: '520px',
                      }}
                      className="bg-transparent shadow-none rounded-none"
                    >
                      <CardPost
                        p={p}
                        showEditBtn={true}
                        isViewOnly={false}
                      ></CardPost>
                    </Item>
                  ) : (
                    <Item
                      key={i + 'x'}
                      sx={{
                        padding: 0,
                        boxShadow: 'none !important',
                        border: 'none !important',
                        backgroundColor: 'transparent !important',
                        // maxHeight: '520px',
                      }}
                      className="bg-transparent shadow-none rounded-none"
                    >
                      <CardPost
                        p={p}
                        showEditBtn={true}
                        isViewOnly={false}
                      ></CardPost>
                    </Item>
                  )
                )
              : !isPageLoadingMore &&
                !isPageLoading && (
                  <Card className="shadow-none">No Records</Card>
                )}

            {(isPageLoading || isPageLoadingMore) && (
              <CardSkeleton no={2} width={'86%'} />
            )}
          </Box>
          {!showMore && hasMore && (
            <Typography
              color={'black'}
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                showMoreCrds();
              }}
            >
              {' '}
              Show more{' '}
            </Typography>
          )}
        </>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: {
              xs: 'repeat(auto-fill, min(200px, .8fr))',
              sm: 'repeat(auto-fill, minmax(300px, .8fr))',
              md: 'repeat(auto-fill, minmax(300px, .8fr))',
            },
            mb: 10,
          }}
        >
          <CardSkeleton no={4} width={'86%'} />
        </Box>
      )}
    </>
  );
}
