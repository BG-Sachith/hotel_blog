'use client';
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable react-hooks/exhaustive-deps */
import { Container, CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CardSkeleton from '@/components/skeleton/CardSkeleton';
import { findPost } from '@/src/service/post/postService';
import { setSelectedPost } from '@/src/provider/redux/features/SelectedItem';
import { useDispatch } from 'react-redux';
const PostViewContent = dynamic(
  () => import('@/components/content/PostViewContent'),
  {
    ssr: false,
  }
);

const baseUrl = 'https://www.vajrapanilife.com/';
// const baseUrl: any =
//   'https://vajrapani-hotel-blog-git-beta-bg-sachith.vercel.app/';

export default function PostView({ params }: any) {
  const [loading, setLoading] = useState<any>(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (params?.id) {
      setLoading(() => true);
      findPost(params.id).then((_p) => {
        // console.log(_p);
        dispatch(setSelectedPost({ ..._p.data }));
      });
      let t = setTimeout(() => {
        setLoading(false);
        clearTimeout(t);
      }, 500);
    }
  }, [params?.id]);

  return (
    <>
      {/* <Meta
        title={metaTitle}
        url={'posts?id=' + selectedPost.current?.id}
        description={
          selectedPost.current?.summary
            ? selectedPost.current?.summary
            : dp.description
        }
        image={`${baseUrl}api/og?url=${selectedPost.current.publicUrl}`}
      /> */}
      <link
        rel="stylesheet"
        href="/assets/content-styles.css"
        type="text/css"
      ></link>
      {/* <Typography component={'h1'} className="hidden">
        {metaTitle}
      </Typography> */}
      <CssBaseline />
      {params.id && !loading ? (
        <PostViewContent />
      ) : (
        <Container
          sx={{
            marginTop: 15,
            height: '100vh',
          }}
          className={'main pl-0 pr-0 max-w-screen-xl '}
        >
          <CardSkeleton no={1} width={'86%'} />
        </Container>
      )}
    </>
  );
}

// export async function getServerSideProps({ req, res, query }: any) {
//   const id = query.id;
//   try {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 2000);
//     let post: any = await getPostDrftById_(id, req, controller.signal);
//     post = post && post.id ? post : {};
//     return { props: { post } }; //?.data
//   } catch (err) {
//     const post: any = {};
//     return { props: { post } }; //?.data
//   }
// }
