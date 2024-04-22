import { CssBaseline } from '@mui/material';
import React from 'react';

// import { contDesc, Meta } from '../../components/Meta';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('../../components/layout/Layout'), {
  ssr: false,
});
const ContactContent = dynamic(
  () => import('@/components/page/ContactContent'),
  {
    ssr: false,
  }
);
export default function Contact() {
  return (
    <>
      {/* <Meta
        title={'Contact Us | Vajrapani Life'}
        url={'contact'}
        image={'/images/vg-hotel.jpg'}
        description={contDesc}
      /> */}
      <CssBaseline />
      <ContactContent />
    </>
  );
}
