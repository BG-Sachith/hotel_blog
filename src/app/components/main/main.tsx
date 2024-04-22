'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  Container,
  Box,
  Button,
  Snackbar,
  Alert,
  AlertProps,
  Paper,
  styled,
} from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import Swiper from '../swiper/Swiper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/provider/redux/store';
import { useSession } from 'next-auth/react';
import {
  setNewPost,
  toggleNewPage,
} from '@/src/provider/redux/features/PostManage';
import { PostVM } from '@/src/modules/PostVm';

const CardSkeleton = dynamic(() => import('../skeleton/CardSkeleton'), {
  ssr: true,
});
const SmallSwiper = dynamic(() => import('../resopnsiveSwiper/SmallSwiper'));

const CardPostList = dynamic(() => import('../post/CardPostList'), {
  ssr: false,
});

const CardAbout = dynamic(() => import('../post/CardAbout'), {
  ssr: true,
});

const LatestPost = dynamic(() => import('../post/LatestPost'), {
  ssr: false,
});

const FullScreenNewPostDialog = dynamic(
  () => import('../elements/FullScreenNewPostDialog'),
  {
    ssr: false,
  }
);

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Main() {
  const dispatch = useDispatch();
  const { isEdidMode }: any = useSelector((state: RootState) => state.settings);
  const { newPost }: any = useSelector((state: RootState) => state.postManage);
  const {
    matches_xs_up,
    matches_sm_up,
    matches_md_up,
    matches_lg_up,
    matches_sm_down,
    matches_md_down,
  }: any = useSelector((state: RootState) => state.toggleTheme.matches);

  const { data: session }: any = useSession();
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleClickOpen = () => {
    let d = newPost.id ? new PostVM({}) : newPost;
    dispatch(
      setNewPost({
        ...d,
        active: true,
        published: false,
        createdById: session.user?.id,
        modifiedById: session.user?.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishAt: new Date().toISOString(),
      })
    );
    dispatch(toggleNewPage(true));
  };

  return (
    <>
      <Box
        sx={{
          minHeight: !matches_lg_up && matches_md_up ? '100vh' : 'auto',
          backgroundColor: '#f1f1f1',
        }}
      >
        <Swiper
          matches_xs_up={matches_xs_up}
          matches_sm_up={matches_sm_up}
          matches_md_up={matches_md_up}
          matches_lg_up={matches_lg_up}
          matches_sm_down={matches_sm_down}
          matches_md_down={matches_md_down}
        />
      </Box>
      {/* 
      <Backdrop
        sx={{ color: '#fff', zIndex: 1 }} //(theme) => theme.zIndex.drawer + 1
        open={false}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}

      <Card
        sx={(theme) => ({
          width: '100%',
          position: 'relative',
          zIndex: '2',
          // marginTop: '1px',
          borderRadius: 0,
          minHeight: '100vh',
          backgroundColor: theme.palette.mode === 'light' ? '#f1f1f1' : '',
        })}
        className="rounded-none"
      >
        <CardContent>
          <Container
            sx={{
              marginTop: {
                xs: '-45px !important',
                sm: '-5px !important',
                md: '0px !important',
              },
            }}
            className={'main pl-0 pr-0 max-w-screen-xl rounded-none'}
          >
            <Box
              sx={{
                width: '100%',
                minWidth: '200px !important',
                color: '#fff',
                '& > .MuiBox-root > .MuiBox-root': {
                  p: 1,
                  borderRadius: 0,
                  fontSize: '0.875rem',
                  fontWeight: '700',
                },
              }}
            >
              <Box
                sx={{
                  display: {
                    xs: matches_xs_up && !matches_sm_up ? 'grid' : 'none',
                    sm: matches_sm_up && !matches_md_up ? 'grid' : 'none',
                    md: !matches_lg_up && matches_md_up ? 'grid' : 'none',
                    lg: matches_lg_up ? 'grid' : 'none',
                  },
                  gridTemplateColumns: `repeat(${
                    matches_xs_up && !matches_sm_up
                      ? 1
                      : matches_sm_up && !matches_md_up
                      ? 9
                      : !matches_lg_up && matches_md_up
                      ? 6
                      : 3
                  }, 1fr)`,
                  gap: 0.8,
                  gridTemplateRows: 'auto',
                  gridTemplateAreas:
                    matches_xs_up && !matches_sm_up
                      ? `"header""main""sidebar""footer"`
                      : matches_sm_up && !matches_md_up
                      ? `"header header header header header header header header header"
"main main main main main sidebar sidebar sidebar sidebar"
"footer footer footer footer footer footer footer footer footer"`
                      : !matches_lg_up && matches_md_up
                      ? `"header header header header header header"
"main main main main sidebar sidebar"
"footer footer footer footer footer footer"`
                      : `"header header header""main main sidebar""footer footer footer"`,
                }}
              >
                <Box sx={{ gridArea: 'header', marginTop: '30px' }} key={'hd'}>
                  {isEdidMode ? (
                    <FullScreenNewPostDialog
                      button={
                        <Button
                          variant="outlined"
                          onClick={handleClickOpen}
                          className="text-emerald-500"
                        >
                          <AddBoxIcon />
                        </Button>
                      }
                    />
                  ) : (
                    <div></div>
                  )}
                </Box>
                <Box sx={{ gridArea: 'main', textAlign: 'center' }} key={'mn'}>
                  <CardPostList />
                </Box>

                <Box sx={{ gridArea: 'sidebar', textAlign: 'left' }}>
                  <Item
                    style={{
                      padding: 0,
                      marginBottom: 10,
                      background: 'transparent',
                      boxShadow: 'none',
                    }}
                    className="bg-transparent shadow-none rounded-none"
                  >
                    <CardAbout />
                    {/* <Box sx={{ gridArea: 'main' }} key={'mn'}>
                        <Box
                          sx={{
                            display: 'grid',
                            gap: 2.5,
                            gridTemplateColumns: {
                              xs: 'repeat(auto-fill, min(200px, .8fr))',
                              sm: 'repeat(auto-fill, minmax(300px, .8fr))',
                              md: 'repeat(auto-fill, minmax(300px, .8fr))',
                            },
                            mb: 10,
                          }}
                        >
                          <CardSkeleton no={4} width={'86%'} />
                        </Box>
                      </Box> */}
                  </Item>

                  <LatestPost isTitle={true} />

                  {/* <Box sx={{ gridArea: 'main' }} key={'mn'}>
                      <Box
                        sx={{
                          display: 'grid',
                          gap: 2.5,
                          gridTemplateColumns: {
                            xs: 'repeat(auto-fill, min(200px, .8fr))',
                            sm: 'repeat(auto-fill, minmax(300px, .8fr))',
                            md: 'repeat(auto-fill, minmax(300px, .8fr))',
                          },
                          mb: 10,
                        }}
                      >
                        <CardSkeleton no={4} width={'86%'} />
                      </Box>
                    </Box> */}
                </Box>
              </Box>
            </Box>
          </Container>
        </CardContent>
      </Card>

      <Card
        sx={(theme) => ({
          pointerEvents: 'none',
          minHeight: '100px',
          borderRadius: 0,
          background: 'black !important', //
          // backgroundColor: matches_md_down ? 'inherit' : 'transparent',
        })}
        className={` custom-swiper  grid justify-items-stretch pr-5 ${
          matches_md_up ? 'bg-transparentx' : ''
        }`}
      >
        <SmallSwiper />
      </Card>

      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}
