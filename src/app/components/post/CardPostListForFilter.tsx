import { Box, Card, Paper, styled } from '@mui/material';
import React, { useContext } from 'react';
import CardPost from './CardPost';

import CardSkeleton from '../skeleton/CardSkeleton';
import { PostContext } from '../content/CategoryContend';
import { Post } from '@prisma/client';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CardPostListForFilter({ lastElmntRef }: any) {
  const { posts, setPosts, isPageLoading, isPageLoadingMore } =
    useContext(PostContext);

  return (
    <Box sx={{ gridArea: 'main' }} key={'mn'} className="min-h-screen">
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
        {!isPageLoading
          ? posts?.length > 0 &&
            posts?.map((p: Post, i) =>
              posts.length == i + 1 ? (
                <Item
                  ref={lastElmntRef}
                  key={p.id + 'x'}
                  sx={{
                    padding: 0,
                  }}
                >
                  <CardPost
                    p={p}
                    showEditBtn={false}
                    isViewOnly={false}
                    setPosts={setPosts}
                  ></CardPost>
                </Item>
              ) : (
                <Item
                  key={p.id + 'x'}
                  sx={{
                    padding: 0,
                  }}
                >
                  <CardPost
                    p={p}
                    showEditBtn={false}
                    isViewOnly={false}
                    setPosts={setPosts}
                  ></CardPost>
                </Item>
              )
            )
          : !isPageLoading &&
            !isPageLoadingMore &&
            posts?.length == 0 && (
              <Card className="shadow-none">No Records</Card>
            )}
        {(isPageLoading || isPageLoadingMore) && (
          <CardSkeleton no={3} width={'100%'} />
        )}
      </Box>
    </Box>
  );
}
