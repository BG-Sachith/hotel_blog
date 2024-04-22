/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Chip,
  Container,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  findAllPostPage,
  updatePost,
  updatePostStatus,
} from '@/service/post/postService';
import RelatedPost from '../post/related/relatedPost';
import PostCardView from '../post/view/PostView';
import CardSkeleton from '../skeleton/CardSkeleton';
import { findCommntsByPostId } from '@/src/service/commentService';
import { PostCategory } from '@/src/modules/postCategory';
import { Post } from '@prisma/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/provider/redux/store';
import router from 'next/router';
import { setSelectedPost } from '@/src/provider/redux/features/SelectedItem';
import { PostVM } from '@/src/modules/PostVm';

export default function PostViewContent() {
  const dispatch = useDispatch();
  const { selectedPost }: any = useSelector(
    (state: RootState) => state.selectedItem
  );
  const [myPost, setMyPost] = useState<Post>();
  const [selectedPostImg, setMyPostImg] = useState<any>([]);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [isImgLoading, setImgLoading] = useState(true);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [loadingU, setLoadingU] = useState(false);
  const [isViewed, setIsViewed] = useState(false);

  const { navCategories, tags }: any = useSelector(
    (state: RootState) => state.navData
  );

  useEffect(() => {
    if (selectedPost?.id) {
      setMyPost((p: any) => selectedPost);
      setImgLoading(false);
      setLoading(false);
      setIsViewed((p) => false);
      findCommntsByPostId(selectedPost.id).then((v_) => {
        if (v_.data) {
          let pst: any = { ...v_.data };
          setMyPost((pr: any) => {
            return { ...pr, comments: pst };
          });
        }
      });
      findRelatedPosts();
    }
    () => dispatch(setSelectedPost({ ...new PostVM({}) }));
  }, [selectedPost?.id]);

  const findRelatedPosts = () => {
    let ct: any = navCategories.find(
      (c: any) => c?.name == selectedPost?.category?.name
    );
    if (selectedPost?.id && ct) {
      // const controller = new AbortController();
      // controller.abort();
      findAllPostPage(
        0,
        6,
        'id',
        'desc',
        null,
        true,
        [ct.id],
        [],
        [selectedPost.id]
        // controller.signal
      ).then(async (v) => {
        // console.log(v);
        if (v.data) {
          // setRelatedPosts(v.data);
          // const psts: any = [];
          // for (const po of v) {
          //   // let psts = await d?.map(async (po: any) => {
          //   if (po?.image)
          //     psts.push({ ...po, image: await getMyImg(po.image, po.id) });
          //   else psts.push(po);
          //   // });
          // }
          setRelatedPosts((pr) => v.data);
        }
        // setLoading(false);
        // controller.abort();
      });
    }
  };

  const setPgViewed = useCallback((v: any) => {
    setIsViewed(v);
  }, []);

  const updateMe = async (data: any, selectedImage: any) => {
    console.log(data);

    if (!data?.tags || data?.tags?.length == 0) {
      // setSnackbar({ children: 'Please Select Tags', severity: 'warning' });
      return;
    }
    if (!data?.category) {
      // setSnackbar({ children: 'Please Select Category', severity: 'warning' });
      return;
    }
    data = { ...data, image: '', publicUrl: '' }; //todo remove
    // if (!data?.image && selectedImage) {
    //   if (selectedImage?.type) {
    //     let name_ =
    //       selectedPostImg && selectedPostImg.split('/').length > 1
    //         ? selectedPostImg.split('/')[1].split('_post.')[0] +
    //           '_post.' +
    //           selectedImage.type.split('/')[1]
    //         : Date.now() + '_post.' + selectedImage.type.split('/')[1];
    //     // console.log(selectedImage);
    //     // console.log(name_);
    //     const { fileRes } = await uploadImgForKey(
    //       name_,
    //       'post/',
    //       selectedImage
    //     );
    //     // console.log(fileRes);
    //     if (fileRes?.Key) {
    //       data.image = fileRes.Key;
    //       data.publicUrl = fileRes.Location;
    //     }
    //   } else data.image = selectedPostImg;
    // }
    // console.log(data);
    setLoadingU(true);
    updatePost(data).then((d) => {
      if (d.data) {
        console.log(d);
        if (selectedImage)
          d.data.image =
            selectedImage?.type != null
              ? URL.createObjectURL(selectedImage)
              : selectedImage;
        setMyPost((p: any) => d.data);
        dispatch(setSelectedPost({ ...d.data }));
        // setPosts((pr) => [...pr.filter((p) => p.id != data.id), d]);
      }
      setLoadingU(false);
      setOpenUpdateDialog(false);
    });
  };

  const updateStatus = (id: any, stt: any) => {
    setLoadingU(true);
    updatePostStatus(id, stt).then((d) => {
      if (d.data) {
        setMyPost(d.data);
        dispatch(setSelectedPost({ ...d.data }));
        // setPosts((pr) => pr.filter((p: Post) => !p?.isPublish && p.id != id));
      }
      setLoadingU(false);
      setOpenUpdateDialog(false);
    });
  };

  const handleClickOpen = () => {
    if (myPost?.id) setOpenUpdateDialog(true);
  };
  return (
    <Card
      sx={(theme) => ({
        width: '100%',
        position: 'relative',
        boxShadow: 'none',
        border: 'none',
        borderRadius: 0,
        minHeight: '100vh',
      })}
      className="custom-card"
    >
      <CardContent
        className="custom-card"
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#f1f1f1'
              : theme.palette.primary + '',
        })}
      >
        <Container
          sx={(theme) => ({
            marginTop: 15,
          })}
          className={'main max-w-screen-xl'}
        >
          {myPost?.id != null && !isImgLoading ? (
            // <SelectedPostContext.Provider
            //   value={{
            //     selectedPost: JSON.parse(JSON.stringify(selectedPost)),
            //     setMyPost: setMyPost,
            //     categories: category,
            //     tags: tags,
            //   }}
            // >
            <Grid
              container
              sx={{ flexGrow: 1, gap: 1 }}
              // className="custom-card"
            >
              <Grid sm={12} md={7} lg={7.8}>
                <Card
                  className="p-0 "
                  sx={{
                    boxShadow: 'none',
                    border: 'none',
                    borderRadius: 0,
                  }}
                >
                  {
                    <PostCardView
                      isViewOnly={false}
                      handleClickOpen={handleClickOpen}
                      loadingU={loadingU}
                      openUpdateDialog={openUpdateDialog}
                      setOpenUpdateDialog={setOpenUpdateDialog}
                      updateMe={updateMe}
                      updateStatus={updateStatus}
                      isViewed={isViewed}
                      setPgViewed={setPgViewed}
                      selectedPost={myPost}
                    />
                  }
                  {/* : (
                      <CardSkeleton no={1} />
                    )} */}
                </Card>
              </Grid>
              <Grid xs={12} md={4} lg={4} className="overflow-hidden">
                <Box className="p-0 mt-3 custom-card overflow-hidden w-full">
                  {relatedPosts?.length > 0 && (
                    <RelatedPost relatedPosts={relatedPosts}></RelatedPost>
                  )}
                </Box>
                <Box className="p-0 mt-3 custom-card overflow-hidden">
                  <Grid xs={12} md={12} lg={12} className="overflow-hidden">
                    <Typography>Category</Typography>
                    <Stack
                      direction="row"
                      // spacing={1}
                      className="justify-around"
                      sx={{ display: 'initial' }}
                    >
                      {navCategories?.map((ct: PostCategory, index: number) => (
                        <Chip
                          label={ct.name}
                          component="a"
                          color="primary"
                          variant="outlined"
                          key={index}
                          clickable
                          size="small"
                          sx={{
                            // minWidth: { md: '150px' },
                            display: {
                              md: index < 6 ? 'inline-list-item' : 'none',
                              lg: index < 12 ? 'inline-list-item' : 'none',
                            },
                            margin: '0.75rem !important',
                          }}
                          onClick={() => router.push('/posts/' + ct.name)}
                          // className="my-3 mx-3"
                        />
                      ))}
                    </Stack>
                  </Grid>
                </Box>
              </Grid>
              {/* <Grid xs={12} md={12}> */}
              {/* <Box className="p-0 custom-card">xs</Box> */}
              {/* </Grid> */}
            </Grid>
          ) : (
            // </SelectedPostContext.Provider>
            <Container
              sx={{
                marginTop: {
                  xs: '-45px !important',
                  sm: '-5px !important',
                  md: '0px !important',
                },
                height: '100vh',
              }}
              className={'main pl-0 pr-0 max-w-screen-xl '}
            >
              <CardSkeleton no={1} width={'86%'} />
            </Container>
          )}
        </Container>
      </CardContent>
    </Card>
  );
}
