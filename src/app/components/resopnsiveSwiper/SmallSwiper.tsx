'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import {
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export const imgs: any = [
  { src: '/images/btm_silds/btm_sld.jpg', title: '1' },
  { src: '/images/btm_silds/btm_sld1.jpg', title: '1' },
  { src: '/images/btm_silds/btm_sld2.jpg', title: '1' },
  { src: '/images/btm_silds/btm_sld3.jpg', title: '1' },
  { src: '/images/btm_silds/btm_sld.jpg', title: '1' },
  { src: '/images/btm_silds/btm_sld1.jpg', title: '1' },
  { src: '/images/btm_silds/btm_sld2.jpg', title: '1' },
  { src: '/images/btm_silds/btm_sld3.jpg', title: '1' },
  { src: '/images/btm_silds/btm_sld.jpg', title: '1' },
  { src: '/images/btm_silds/btm_sld1.jpg', title: '1' },
];

export default function SmallSwiper() {
  const theme = useTheme();
  const matches_sm_down = useMediaQuery(theme.breakpoints.down('md'));
  const [slds, setSlds] = useState([
    ...imgs,
    // ...imgs.slice(1, imgs.length - 1),
    // ...imgs.slice(1, imgs.length - 1),
    // ...imgs.slice(1, imgs.length - 1),
  ]);
  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
        }}
        slidesPerView="auto"
        // spaceBetween={1}
        breakpoints={{
          640: {
            slidesPerView: 5,
            // spaceBetween: 1,
          },
          768: {
            slidesPerView: 4,
            // spaceBetween: 1,
          },
          1024: {
            slidesPerView: 5,
            // spaceBetween: 16,
          },
          1450: {
            slidesPerView: 6,
            // spaceBetween: 16,
          },
        }}
        autoplay={{
          delay: 800,
          // disableOnInteraction: false,
          // reverseDirection: true,
        }}
        speed={3000}
        loop={true}
        // loopedSlides={slds.length}
        onEnded={(swiper) => {
          // console.log(swiper);
          // setSlds((pr) => [slds.reverse()]);
        }}
        modules={[Autoplay, Navigation, Pagination]}
        grabCursor={true}
        navigation={true}
        rewind={true}
        className={`mySwiper px-5  ${matches_sm_down ? 'my-h' : ''}`}
      >
        {/* <SwiperSlide>Slide 9</SwiperSlide> */}
        {slds.map((s, i) => (
          <SwiperSlide key={i + 'ds'} className="p-0 h-full">
            <Card className="swiper-zoom-container p-0 h-full shadow-none rounded-none d">
              <CardContent className="swiper-zoom-container p-0 h-full">
                <CardMedia
                  component="img"
                  sx={
                    {
                      // width: 'auto',
                      // minHeight:
                      //   matches_xs_up && matches_sm_down
                      //     ? '300px'
                      //     : matches_sm_up && matches_md_down
                      //     ? '54vh'
                      //     : !matches_lg_up && matches_md_up
                      //     ? '94vh'
                      //     : '100vh',
                    }
                  }
                  image={s.src}
                  alt={s.title}
                  height="100%"
                  width={'100%'}
                  loading="lazy"
                  // className="w-full h-full"
                />
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
