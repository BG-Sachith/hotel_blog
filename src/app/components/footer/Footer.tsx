import { Box, Card, CardContent, Link, SvgIcon } from '@mui/material';
import React, { useEffect } from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useRouter } from 'next/navigation';

// const app_url = 'https://vajrapani-hotel-blog.vercel.app/';

export default function Footer() {
  const router = useRouter();
  const [app_url, setApp_url] = React.useState(
    'https://vajrapani-hotel-blog.vercel.app/'
  );
  useEffect(() => {
    setApp_url((p) => window.location.host);
    // console.log(app_url);
  }, []);

  return (
    <footer className="bg-neutral-100 text-center   dark:bg-neutral-600 dark:text-neutral-200 lg:text-left relative z-10">
      <Card
        className="flex items-center justify-center border-b rounded-none border-neutral-200 pl-2 pr-2 dark:border-neutral-500 lg:justify-between
       border-t"
        sx={{ borderRadius: 0, boxShadow: 'none' }}
      >
        <div className="mr-12 hidden lg:block ">
          <span>Get connected with us on social networks:</span>
        </div>
        <CardContent className="flex justify-center">
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${app_url}`}
            target="_blank"
            className="dark:text-neutral-200"
            sx={{ mr: 1.2 }}
            rel="fb"
            aria-label="facebook"
          >
            <SvgIcon
              component={FacebookOutlinedIcon}
              inheritViewBox
              className="h-6 w-6"
            />
          </Link>
          <Link
            href={`https://twitter.com/intent/tweet?url=${app_url}/&text=${encodeURI(
              'Vajrapani Life'
            )}`}
            target="_blank"
            className=" dark:text-neutral-200"
            sx={{ mr: 1.2 }}
            rel="tw"
            aria-label="twitter"
          >
            <SvgIcon
              component={TwitterIcon}
              inheritViewBox
              className="h-6 w-6"
            />
          </Link>
          <Link
            key={'in'}
            href="#!"
            className="dark:text-neutral-200"
            sx={{ mr: 1.2 }}
            rel="fb2"
            aria-label="..."
          >
            <SvgIcon
              component={InstagramIcon}
              inheritViewBox
              className="h-6 w-6"
            />
          </Link>
          <Link
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${app_url}`}
            className="dark:text-neutral-200"
            sx={{ mr: 1.2 }}
            rel="lnk"
            aria-label="linkedin"
          >
            <SvgIcon
              component={LinkedInIcon}
              inheritViewBox
              className="h-6 w-6"
            />
          </Link>
        </CardContent>
      </Card>

      <Box className="bg-neutral-200 text-neutral-600 p-6 text-center dark:bg-neutral-700">
        <span>© 2023 Copyright:</span>{' '}
        <Link
          key={'tel'}
          className="font-semibold text-neutral-600  dark:text-neutral-400"
          href="https://hotelvajrapani.com/"
          rel="main"
          aria-label="Main Page"
        >
          Vajrapani Life
        </Link>
      </Box>
    </footer>
  );
}
