import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { Box, Divider } from '@mui/material';
import Image from 'next/image';
import FadeInSection from '../animation/FadeInSection';

// const FadeInSection = dynamic(() => import('../animation/FadeInSection'));

export default function CardAbout() {
  const router = useRouter();

  return (
    <FadeInSection
      classes={
        // matches_md_up
        //   ? 'fade-in-section-l3d shadow-none rounded-none border  ':
        'shadow-none rounded-none border px-5'
      }
      sx={(theme: any) => ({
        boxShadow: 'none',
        height: 'auto',
        cursor: 'pointer',
        // transition: 'transform 0.3s, border 0.3s',
        borderColor:
          theme.palette.mode === 'dark'
            ? 'rgb(16, 24, 48)'
            : theme.palette.primary,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgb(16, 24, 48)'
            : theme.palette.primary,
        '&:hover': {
          borderColor: theme.palette.primary,
          transform: 'translateY(-2px)',
        },
        // '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
      })}
      // animClass={matches_md_up ? 'is-visible-l px-5' : 'px-5'}
      animClass=""
    >
      <Box
        // elevation={4}
        sx={(theme) => ({
          boxShadow: 'none',
          height: 'auto',
          cursor: 'pointer',
          textAlign: 'left',
          // transition: 'transform 0.3s, border 0.3s',
          // '&:hover': {
          //   borderColor: theme.palette.primary,
          //   transform: 'translateY(-2px)',
          // },
          '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
        })}
      >
        <Typography className="py-5 font-sans  text-lg">About</Typography>
        <Divider
          className="-mt-2 mb-3"
          sx={(theme) => ({
            fontSize: '10px',
            paddingY: '.7px',
            backgroundColor:
              theme.palette.mode === 'dark' ? 'white' : 'rgb(16, 24, 48)',
          })}
        />
        {/* <CardMedia
          component="img"
          height="194"
          image="/images/vg-hotel.jpg"
          alt="About us"
          onClick={() => router.push('/about-us')}
          // className='pt-1 border-t'
          placeholder="blur"
          loading="lazy"
        /> */}
        <div
          style={{ maxHeight: '241px', width: 'auto' }}
          className="blur-load mt-2 border-t"
        >
          <Image
            // fill
            priority={true}
            onClick={() => router.push('/about-us')}
            src="/images/vg-hotel.jpg"
            alt="About us"
            height="332"
            width="241"
            placeholder="blur"
            style={{ width: '100%', maxHeight: '241px' }}
            blurDataURL="/images/blur/vg-hotel.jpg"
          />
        </div>
        <CardContent
          sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            className="flex items-center justify-center"
            onClick={() => router.push('/about-us')}
            sx={{
              // fontFamily: 'monospace',
              fontWeight: '600',
            }}
          >
            Welcome to our Vajrapani Life blog, a gateway to unlocking the
            ultimate happiness in life. We believe that true joy lies in the
            harmonious integration of various aspects that enrich our existence.
            With a scientific approach and an unwavering dedication to your
            well-being, we invite you to embark on a transformative journey
            through our carefully curated categories. ...
          </Typography>
        </CardContent>
      </Box>
    </FadeInSection>
  );
}
