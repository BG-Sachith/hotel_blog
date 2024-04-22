/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { CssBaseline } from '@mui/material';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const TablePostContent = dynamic(
  () => import('../../../components/content/admin/TablePostContent')
);

export default function PostManage() {
  return (
    <>
      {/* <Meta
        title={'Post Manage | Vajrapani Life'}
        url={'admin/post-manage'}
        image={'/images/vg-hotel.jpg'}
      /> */}
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      <CssBaseline />
      <TablePostContent />
    </>
  );
}

// export async function getServerSideProps({ req, res }: any) {
//   const session = await getSession({ req });
//   // console.log(session?.user);
//   if (!(session && new User(session.user)?.role?.name == 'ADMIN')) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   // Pass data to the page via props
//   return { props: {} };
// }
