import { Grid, Skeleton } from '@mui/material';
import React from 'react';

export default function CardSkeleton({ no, width }: any) {
  return (
    <>
      {Array.from(new Array(no)).map((item, index) => (
        <Grid
          container
          wrap="wrap"
          className="flex gap-1 justify-center mb-8"
          key={index}
        >
          <Skeleton variant="rectangular" width={width} height={300} />
          {Array.from(new Array(6)).map((item, index) => (
            <Skeleton
              animation="wave"
              height={10}
              width={width}
              style={{ marginBottom: 6 }}
              key={index + 'i'}
            />
          ))}
        </Grid>
      ))}
    </>
  );
}
