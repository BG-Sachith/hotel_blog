/* eslint-disable react-hooks/exhaustive-deps */
import { CssBaseline } from '@mui/material';
import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const TableTag = dynamic(
  () => import('../../../components/content/admin/TableTag')
);

export default function Tag({ initialRows }: any) {
  return (
    <>
      {/* <Meta
        title={'Tag Manage | Vajrapani Life'}
        url={'admin/tag'}
        image={'/images/vg-hotel.jpg'}
      /> */}
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      {/* <Layout> */}
      <CssBaseline />
      <TableTag initialRows={[]} />
      {/* </Layout> */}
    </>
  );
}
