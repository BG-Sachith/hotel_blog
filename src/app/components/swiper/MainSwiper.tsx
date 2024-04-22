'use client';
import React from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Card, CardContent, CardMedia } from '@mui/material';
import { slides } from '@/util/slides';
import Image from 'next/image';

export default function MainSwiper({
  matches_xs_up,
  matches_sm_up,
  matches_md_up,
  matches_lg_up,
  matches_sm_down,
  matches_md_down,
}: any) {
  return (
    <Box
      style={{
        width: '100vw',
        overflow: 'hidden',
        marginTop: matches_lg_up || matches_md_up ? '50px' : '0',
        // position: 'fixed',
        zIndex: 1,
      }}
      // className={'fixedSwiper'}
    >
      <Card
        sx={{
          borderRadius: 0,
          boxShadow: 'none',
          display: 'flex',
          height:
            matches_xs_up && matches_sm_down
              ? '300px'
              : matches_sm_up && matches_md_down
              ? '54vh'
              : !matches_lg_up && matches_md_up
              ? '94vh'
              : '94vh',
          ':hover': {
            WebkitTransition: 'all 0.4s',
            MozTransition: 'all 0.4s',
            transform: 'scale(1.001)',
          },
          zIndex: 1,
          // overflowY: 'hidden',
        }}
        className="border-none border-0 rounded-none  "
      >
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 30000,
            disableOnInteraction: false,
            // reverseDirection: true,
          }}
          speed={3000}
          loop={true}
          // parallax={true}
          pagination={{
            clickable: true,
          }}
          // initialSlide={4}
          // slidesPerView={1}
          // cssMode={true}
          // freeMode={true}
          navigation
          // ={{
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          // }}
          // mousewheel={true}
          // keyboard={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          // zoom={true}
          grabCursor={true}
          // coverflowEffect={{
          //   rotate: 50,
          //   stretch: 0,
          //   depth: 100,
          //   modifier: 1,
          //   slideShadows: true,
          // }}
          // effect={'fade'}
          // fadeEffect={{ crossFade: true }}
          dir={'ltr'}
          // dir={router.locale == 'ar' ? 'rtl' : 'ltr'}
        >
          {slides.map((s: any, i: number) =>
            s.src.split('mp4').length < 2 ? (
              <SwiperSlide className="p-0 h-full" key={s.src + i}>
                <Card className="swiper-zoom-container p-0">
                  <CardContent
                    className="swiper-zoom-container p-0"
                    style={{
                      // position: 'relative',
                      width: '100vw',
                      height: '100vh',
                      overflowX: 'hidden',
                      overflowY: 'hidden',
                      backgroundImage: `url(${s.blur})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  >
                    {/* <CardMedia
                      component="img"
                      sx={{
                        width: '100%',
                        minHeight:
                          matches_xs_up && matches_sm_down
                            ? '300px'
                            : matches_sm_up && matches_md_down
                            ? '54vh'
                            : !matches_lg_up && matches_md_up
                            ? '94vh'
                            : '100vh',
                        backgroundPosition: 'center center',
                        // backgroundPosition: 'center center',
                        // clipPath: 'rect(0, 0, 10px, 20px);',
                        position:
                          !matches_lg_up && matches_md_up
                            ? 'relative'
                            : 'absolute',
                        right: 0,
                        bottom: 0,
                        height:
                          !matches_lg_up && matches_md_up
                            ? 'max-content !important'
                            : ' 100%',
                      }}
                      image={s.src}
                      alt={s.title}
                      loading="lazy"
                      // height="100%"
                      width={'100%'}
                      className="w-full h-fit"
                    /> */}
                    <Image
                      src={s.src}
                      alt={s.title}
                      width={1500}
                      height={1000}
                      priority={true}
                      // loading="lazy"
                      placeholder="blur"
                      blurDataURL={s.blur}
                      key={s.title}
                      className="w-full h-fit"
                      style={{
                        width: '100%',
                        objectFit: 'cover',
                        minHeight:
                          matches_xs_up && matches_sm_down
                            ? '300px'
                            : matches_sm_up && matches_md_down
                            ? '54vh'
                            : !matches_lg_up && matches_md_up
                            ? '94vh'
                            : '100vh',
                        backgroundPosition: 'center center',
                        // backgroundPosition: 'center center',
                        // clipPath: 'rect(0, 0, 10px, 20px);',
                        position:
                          !matches_lg_up && matches_md_up
                            ? 'relative'
                            : 'absolute',
                        right: 0,
                        bottom: 0,
                        // height:
                        //   !matches_lg_up && matches_md_up
                        //     ? 'max-content !important'
                        //     : ' 100%',
                      }}
                    />
                  </CardContent>
                </Card>
              </SwiperSlide>
            ) : (
              <SwiperSlide
                className="p-0 h-full"
                style={{ padding: '0 !important' }}
                key={s.src + i}
              >
                <CardMedia
                  component="video"
                  style={{
                    width: '100%',
                    minHeight:
                      matches_xs_up && matches_sm_down
                        ? '300px'
                        : matches_sm_up && matches_md_down
                        ? '54vh'
                        : !matches_lg_up && matches_md_up
                        ? '94vh'
                        : '100vh',
                  }}
                  src={s.src}
                  autoPlay
                  loop
                  muted
                  aria-disabled
                  autoSave="false"
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </Card>
    </Box>
  );
}
