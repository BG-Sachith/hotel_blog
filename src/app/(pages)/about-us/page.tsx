'use client';
import { Card, CardContent, CssBaseline } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';
// import { Meta } from '../../components/Meta';
const Layout = dynamic(() => import('../../components/layout/Layout'), {
  ssr: false,
});
const AboutUsContent = dynamic(
  () => import('@/components/page/AboutUsContent')
);

export default function AboutUs() {
  return (
    <>
      {/* <Meta
        title={'About Us | Vajrapani Life'}
        url={'about-us'}
        image={'/images/vg-hotel.jpg'}
        description={
          'Welcome to our Vajrapani Life blog, a gateway to unlocking the ultimate happiness in life. We believe that true joy lies in the harmonious integration of various aspects that enrich our existence. '
        }
      /> */}
      <Card
        sx={{
          width: '100%',
          position: 'relative',
          backgroundColor: (theme) =>
            theme.palette.mode == 'light' ? '#f1f1f1' : 'rgb(16, 24, 48)',
          minHeight: '100vh',
        }}
        style={
          {
            // boxShadow: 'rgba(0, 0, 0, 0.176) 0px 10px 40px 10px !important',
          }
        }
      >
        <CardContent className="custom-card">
          <AboutUsContent />
        </CardContent>
      </Card>
    </>
  );
}

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// }
