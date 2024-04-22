'use client';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect } from 'react';
import { deviceMatches } from '../redux/features/ToggleTheme';
import { useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function SessionPrvdr({ children }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matches_xs_up = useMediaQuery(theme.breakpoints.up('xs'));
  const matches_sm_up = useMediaQuery(theme.breakpoints.up('sm'));
  const matches_md_up = useMediaQuery(theme.breakpoints.up('md'));
  const matches_lg_up = useMediaQuery(theme.breakpoints.up('lg'));

  const matches_sm_down = useMediaQuery(theme.breakpoints.down('sm'));
  const matches_md_down = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    dispatch(
      deviceMatches({
        matches_xs_up: matches_xs_up,
        matches_sm_up: matches_sm_up,
        matches_md_up: matches_md_up,
        matches_lg_up: matches_lg_up,
        matches_sm_down: matches_sm_down,
        matches_md_down: matches_md_down,
      })
    );
    // console.log(matches_sm_up);
  });
  return <SessionProvider>{children}</SessionProvider>;
}
