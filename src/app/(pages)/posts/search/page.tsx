/* eslint-disable react-hooks/exhaustive-deps */
import { CssBaseline } from '@mui/material';
import React from 'react';
import dynamic from 'next/dynamic';

const SearchContent = dynamic(
  () => import('../../../components/content/SearchContent'),
  {
    ssr: false,
  }
);

export default function Search() {
  return (
    <>
      {/* <Meta title={'Search ... | Vajrapani Life'} image={'/images/3.jpg'} /> */}
      {/* <Layout> */}
      <CssBaseline />
      <SearchContent />
      {/* </Layout> */}
    </>
  );
}
