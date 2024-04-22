import { CssBaseline } from '@mui/material';
import * as React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const MessagePage = dynamic(
  () => import('../../../components/content/admin/MessagePage')
);

export default function ClintMsg({ initialRows }: any) {
  return (
    <>
      {/* <Meta
        title={'Messages | Vajrapani Life'}
        url={'admin/client-msg'}
        image={'/images/vg-hotel.jpg'}
      /> */}
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      <CssBaseline />
      <MessagePage initialRows={initialRows} />
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
//   // Fetch data from external API
//   const ress = await getClientMsgs(
//     { perPage: 25, pageNumber: 0 },
//     await getSession({ req }),
//     req
//   );
//   let initialRows = await ress;
//   initialRows = initialRows?.message ? { data: [], total: 0 } : initialRows;
//   // console.log(initialRows);
//   initialRows.data = await initialRows?.data?.map((item: any) => {
//     try {
//       if (item?.createdAt)
//         item.createdAt = moment(item?.createdAt).format('HH:MM A, DD/MM/YYYY');
//       item.disabled = false;
//       item.loadingBtnS = false;
//       item.reply = '';
//     } catch (e) {
//       console.log(e);
//     }

//     return item;
//   });
//   // console.log(initialRows);
//   // Pass data to the page via props
//   return { props: { initialRows } };
// }
