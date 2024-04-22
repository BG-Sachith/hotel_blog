import { Metadata } from 'next';
import Head from 'next/head';
import React from 'react';
import Main from './components/main/main';

export const metadata: Metadata = {
  title: 'Vajrapani Life | Home',
  description:
    'Welcome to our Vajrapani Life blog, a gateway to unlocking the ultimate' +
    'happiness in life. We believe that true joy lies in ...',
};
const baseUrl = 'https://www.vajrapanilife.com/';

export default function Home() {
  return (
    <>
      <h1 className="hidden">Vajrapani Life | Home</h1>
      <p className="hidden">
        Welcome to our Vajrapani Life blog, a gateway to unlocking the ultimate
        happiness in life. We believe that true joy lies in ...
      </p>
      <Main />
    </>
  );
}

let tmp = () => {
  <Head>
    <title>Vajrapani Life | Home</title>
    <meta charSet="utf-8" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* <!-- HTML Meta Tags --> */}

    <meta
      name="description"
      content="Welcome to our Vajrapani Life blog, a gateway to unlocking the ultimate happiness in life. We believe that true joy lies in  ..."
    />

    {/* <!-- Facebook Meta Tags --> */}
    <meta property="og:url" content={baseUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Vajrapani Life" />
    <meta
      property="og:description"
      content="Welcome to our Vajrapani Life blog, a gateway to unlocking the ultimate happiness in life. We believe that true joy lies in the harmonious integration ..."
      key="description"
    />
    <meta property="og:image" content="/images/3.jpg" />
    <meta property="og:site_name" content="Vajrapani Life | Lifestyle Blog" />

    {/* <!-- Twitter Meta Tags --> */}
    <meta name="twitter:card" content="summary_large_image" key="twcard" />
    <meta property="twitter:domain" content={baseUrl} />
    <meta property="twitter:url" content={baseUrl} />
    <meta name="twitter:title" content="Vajrapani Life" />
    <meta
      name="twitter:description"
      content="Welcome to our Vajrapani Life blog, a gateway to unlocking the ultimate happiness in life. We believe that true joy lies in the harmonious integration ..."
    />
    <meta name="twitter:image" content="/images/3.jpg" key="twimg" />

    {baseUrl == 'https://www.vajrapanilife.com/' && (
      <meta
        name="google-site-verification"
        content="K3FDQgFt5kGfZ7cfS3FCPpu_bMntMMZOGUMBSySOTFU"
      />
    )}
    <meta name="title" key="title" content="Vajrapani Life" />
    <meta
      name="robots"
      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    />
    <meta
      name="keywords"
      content={
        'Vajrapani Life, Hotels in sri lanka, hotels in kandy, luxury resorts in sri lanka, bookin hotel in sri lanka, Lifestyle, Blog, Post'
      }
    />

    <meta itemProp="name" content="Vajrapani Life" />
    <meta
      itemProp="description"
      content="Welcome to our Vajrapani Life blog, a gateway to unlocking the ultimate happiness in life. We believe that true joy lies in the harmonious integration ..."
    />
    <meta itemProp="icon" content={'/favicon.ico'} />
    <meta itemProp="image" content={'/images/3.jpg'} />

    <link rel="icon" href="https://www.vajrapanilife.com/favicon.ico" />
    <link
      rel="shortcut icon"
      href="https://www.vajrapanilife.com/favicon.ico"
      type="image/x-icon"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="canonical" href={baseUrl}></link>
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/images/icon/icon-512x512.png"></link>
    <meta name="theme-color" content="#000" />
  </Head>;
};
