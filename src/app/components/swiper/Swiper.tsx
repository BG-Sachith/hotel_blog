/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material';
import React from 'react';
import MainSwiper from './MainSwiper';

export default function Swiper({
  matches_xs_up,
  matches_sm_up,
  matches_md_up,
  matches_lg_up,
  matches_sm_down,
  matches_md_down,
}: any) {
  return (
    <>
      <Box
        sx={{
          display: {
            xs: matches_xs_up && !matches_md_up ? 'flex' : 'none',
            sm: matches_xs_up && !matches_md_up ? 'flex' : 'none',
            md: !matches_lg_up && matches_md_up ? 'flex' : 'none',
            lg: matches_lg_up ? 'flex' : 'none',
          },
        }}
        className="mainSwiper"
      >
        <MainSwiper
          matches_xs_up={matches_xs_up}
          matches_md_up={matches_md_up}
          matches_sm_up={matches_sm_up}
          matches_lg_up={matches_lg_up}
          matches_sm_down={matches_sm_down}
          matches_md_down={matches_md_down}
        />
      </Box>
    </>
  );
}
