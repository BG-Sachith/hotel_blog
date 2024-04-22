/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Link,
  IconButton,
  Input,
  SvgIcon,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Skeleton,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  AlertProps,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/system';
import ShareIcon from '@mui/icons-material/Share';
import { useSession } from 'next-auth/react';
import { createCommnt } from '@/service/commentService';
import LoadingButton from '@mui/lab/LoadingButton';
import { VariantType, enqueueSnackbar } from 'notistack';
import {
  deletePost,
  updatePost,
  updatePostStatus,
} from '@/service/post/postService';
import { dateFrom } from '@/util/dateTime';
import { GridAddIcon } from '@mui/x-data-grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Comment, Post } from '@/modules/post';
import { uploadImgForKey } from '@/service/aws/awsService';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
// import { dp } from '../Meta';
import dynamic from 'next/dist/shared/lib/dynamic';
import Image from 'next/image';
import { RootState } from '@/src/provider/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { createLike, deleteLike } from '@/src/service/likeService';
import { setPosts } from '@/src/provider/redux/features/Paginate';
import { setSelectedPost } from '@/src/provider/redux/features/SelectedItem';
import { PostVM } from '@/src/modules/PostVm';

const RegisterDialog = dynamic(() => import('../auth/RegisterDialog'), {
  ssr: false,
});

const LoginDialog = dynamic(() => import('../auth/LoginDialog'), {
  ssr: false,
});

const GroupButtonH = dynamic(() => import('../elements/GroupButtonH'));

// const FadeInSection = dynamic(() => import('../animation/FadeInSection'));
// const app_url = 'https://vajrapani-hotel-blog-git-beta-bg-sachith.vercel.app/'; // 'https://vajrapani-hotel-blog.vercel.app/';
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

export default function CardPost({ p, showEditBtn, isViewOnly }: any) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const { isEdidMode, openDrwAdm, hideMe }: any = useSelector(
    (state: RootState) => state.settings
  );

  const { posts }: any = useSelector((state: RootState) => state.paginate);

  const { selectedPost }: any = useSelector(
    (state: RootState) => state.selectedItem
  );

  const router = useRouter();
  const pathName = usePathname();
  // const [isVisible, setVisible] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [loadingU, setLoadingU] = useState(false);
  const [loadingCo, setLoadingCo] = useState(false);
  // const [post, setPost] = useState<Post>(p);
  const commentRef = useRef();
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [registerCardOpen, setRegisterCardOpen] = React.useState(false);
  const [loginCardOpen, setLoginCardOpen] = React.useState(false);
  const [isBackdrop, setIsBackdrop] = React.useState(false);
  const [myItem, setMyIem] = React.useState<any>(p);
  const [selectedPostImg, setSelectedPostImg] = useState<any>(p?.image || []);
  const [createdAt, setCreatedAt] = React.useState(p?.createdAt);
  const [app_url, setApp_url] = React.useState(
    'hhttps://www.vajrapanilife.com/'
  );

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const theme = useTheme();
  const matches_md_up = useMediaQuery(theme.breakpoints.up('md'));

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
  };

  const sendComment = async (e: any, id: any) => {
    e.preventDefault();
    let v: any = commentRef.current ? commentRef.current : null;

    if (v?.value && v.value.trim() != '') {
      const cm = new Comment({
        message: v?.value,
        postId: id,
        createdBy: session?.user?.email,
        modifiedBy: session?.user?.email,
        hide: false,
      });

      setLoadingCo(true);
      let c = await createCommnt(cm);
      console.log(c);
      // console.log(status);
      // setTimeout(() => {
      setLoadingCo(false);
      v.value = '';
      handleClickVariant('success', 'success!');
      // }, 1500);
    }
  };

  const deleteMe = (id: any) => {
    // console.log(id);
    setLoadingD(true);
    deletePost(id).then((r) => {
      if (r?.data == 'Deleted') {
        dispatch(setSelectedPost({ ...new PostVM({}) }));
        dispatch(setPosts([...posts.filter((p: any) => p.id != id)]));
      }
      setLoadingD(false);
    });
  };

  const updateMe = useCallback(async (data: any, selectedImage: any) => {
    // console.log(data);

    setSnackbar({ children: 'Please Select Tags', severity: 'warning' });
    if (!data?.tags || data?.tags?.length == 0) {
      handleClickVariant('warning', 'Please Select Tags!');
      // setSnackbar({ children: 'Please Select Tags', severity: 'warning' });
      return;
    }
    if (!data?.category) {
      handleClickVariant('warning', 'Please Select Category!');
      // setSnackbar({ children: 'Please Select Category', severity: 'warning' });
      return;
    }
    data = { ...data, image: '', publicUrl: '' }; //todo remove
    if (!data?.image && selectedImage) {
      //todo enable
      if (selectedImage?.type) {
        let name_ =
          selectedPostImg && selectedPostImg?.split('/')?.length > 1
            ? selectedPostImg?.split('/')[1]?.split('_post.')[0] +
              '_post.' +
              selectedImage.type.split('/')[1]
            : Date.now() + '_post.' + selectedImage.type.split('/')[1];
        const { fileRes } = await uploadImgForKey(
          name_,
          'post/',
          selectedImage
        );
        // console.log(fileRes);
        if (fileRes?.Key) {
          data.image = fileRes.Key;
          data.publicUrl = fileRes.Location;
        }
      } else data.image = selectedPostImg;
    } else {
      setSnackbar({ children: 'Please Select Image', severity: 'warning' });
      return;
    }
    // console.log(data);
    setLoadingU(true);
    // console.log(data);
    updatePost(data).then((d) => {
      // console.log(d);
      if (d.data) {
        console.log(d);
        if (selectedImage)
          d.data.image = selectedImage?.type
            ? URL.createObjectURL(selectedImage)
            : selectedImage;
        dispatch(setSelectedPost(d.data));
        setMyIem((i: any) => {
          return { ...i, ...d.data };
        });
        dispatch(
          setPosts([d.data, ...posts.filter((p: any) => p.id != data.id)])
        );
        setSnackbar({
          children: 'Successfully updated',
          severity: 'success',
        });
      } else {
        setSnackbar({ children: 'Fail', severity: 'error' });
      }
      setLoadingU(false);
      setOpenUpdateDialog(false);
    });
  }, []);

  const updateStatus = (id: any, stt: any) => {
    setLoadingU(true);
    updatePostStatus(id, stt).then((d) => {
      if (d.data) {
        // console.log(d);
        dispatch(setSelectedPost(d.data));
        setMyIem((i: any) => {
          return { ...i, ...d.data };
        });
        dispatch(
          setPosts(posts.filter((p: PostVM) => p?.published && p.id != id))
        );
        setSnackbar({
          children: 'Successfully updated',
          severity: 'success',
        });
      } else {
        setSnackbar({ children: 'Fail', severity: 'error' });
      }
      setLoadingU(false);
      // setOpenUpdateDialog(false);
    });

    // setTimeout(() => {}, 3000);
  };

  const handleClickOpen = async () => {
    if (p?.id) {
      // getPostById(selectedPost.id, session).then((p) => {
      //   // console.log(p);
      //   if (p)
      //     setSelectedPost((pr) => {
      //       return { ...pr, ...p };
      //     });
      //   setOpenUpdateDialog(true);
      //   // console.log(post);
      // });

      await dispatch(setSelectedPost({ ...new PostVM(p) }));
      setOpenUpdateDialog(true);
    }
  };

  const addMyFavor = () => {
    if (myItem?.id && session?.user?.email) {
      if (
        myItem?.likes &&
        myItem?.likes?.findIndex((l: any) => l == session?.user?.email) > -1
      ) {
        deleteLike(myItem.id).then((p) => {
          // console.log(p);
          if (p)
            dispatch(
              setSelectedPost((pr: any) => {
                let l = pr.likes.filter((l: any) => l != session?.user?.email);
                return { ...pr, ...{ likes: l } };
              })
            );
          setMyIem((pr: any) => {
            let l = pr.likes.filter((l: any) => l != session?.user?.email);
            return { ...pr, ...{ likes: l } };
          });
          // console.log('post ddsds          ddddddddddddddddddd');
        });
      } else
        createLike(selectedPost.id).then((p) => {
          // console.log(p);
          if (p)
            dispatch(
              setSelectedPost((pr: any) => {
                let l = [...pr.likes, session?.user?.email];
                return { ...pr, ...{ likes: l } };
              })
            );
          setMyIem((pr: any) => {
            let l = [...pr.likes, session?.user?.email];
            return { ...pr, ...{ likes: l } };
          });
          // console.log(post);
        });
    } else {
      handleClickVariant('warning', 'Signin Required!');
    }
  };

  useEffect(() => {
    setApp_url((p) => window.location.host + '/');
    // console.log(app_url);
    // setCreatedAt(myItem?.createdAt ? dateFrom(myItem.createdAt) : '');
    // console.log(selectedPost);
    if (
      myItem?.image &&
      myItem?.image?.split('post/').length > 1 &&
      !myItem?.isImgData
    ) {
      setMyIem((pr: any) => {
        return { ...pr, isImgData: true };
      });
      setSelectedPostImg(myItem.image);
    }
  }, []);

  return (
    <Card
      // elevation={4}
      sx={(theme) => ({
        maxWidth: 'auto',
        boxShadow: 'none',
        border: 'none',
        borderRadius: 0,
        transition: 'transform 0.5s, border 0.3s',
        backgroundColor:
          theme.palette.mode !== 'light'
            ? 'rgb(16, 24, 48)'
            : theme.palette.primary + '',
        '&:hover': {
          borderColor: theme.palette.primary,
          transform: 'translateY(-3px) scale(1.03)',
        },
        '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
      })}
      className={`flex flex-col shadow-none rounded-none  ${
        matches_md_up ? 'h-full' : 'h-fit'
      }  shadow hover:shadow-sm`}
    >
      {isBackdrop && (
        <Backdrop
          sx={{ color: '#fff', zIndex: 1000 }} //(theme) => theme.zIndex.drawer + 1
          open={isBackdrop}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {isEdidMode && showEditBtn ? (
        <Box className="relative w-100 justify-end">
          <Box className=" absolute right-0 z-10">
            <GroupButtonH
              updateMe={updateMe}
              deleteMe={deleteMe}
              // id={post.id}
              // data={post}
              loadingD={loadingD}
              loadingU={loadingU}
              handleClickOpen={handleClickOpen}
              setOpen={setOpenUpdateDialog}
              open={openUpdateDialog}
              updateStatus={updateStatus}
            />
          </Box>
        </Box>
      ) : (
        <div></div>
      )}
      <CardActionArea
        sx={{
          boxShadow: 'initial',
          height: '260px',
          minHeight: matches_md_up ? '260px' : 'auto',
          overflowY: 'hidden',
        }}
        className="h-fit blur-load grid"
      >
        {isViewOnly ? (
          myItem?.image?.split('post/').length == 1 ? (
            <Image
              // loading="lazy"
              // component="img"
              height="2048"
              width="1536"
              className="h-full "
              priority={true}
              src={myItem.publicUrl}
              alt={myItem.title}
              style={{
                height: '100%',
                width: '100%',
                aspectRatio: '1/1',
                // objectFit: 'cover',
                objectPosition: 'center',
              }}
              placeholder="blur"
              blurDataURL="/images/blur/vg-hotel-d.jpg"
            />
          ) : (
            <Skeleton
              height="300px"
              width="100%"
              animation="wave"
              variant="rectangular"
              className="min-w-fit "
            />
          )
        ) : myItem?.publicUrl ? (
          // selectedPost?.image?.split('post/').length == 1 ? (
          // '/images/sld1.jpg'
          <Image
            // loading="lazy"
            // component="img"
            height="2048"
            width="1536"
            className="h-full"
            priority={true}
            src={myItem.publicUrl}
            alt={myItem.title}
            style={{
              height: '100%',
              width: '100%',
              aspectRatio: '1/1',
              // objectFit: 'cover',
              objectPosition: 'center',
            }}
            placeholder="blur"
            blurDataURL="/images/blur/vg-hotel-d.jpg"
            onClick={() => {
              if (!isViewOnly) {
                router.push(`/posts/${myItem.id}`, { scroll: true });
                setIsBackdrop(true);
              }
            }}
          />
        ) : (
          // </div>
          <Skeleton
            height="300px"
            width="100%"
            animation="wave"
            variant="rectangular"
            className="min-w-fit "
          />
          // <CardMedia
          //   component="img"
          //   height="140"
          //   src={DEFAULT_IMG}
          //   alt={selectedPost.title}
          //   onClick={() => {
          //     if (!isViewOnly)
          //       router.push({
          //         pathname: '/posts',
          //         query: { id: selectedPost.id },
          //       });
          //   }}
          // />
        )}
      </CardActionArea>
      <CardActionArea className=" w-full mt-2 " sx={{ py: 1 }} component="span">
        <Box
          className="flex items-center cursor-default  px-4"
          sx={{ width: '100%' }}
        >
          <Box className="grow min-w-fit">
            <Box className="flex justify-start">
              {myItem?.createdAt ? dateFrom(myItem.createdAt) : ''}
            </Box>
          </Box>
          <Box
            className="grow text-center border-slate-400 border-x-2 px-4 ml-1 text-xs  uppercase cursor-pointer w-25"
            onClick={() => {
              if (myItem?.category?.name && pathName == '/')
                router.push('/posts/' + myItem?.category?.name);
            }}
          >
            {myItem?.category?.name}
          </Box>
          <Box className="grow min-w-fit">
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
                      myItem?.likes?.findIndex(
                        (l: any) => l == session?.user?.email
                      ) > -1
                        ? ''
                        : 'text.secondary',
                    cursor: 'pointer',
                    '&:hover': { color: 'text.secondary' },
                  }}
                />
              </Box>
              {myItem?.likes?.length > 0 && (
                <Typography className=" ml-1" style={{ marginTop: '5px' }}>
                  {myItem?.likes?.length}
                </Typography>
              )}
              <span style={{ marginRight: 30 }}></span>
              <Box
                sx={{
                  fontSize: '20px',
                  transform: 'translateZ(0px)',
                  '&:hover': {},
                }}
              >
                <SpeedDial
                  ariaLabel="Share with social media"
                  id="so"
                  sx={{
                    position: 'absolute',
                    bottom: -3,
                    right: 0,
                    '& .MuiFab-primary, .MuiSpeedDial-fab': {
                      //   backgroundColor: 'unset !important',
                      '&:hover': {
                        backgroundColor: 'unset !important',
                        color: 'text.secondary !important',
                      },
                    },
                  }}
                  className="h-6 w-6 text.secondary"
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
                      id={action.name}
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={() => {
                        // if (
                        //   selectedPost?.image &&
                        //   selectedPost?.image?.split('post/').length == 1
                        // ) {
                        //   dp.image = selectedPost.image;
                        // }
                        // // dp.image = '#';
                        // dp.postId = selectedPost.id;
                        // dp.title = selectedPost.title + ' | Vajrapani Life ';
                        window.open(
                          action.url +
                            app_url +
                            'posts?id=' +
                            myItem.id +
                            (action.name == 'Twitter'
                              ? `&text=${encodeURI('Vajrapani Life')}`
                              : ''),
                          '_blank'
                        );
                      }}
                      className="bg-slate-400"
                      FabProps={{
                        sx: {
                          margin: 0.1,
                          '&:hover': {
                            bgcolor: 'secondary.main !important',
                            color: 'primary.main !important',
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
        {/* <Button size="small" color="primary"> */}

        {/* </Button> */}
      </CardActionArea>
      <CardContent className="border-slate-400 border-t cursor-auto w-full h-full px-2 text-center">
        <Typography variant="h6">{myItem?.title}</Typography>
        <Box color="text.secondary" className="text-sm">
          {myItem.summary && myItem?.summary.substring(0, 200) + '... '}
          <Box color="text.primary" className="cursor-pointer">
            <Typography
              className="underline decoration-sky-500/[.33] text-sm"
              sx={{ color: 'info.main' }}
              onClick={() => {
                if (!isViewOnly) {
                  router.push(`/posts/${myItem.id}`, { scroll: true });
                  setIsBackdrop(true);
                }
              }}
            >
              Continue reading...
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions
        sx={{ p: '1', display: 'flex' }}
        className="self-center mb-2 text-xs"
      >
        {/* {Number(selectedPost.id) % 2 == 0 && ( */}
        <IconButton
          size="small"
          sx={{ ml: -1 }}
          type="button"
          aria-label="comment"
        >
          <InsertCommentIcon />
        </IconButton>
        {/* )} */}
        <Input
          // variant="plain"
          // size="sm"
          disabled={isViewOnly}
          multiline
          placeholder="Add a comment…"
          sx={{
            flexGrow: 1,
            mr: 1,
            '--Input-focusedThickness': '0px',
            fontSize: '12px',
          }}
          inputRef={commentRef}
          fullWidth
        />
        <LoadingButton
          className="px-5 text-xs"
          size="small"
          type="button"
          variant="outlined"
          endIcon={<SendIcon />}
          disabled={isViewOnly}
          loading={loadingCo}
          sx={{ fontSize: '10px !important' }}
          onClick={
            status != 'authenticated'
              ? handleLoginCardOpen
              : (e) => sendComment(e, myItem.id)
          }
        >
          Send
        </LoadingButton>
        {loginCardOpen ? (
          <LoginDialog
            handleClose={handleLoginCardClose}
            handleClickOpenReg={handleRegisterCardOpen}
            open={loginCardOpen}
          />
        ) : (
          <div></div>
        )}
        {registerCardOpen ? (
          <RegisterDialog
            handleClose={handleRegisterCardClose}
            open={registerCardOpen}
            handleClickOpenLog={handleLoginCardOpen}
          />
        ) : (
          <div></div>
        )}
        {/* <Link role="button">Post</Link> */}
      </CardActions>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
          sx={{ top: '68px !important', zIndex: '500000 !important' }}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Card>
  );
}
