'use client';

import { toggleTheme } from '@/provider/redux/features/ToggleTheme';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { Metadata } from 'next';

async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + 'api/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ a: 'sasasa' }),
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // console.log(res);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Test({ children }: any) {
  const [d, setD] = useState({ hi: 'xxx' });

  async function data() {
    const data = await getData();
    setD((p) => data);
  }

  useEffect(() => {
    data();
  }, []);

  const dispatch = useDispatch();
  const c = useSelector((state: any) => state.toggleTheme.theme);
  return (
    <div>
      {d.hi} / {children}
      <Button
        className={`bg-${useSelector((state: any) => state.toggleTheme.theme)}`}
        onClick={(e) => dispatch(toggleTheme(c))}
      >
        test {useSelector((state: any) => state.toggleTheme.theme)}
      </Button>
    </div>
  );
}
