'use client';
import { Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

export default function FadeInSection({
  children,
  classes,
  animClass,
  sx,
}: any) {
  const domRef: any = useRef();

  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // In your case there's only one element to observe:
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //   if (entries[0].isIntersecting) {
          // Not possible to set it back to false like this:
          setVisible(true);

          // No need to keep observing:
          observer.unobserve(domRef.current);
        } else setVisible(false);
      });
    });

    observer.observe(domRef.current);

    return () => observer.disconnect();
  });

  return (
    <Paper
      sx={sx}
      ref={domRef}
      className={` ${classes + ' '} ${isVisible ? animClass : ''}`}
    >
      {children}
    </Paper>
  );
}
