'use client';
import dynamic from 'next/dynamic';

const ProfileContent = dynamic(
  () => import('../../components/content/ProfileContent'),
  {
    ssr: false,
  }
);

export default function ProfileSetting() {
  return (
    <>
      {/* <Meta
        title={'Profile Manage | Vajrapani Life'}
        url={'profile'}
        image={'/images/vg-hotel.jpg'}
      />
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      <Layout> */}
      <ProfileContent />
      {/* </Layout> */}
    </>
  );
}
