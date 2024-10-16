/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  Link,
  Skeleton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Dialog,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { dateFrom, dateTimeFrom } from '@/util/dateTime';
import Comments from '../Comments';
import { LoadingButton } from '@mui/lab';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { VariantType, enqueueSnackbar } from 'notistack';
import { createCommnt, deleteCommnt } from '@/service/commentService';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { GridAddIcon } from '@mui/x-data-grid';
import ShareIcon from '@mui/icons-material/Share';
import { deleteLike, createLike } from '@/service/likeService';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dynamic from 'next/dynamic';
import { RootState } from '@/src/provider/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '@/src/modules/post';
import { PostLikeVM } from '@/src/modules/PostLikeVM';
import { User } from '@/src/modules/user';
const GroupButtonH = dynamic(() => import('../../elements/GroupButtonH'));
const LoginDialog = dynamic(() => import('../../auth/LoginDialog'));
const RegisterDialog = dynamic(() => import('../../auth/RegisterDialog'));

// const app_url = 'https://vajrapani-hotel-blog-git-beta-bg-sachith.vercel.app/'; //'https://vajrapani-hotel-blog.vercel.app/';
const actions = [
  {
    icon: <FacebookIcon />,
    name: 'Facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=`,
  },
  {
    icon: <LinkedInIcon />,
    name: 'linkeIn',
    url: `https://www.linkedin.com/shareArticle?mini=true&url=`,
  },
  {
    icon: <TwitterIcon />,
    name: 'Twitter',
    url: `https://twitter.com/intent/tweet?url=`,
  },
];

export default function PostCardView({
  isViewOnly,
  updateMe,
  loadingU,
  handleClickOpen,
  setOpenUpdateDialog,
  openUpdateDialog,
  updateStatus,
  isViewed,
  setPgViewed,
  selectedPost,
}: any) {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });
  const dispatch = useDispatch();
  const colorMode = useSelector((state: RootState) => state.toggleTheme.theme);
  const { isEdidMode, openDrwAdm, hideMe }: any = useSelector(
    (state: RootState) => state.settings
  );
  const { navCategories, navSearchValue, tags }: any = useSelector(
    (state: RootState) => state.navData
  );

  const [post, setPost] = React.useState<Post | any>(selectedPost);
  const { data: session, status } = useSession();
  const [loadingCo, setLoadingCo] = useState(false);
  const commentRef = useRef(undefined);
  const [registerCardOpen, setRegisterCardOpen] = React.useState(false);
  const [loginCardOpen, setLoginCardOpen] = React.useState(false);
  const [lastModyfyAt, setLastModyfyAt] = React.useState('');
  const [createdAt, setCreatedAt] = React.useState('');
  const [app_url, setApp_url] = React.useState(
    'https://www.vajrapanilife.com/'
  );

  const handleRegisterCardOpen = () => {
    setRegisterCardOpen(true);
  };
  const handleRegisterCardClose = () => {
    setRegisterCardOpen(false);
  };

  const handleLoginCardOpen = () => {
    setLoginCardOpen(true);
  };
  const handleLoginCardClose = () => {
    setLoginCardOpen(false);
  };

  const handleClickVariant = (variant: VariantType, msg: any) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
    console.log('');
  };

  const sendComment = async (e: any, id: any) => {
    e.preventDefault();
    let v: any = commentRef.current ? commentRef.current : null;

    if (v?.value && v.value.trim() != '') {
      const cm = {
        message: v?.value,
        postId: id,
        createdBy: session?.user?.email,
        modifiedBy: session?.user?.email,
        hide: false,
      };

      setLoadingCo(true);
      let c = await createCommnt(cm);
      // console.log(status);
      // setTimeout(() => {
      setLoadingCo(false);

      handleClickVariant('success', 'success!');
      setPost((p: any) => {
        return {
          ...p,
          comments: [...post?.comments, cm],
        };
      });
      v.value = '';
      // }, 1500);
    }
  };

  const deleteComt = async (e: any, id: any) => {
    e.preventDefault();
    await deleteCommnt(id);
    // console.log(status);
    handleClickVariant('success', 'success!');
    setPost((p: any) => {
      return {
        ...p,
        comments: post?.comments?.filter((c: any) => c.id != id),
      };
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const addMyFavor = () => {
    if (post?.id && session?.user?.email) {
      if (
        post?.likes &&
        post?.likes?.findIndex(
          (l: any) => l.createdById == new User(session?.user).id
        ) > -1
      ) {
        deleteLike(post.id, new User(session?.user).id).then((p) => {
          // console.log(p);
          if (p.res.count)
            setPost((pr: any) => {
              let l = pr.likes.filter(
                (l: any) => l.createdById != new User(session?.user).id
              );
              return { ...pr, ...{ likes: l } };
            });
        });
      } else
        createLike({
          postId: post.id,
          createdById: new User(session?.user).id,
          modifiedById: new User(session?.user).id,
        }).then((p) => {
          // console.log(p);
          if (p?.like)
            setPost((pr: any) => {
              return { ...pr, ...{ likes: [...pr.likes, p.like] } };
            });
          // console.log(post);
        });
    } else {
      handleClickVariant('warning', 'Signin Required!');
    }
  };

  useEffect(() => {
    setApp_url((p) => window.location.host + '/');
    // console.log(selectedPost);
    // if (!isViewed) {
    // console.log(post);
    setPgViewed(true);
    setLastModyfyAt(dateTimeFrom(post?.updatedAt));
    setCreatedAt(dateFrom(post?.createdAt));
    setPost(selectedPost);
    // }
  }, [selectedPost, isViewed]);

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  // const handleClick = () => {
  //   console.info('You clicked the Chip.');
  // };
  return (
    <Card
      sx={(theme) => ({
        width: '100%',
        position: 'relative',
        borderRadius: 0,
        boxShadow: 'none',
      })}
      className="w-full custom-card p-0 "
      // elevation={24}
      variant="outlined"
      square
    >
      <CardContent className="shadow-none p-0 w-full">
        <Card
          className="w-full shadow-none rounded-none"
          sx={{ borderRadius: 0 }}
        >
          {isEdidMode && !isViewOnly && (
            <Box className="relative w-100 justify-end">
              <Box className=" absolute right-0 z-10">
                <GroupButtonH
                  updateMe={updateMe}
                  deleteMe={null}
                  loadingD={null}
                  loadingU={loadingU}
                  handleClickOpen={handleClickOpen}
                  setOpen={setOpenUpdateDialog}
                  open={openUpdateDialog}
                  updateStatus={updateStatus}
                />
              </Box>
            </Box>
          )}
          <CardActionArea
            sx={{ boxShadow: 'initial', minHeight: '440px' }}
            className="h-fit w-full"
          >
            {isViewOnly ? (
              post?.publicUrl ? (
                <CardMedia
                  component="img"
                  alt={post.title}
                  className="h-full"
                  // src={post.publicUrl}
                  loading="lazy"
                  image={post?.publicUrl}
                />
              ) : (
                <Skeleton
                  height="440px"
                  width="100%"
                  animation="wave"
                  variant="rectangular"
                  className="min-w-fit "
                />
              )
            ) : post.publicUrl ? (
              <CardMedia
                component="img"
                alt={post.title}
                className="h-full"
                src={post.publicUrl}
                loading="lazy"
                // image={post?.image}
              />
            ) : (
              <Skeleton
                height="440px"
                width="100%"
                animation="wave"
                variant="rectangular"
                className="min-w-fit "
              />
            )}
          </CardActionArea>
          <CardContent className=" w-full mt-2 py-3 px-1 ">
            <Box
              className="flex items-center cursor-default py-2"
              sx={{ width: '100%' }}
            >
              <Box
                className="grow min-w-fit border-slate-400 border-r-2 "
                sx={{ display: { xs: 'none', sm: 'none', md: 'inherit' } }}
              >
                <Box className="flex justify-start text-xs">{createdAt}</Box>
              </Box>
              <Box
                className="grow text-center text-xs pr-7 px-4 ml-5 uppercase cursor-pointer"
                // onClick={() => {
                //   console.log(router.);
                //   if (//todo set
                //     post?.category?.name &&
                //     router. == '/posts?id=' + post?.id
                //   )
                //     router.push('/posts/' + post?.category?.name);
                // }}
              >
                {post?.category?.name}
              </Box>
              <Box className="grow min-w-fit border-slate-400 border-l-2">
                <Link
                  // href="#dribbble-shot"
                  // level="body3"
                  // underline="none"
                  // startDecorator={<Favorite />}
                  className="flex justify-end ml-2"
                  sx={{
                    fontWeight: 'md',
                    // display: 'flex',
                    ml: 'auto',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    onClick={addMyFavor}
                    sx={{ fontSize: '20px', marginRight: 1 }}
                  >
                    <SvgIcon
                      component={FavoriteIcon}
                      inheritViewBox
                      className="h-6 w-6"
                      sx={{
                        color:
                          post?.likes?.findIndex(
                            (l: any) =>
                              l.createdById == new User(session?.user).id
                          ) > -1
                            ? ''
                            : 'text.secondary',
                        cursor: 'pointer',
                        '&:hover': { color: 'text.secondary' },
                      }}
                    />
                  </Box>
                  {post?.likes?.length > 0 && (
                    <Typography className="" style={{ marginTop: '5px' }}>
                      {post?.likes?.length}
                    </Typography>
                  )}
                  <span style={{ marginRight: 30 }}></span>
                  {/* <Box
                  className="ml-1 -mt-1"
                  sx={{
                    fontSize: '20px',
                    color: 'text.secondary',
                    '&:hover': { color: 'error.dark' },
                  }}
                >
                  <IconButton aria-label="share ">
                    <ShareIcon />
                  </IconButton>
                </Box> */}
                  <Box
                    sx={{
                      fontSize: '20px',
                      transform: 'translateZ(0px)',
                      '&:hover': { backgroundColor: 'red' },
                    }}
                  >
                    <SpeedDial
                      ariaLabel="SpeedDial openIcon example"
                      sx={{
                        position: 'absolute',
                        bottom: -3,
                        right: 0,
                        '& .MuiFab-primary': {
                          '&:hover': {
                            backgroundColor: 'unset',
                            color: 'text.secondary',
                          },
                        },
                      }}
                      className="h-6 w-6 text.secondary mr-1"
                      icon={
                        <SpeedDialIcon
                          openIcon={<GridAddIcon color="success" />}
                          icon={<ShareIcon color="primary" />}
                        />
                      }
                      FabProps={{
                        color: 'secondary',
                        style: { backgroundColor: 'unset' },
                      }}
                    >
                      {actions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          className="bg-slate-400"
                          onClick={() => {
                            // if (
                            //   post?.image &&
                            //   post?.image?.split('post/').length == 1
                            // ) {
                            //   dp.image = post.image;
                            // }
                            // // dp.image = '#';
                            // dp.postId = post.id;
                            // dp.title = post.title + ' | Vajrapani Life ';
                            window.open(
                              action.url +
                                app_url +
                                'posts?id=' +
                                post.id +
                                (action.name == 'Twitter'
                                  ? `&text=${encodeURI('Vajrapani Life')}`
                                  : ''),
                              '_blank'
                            );
                          }}
                          FabProps={{
                            sx: {
                              margin: 0.1,
                              '&:hover': {
                                bgcolor: 'secondary.main',
                                color: 'primary.main',
                              },
                            },
                          }}
                        />
                      ))}
                    </SpeedDial>
                  </Box>
                </Link>
              </Box>
            </Box>
            <Divider />
            <Box className="border-slate-400 border-t  cursor-auto w-full h-full">
              <Typography gutterBottom variant="h6" className="text-center">
                {post?.title}
              </Typography>
              <Divider />
              <Card
                className="m-0 p-1 shadow-none ck ck-reset ck-editor ck-rounded-corners"
                sx={{ boxShadow: 'none', border: 'none', borderRadius: 0 }}
              >
                {/* bg-white" sx={{ color: 'initial' }} */}
                {post?.postContent?.content && isViewed && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        '<div class=" ck ck-content ">' +
                        post.postContent.content +
                        '</div>',
                    }}
                    className="ck ck-editor__main"
                    style={{ wordWrap: 'break-word', display: 'inline-block' }}
                  />
                )}
                {/* {parse(
                
              )} */}
              </Card>
            </Box>
          </CardContent>
          <Divider />
          {/* <CardActions> */}
          {/* <Typography component={'a'}>
              {' '}
              {'category: ' + post?.category?.name}
            </Typography> */}
          {/* </CardActions> */}
          <CardActions>
            <Stack direction="row" spacing={1} sx={{ display: 'inline' }}>
              Tags :
              {post?.tags?.map((t: any, i: number) => (
                <Chip
                  key={i}
                  label={t.name}
                  variant="outlined"
                  // onClick={handleClick}
                  size="small"
                  className="m-1 mx-3"
                />
              ))}
            </Stack>
          </CardActions>
          <Divider />
          <CardActions>
            <Box className="text-gray-400">
              {'Last Modified At : ' + lastModyfyAt}
            </Box>
          </CardActions>
        </Card>
        {/* <Box sx={{}} className="relative flex justify-center w-full ">
          <Author author={post.createdBy} />
        </Box> */}

        {/* ---------------------------------------------------- */}
        {!isViewOnly && (
          <Box className="m-2">
            <Typography className="py-4 mt-5 text-2xl ">
              Leave a Reply
            </Typography>
            <Box sx={{ maxWidth: 645, minHeight: 200 }} className=" mb-5">
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyItems: 'center',
                }}
              >
                {/* <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    required
                    id="standard-required"
                    label="Name"
                    // defaultValue="Hello World"
                    variant="standard"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                  <TextField
                    required
                    id="standard-required"
                    label="Email"
                    // defaultValue="Hello World"
                    variant="standard"
                  />
                </FormControl> */}
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                  <TextField
                    id="standard-multiline-flexible"
                    label="Message"
                    multiline
                    maxRows={4}
                    variant="standard"
                    inputRef={commentRef}
                  />
                </FormControl>
                {/* <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 5,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gilad}
                        onChange={handleChange}
                        name="gilad"
                      />
                    }
                    label="Save my name, email, and website in this browser for the next time I comment."
                  />
                </Box> */}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'end',
                    mt: 5,
                  }}
                >
                  <LoadingButton
                    size="small"
                    className="text-sm"
                    variant="outlined"
                    endIcon={<SendIcon />}
                    loading={loadingCo}
                    onClick={
                      status != 'authenticated'
                        ? handleLoginCardOpen
                        : (e) => sendComment(e, post.id)
                    }
                  >
                    Submit
                  </LoadingButton>
                  <LoginDialog
                    handleClose={handleLoginCardClose}
                    handleClickOpenReg={handleRegisterCardOpen}
                    open={loginCardOpen}
                  />
                  <RegisterDialog
                    handleClose={handleRegisterCardClose}
                    open={registerCardOpen}
                    handleClickOpenLog={handleLoginCardOpen}
                  />
                </Box>
              </Box>
            </Box>
            <Divider className=" mr-5" />
          </Box>
        )}
        {/*  */}
        {/* ---------------------------------------------------- */}
      </CardContent>
      <Box
        sx={{ marginTop: 5 }}
        className="relative flex justify-center w-full"
      >
        {/* {JSON.stringify(selectedPost?.comments)}
          {JSON.stringify(post?.comments)} */}
        <Comments cmns={post?.comments} deleteComt={deleteComt} />
      </Box>
    </Card>
  );
}
