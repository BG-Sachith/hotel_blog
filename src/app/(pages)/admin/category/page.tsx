import * as React from 'react';

import { CssBaseline } from '@mui/material';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const Layout = dynamic(() => import('../../../components/layout/Layout'));
const TableCategory = dynamic(
  () => import('../../../components/content/admin/TableCategory')
);

export default function Category() {
  return (
    <>
      {/* <Meta
        title={'Category Manage | Vajrapani Life'}
        url={'admin/category'}
        image={'/images/vg-hotel.jpg'}
      /> */}
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      <CssBaseline />
      <TableCategory />
    </>
  );
}

// async function getServerSideProps({ req, res }: any) {
//   // const hostname = req.headers.host;
//   // const a = () => {
//   //   const { data: session } = useSession();
//   //   return session;
//   // };
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
//   // Fetch data from external API
//   const ress = await findAllCategoryV2(await getSession({ req }), req);
//   const initialRows = await ress;
//   // console.log(initialRows);

//   // Pass data to the page via props
//   return { props: { initialRows } };
// }
