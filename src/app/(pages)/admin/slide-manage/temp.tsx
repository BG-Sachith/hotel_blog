import { CssBaseline } from '@mui/material';
import React from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';
const Layout = dynamic(() => import('../../../components/layout/Layout'));
const SlidePage = dynamic(
  () => import('../../../components/content/admin/SlidePage')
);

export default function SlideManage() {
  return (
    <>
      {/* <Meta
        title={'Slides Manage | Vajrapani Life'}
        url={'admin/slide-manage'}
        image={'/images/vg-hotel.jpg'}
      /> */}
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      <Layout>
        <CssBaseline />
        <SlidePage />
      </Layout>
    </>
  );
}
