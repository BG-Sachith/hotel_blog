'use client';
/* eslint-disable @next/next/no-img-element */
import {
  Card,
  Stack,
  Typography,
  Box,
  Link,
  ImageListItem,
  ListSubheader,
  ImageListItemBar,
  IconButton,
  ImageList,
  Skeleton,
  useMediaQuery,
  useTheme,
  Paper,
  styled,
  Divider,
  Backdrop,
  CircularProgress,
  List,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/navigation';
import Info from '@mui/icons-material/InfoSharp';

import dynamic from 'next/dynamic';
import { Post } from '@prisma/client';
import { findAllPostPage } from '@/src/service/post/postService';
import { RootState } from '@/src/provider/redux/store';
import { useSelector } from 'react-redux';

const FadeInSection = dynamic(() => import('../animation/FadeInSection'));

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function LatestPost({ isTitle }: any) {
  const router = useRouter();
  const theme = useTheme();
  const { posts, isPageLoading, isPageLoadingMore, hasMore, pageNumber }: any =
    useSelector((state: RootState) => state.paginate);
  const matches_md_down: boolean = useMediaQuery(theme.breakpoints.down('md'));
  const [isNavigate, setNavigateLoading] = useState(false);

  const [latestPost, setLatestPost] = useState<Post[]>([]);
  const [run, setRun] = useState<number>(-1);

  useEffect(() => {
    // console.log(isPageLoading);
    // console.log(isPageLoadingMore);
    console.log(run);
    getLatestPost();
  }, [run]);

  useEffect(() => {
    setRun((pre) => pageNumber);
  }, [pageNumber]);

  const getLatestPost = () => {
    console.log(posts.length);

    findAllPostPage(
      hasMore ? pageNumber + 1 : pageNumber,
      8,
      'updatedAt',
      'desc',
      null,
      true,
      [],
      [],
      []
    )
      .then((d: any) => {
        if (d && d?.data) {
          setLatestPost(d.data);
        }
      })
      .catch((e: any) => {});
  };

  return (
    <Item
      className="shadow-none rounded-none  p-0"
      sx={(theme: any) => ({
        color: 'text.primary',
        boxShadow: 'none',
        border: 'none',
        borderColor:
          theme.palette.mode === 'dark'
            ? 'rgb(16, 24, 48)'
            : theme.palette.primary,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgb(16, 24, 48)'
            : theme.palette.primary,
      })}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: 1 }} //(theme) => theme.zIndex.drawer + 1
        open={isNavigate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Item
        className=" font-sans text-lg  my-3 text-left px-5"
        sx={(theme: any) => ({
          boxShadow: 'none',
          border: 'none',
          color: 'inherit',
          borderColor:
            theme.palette.mode === 'dark'
              ? 'rgb(16, 24, 48)'
              : theme.palette.primary,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgb(16, 24, 48)'
              : theme.palette.primary,
        })}

        // elevation={2}
      >
        <Typography className="py-5 font-sans  text-lg text-left">
          Latest Posts
        </Typography>

        <Divider
          className="-mt-2 mb-3"
          sx={(theme) => ({
            fontSize: '10px',
            paddingY: '.7px',
            backgroundColor:
              theme.palette.mode === 'dark' ? 'white' : 'rgb(16, 24, 48)',
          })}
        />
      </Item>
      <Item
        key={'p' + 'lx'}
        style={{ textAlign: 'left', padding: 0 }}
        sx={(theme: any) => ({
          boxShadow: 'none',
          border: 'none',
          borderColor:
            theme.palette.mode === 'dark'
              ? 'rgb(16, 24, 48)'
              : theme.palette.primary,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgb(16, 24, 48)'
              : theme.palette.primary,
        })}
      >
        <Card
          sx={(theme: any) => ({
            boxShadow: 'none',
            border: 'none',
            borderColor:
              theme.palette.mode === 'dark'
                ? 'rgb(16, 24, 48)'
                : theme.palette.primary,
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgb(16, 24, 48)'
                : theme.palette.primary,
          })}
          className="px-1 shadow-none rounded-none border"
        >
          <Box sx={{ flexGrow: 1, cursor: 'pointer' }}>
            <Grid
              container
              spacing={0.1}
              sx={
                {
                  // '--Grid-borderWidth': '1px',
                  // padding: 1,
                  // borderColor: 'divider',
                  // '& > div': {
                  // borderRight: 'var(--Grid-borderWidth) solid',
                  // borderBottom: 'var(--Grid-borderWidth) solid',
                  // borderColor: 'divider',
                  // },
                }
              }
            >
              {latestPost.map((p: any, index: any) => (
                <Box
                  key={index}
                  sx={(theme) => ({
                    flexGrow: 1,
                    border: 'none',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      borderColor: theme.palette.primary,
                      transform: 'scale(1.03)',
                    },
                    '& > *': {
                      minWidth: 'clamp(0px, (360px - 100%) * 999,100%)',
                    },
                  })}
                  className="bg-transparent w-full "
                >
                  <FadeInSection
                    classes={'fade-in-section-l  rounded-none border shadow-md'}
                    sx={(theme: any) => ({
                      height: 'auto',
                      cursor: 'pointer',
                      border: 'none',
                      borderRadius: 0,
                    })}
                    animClass={'is-visible-l'}
                  >
                    <Box
                      sx={(theme) => ({
                        flexGrow: 1,
                        // transition: 'transform 0.3s, border 0.3s',
                        // '&:hover': {
                        //   borderColor: theme.palette.primary,
                        //   transform: 'scale(1.03)',
                        // },
                        '& > *': {
                          minWidth: 'clamp(0px, (360px - 100%) * 999,100%)',
                        },
                      })}
                      className=" rounded-none"
                    >
                      <Grid
                        container
                        spacing={1.5}
                        margin={1}
                        component="menu"
                        // rowSpacing={1}
                        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                          marginLeft: '-1px',
                          '--Grid-borderWidth': '1.5px',
                          // borderTop: 'var(--Grid-borderWidth) solid',
                          // borderLeft: 'var(--Grid-borderWidth) solid',
                          borderColor: 'divider',
                          '& > div': {
                            borderRight: 'var(--Grid-borderWidth) solid',
                            borderTop: 'var(--Grid-borderWidth) solid',
                            // borderBottom: 'var(--Grid-borderWidth) solid',
                            borderColor: 'divider',
                          },
                        }}
                        className="w-full pr-2"
                      >
                        <ImageListItem cols={2} className="p-0 w-full ">
                          <ListSubheader
                            component="div"
                            className="m-0 text-sm font-sans"
                            sx={{
                              zIndex: 0,
                              backgroundColor: (theme) =>
                                theme.palette.mode == 'light'
                                  ? 'rgb(248 250 252)'
                                  : 'rgb(16, 24, 48)',
                            }}
                          >
                            {p?.title?.substring(0, 40) + '... ' || ''}
                          </ListSubheader>
                        </ImageListItem>

                        <Grid
                          {...{ xs: 5, sm: 4, md: 4, lg: 4 }}
                          minHeight={120}
                          className=""
                          // marginBottom={5}
                        >
                          <ImageList className="w-full h-full" cols={1}>
                            {p.publicUrl &&
                              [p.publicUrl].map((item, i) => (
                                <ImageListItem
                                  key={i}
                                  className="text-xs min-h-200 w-full"
                                  onClick={() => {
                                    // setSelectedPost(p);
                                    setNavigateLoading((n) => true);
                                    router.push(`/posts/${p.id}`, {
                                      scroll: true,
                                    });
                                  }}
                                >
                                  {item ? (
                                    <img
                                      src={item}
                                      srcSet={`${item}`}
                                      alt={p.title + ''}
                                      loading="lazy"
                                    />
                                  ) : (
                                    <Skeleton
                                      height="100%"
                                      width="100%"
                                      animation="wave"
                                      variant="rectangular"
                                    />
                                  )}
                                  <ImageListItemBar
                                    title={''}
                                    subtitle={p?.category?.name}
                                    className="text-xs p-0"
                                    actionIcon={
                                      <IconButton
                                        size="small"
                                        sx={{
                                          color: 'rgba(255, 255, 255, 0.54)',
                                        }}
                                        aria-label={`info about ${
                                          p?.title || ''
                                        }`}
                                      >
                                        {p?.likes?.length || ''}
                                        <Info />
                                      </IconButton>
                                    }
                                  />
                                </ImageListItem>
                              ))}
                          </ImageList>
                          {/* <CardMedia
                    component="img"
                    width="200"
                    image={p.image + ''}
                    alt="green iguana"
                    onClick={() => {
                      router.push('/posts/' + p.id);
                    }}
                  /> */}
                        </Grid>
                        <Grid
                          {...{ xs: 7, sm: 8, md: 8, lg: 8 }}
                          minHeight={120}
                          sx={{ borderRight: 'none !important' }}
                          // marginBottom={5}
                        >
                          <Stack>
                            {/* <Link>
                      8.1M Likes
                      <Link
                        component="button"
                        underline="none"
                        fontSize="10px"
                        sx={{ color: 'text.tertiary', my: 0.5, ml: 4 }}
                      >
                        2 DAYS AGO
                      </Link>
                    </Link> */}
                            <Typography
                              className=" px-1 decoration-1 font-serif"
                              sx={{ fontSize: '11px' }}
                            >
                              {/* <Link>Traval</Link>{' '} */}
                              {p?.summary?.substring(
                                0,
                                matches_md_down ? 80 : 100
                              ) + '...'}
                            </Typography>
                            <Link
                              className="text-xs px-1 decoration-1 font-serif"
                              // component="button"
                              // underline="none"
                              // fontSize="sm"
                              // startDecorator="…"
                              onClick={() => {
                                // setSelectedPost(p);
                                setNavigateLoading((n) => true);
                                router.push(`/posts/${p.id}`, {
                                  scroll: true,
                                });
                              }}
                              sx={{ color: 'text.tertiary' }}
                            >
                              more...
                            </Link>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </FadeInSection>
                </Box>
              ))}
            </Grid>
          </Box>
        </Card>
      </Item>
    </Item>
  );
}
