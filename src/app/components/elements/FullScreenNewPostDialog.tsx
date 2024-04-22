'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Slide,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tab,
  Tabs,
  Box,
  ButtonBase,
  styled,
  Container,
  TextField,
  FormControl,
  Card,
  Tooltip,
  useMediaQuery,
  useTheme,
  AlertProps,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { TransitionProps } from '@mui/material/transitions';
import React, { useCallback, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CardPost from '../post/CardPost';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DropDownMultiselect from './DropDownMultiselect';
import DropDownDefault from './DropDownDefault';
import PostCardView from '../post/view/PostView';
import dynamic from 'next/dynamic';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PostCategory } from '@/src/modules/postCategory';
import { PostTag } from '@/src/modules/postTag';
import { RootState } from '@/src/provider/redux/store';
import { Post, Tag } from '@prisma/client';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/src/provider/redux/features/ToggleTheme';
import {
  setNewPost,
  toggleNewPage,
} from '@/src/provider/redux/features/PostManage';
import { PostContentVM } from '@/src/modules/PostVm';
import { createPost, updatePostStatus } from '@/src/service/post/postService';
import {
  setPageLoading,
  setPosts,
} from '@/src/provider/redux/features/Paginate';
import { uploadImgForKey } from '@/src/service/aws/awsService';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: '20rem',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 150,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function FullScreenNewPostDialog({ button }: any) {
  const dispatch = useDispatch();
  const colorMode = useSelector((state: RootState) => state.toggleTheme.theme);
  const { isEdidMode, openDrwAdm, hideMe }: any = useSelector(
    (state: RootState) => state.settings
  );
  const { navCategories, navSearchValue, tags }: any = useSelector(
    (state: RootState) => state.navData
  );
  const { newPost, editPost, newPostIsOpen, editPostIsOpen }: any = useSelector(
    (state: RootState) => state.postManage
  );
  const { posts }: any = useSelector((state: RootState) => state.paginate);
  const [value, setValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState<any>();

  const [postCnt, setPostCnt] = useState<PostContentVM>({
    ...new PostContentVM(newPost.postContent),
  });
  const [isViewed, setIsViewed] = useState(false);
  const [category, setCategory] = React.useState(
    newPost?.category?.id
      ? newPost?.category?.id
      : navCategories?.length
      ? new PostCategory(navCategories[0]).id
      : ''
  );
  const [selectedTags, setSelectedTags] = useState<string[] | PostTag[]>(
    newPost?.tag
      ? tags
          .filter((t: any) => newPost.tag.includes(t.id))
          .map((t: any) => t.name)
      : []
  );

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const MyCKeditor = dynamic(
    () => import('../../components/ckeditor/Editor.jsx'),
    {
      ssr: false,
    }
  );
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  // const [data, setData] = useState<string>('');
  const [ed, setEd] = useState<any>('');
  const theme = useTheme();
  const matches_md_up = useMediaQuery(theme.breakpoints.up('md'));
  const [publishAt, setPublishAt] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );

  const handleClose = () => {
    dispatch(toggleNewPage(false));
  };

  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size > 1572864) {
        setSnackbar({
          children: 'Please upload a file smaller than 1.5 MB',
          severity: 'warning',
        });
        return;
      }
      setSelectedImage(e.target.files[0]);
      let img = URL.createObjectURL(e.target.files[0]);
      dispatch(
        setNewPost({
          ...newPost,
          image: img,
        })
      );
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const selectCategory = (event: any) => {
    setCategory(event.target.value);
  };

  const setPgViewed = useCallback(() => {
    setIsViewed(true);
  }, []);

  useEffect(() => {
    let match = {};
    let ct = navCategories.find((c: PostCategory) => c.id == category);
    if (ct) match = { category: ct };
    let tg = tags
      .filter((t: PostTag) => selectedTags.findIndex((tt) => tt == t.name) > -1)
      .map((t: any) => t.id);
    if (tg) {
      match = { tags: tg, ...match };
    }
    dispatch(setNewPost({ ...newPost, ...match }));
    setEditorLoaded(true);
  }, [selectedTags, category]);

  useEffect(() => {
    // let co: any = newPost.postContent?
    // .map((c: PostContent) => {
    //   if (c.language == 'en') {
    //     c.content = postCnt;
    //     return c;
    //   } else return c;
    // });
    // if (co == undefined) co = [{}];
    // console.log(selectedPost);
    if (editorLoaded)
      dispatch(setNewPost({ ...newPost, ...{ postContent: postCnt } }));
  }, [postCnt?.content]);

  useEffect(() => {
    if (editorLoaded && value == 0) {
      let t = setTimeout(() => {
        setEd(
          <MyCKeditor
            // name="description"
            onChange={(data: string) => {
              if (data && data.length > 2097152) {
                setSnackbar({
                  children: 'Content larger than 2 MB',
                  severity: 'warning',
                });
              }
              setPostCnt((c: any) => {
                return { ...c, content: data };
              });
            }}
            editorLoaded={editorLoaded}
            initialdata={postCnt.content ?? ''}
          />
        );
        clearTimeout(t);
      }, 500);
    }
  }, [editorLoaded, value]);

  const saveData = async () => {
    let data = { ...newPost };
    if (postCnt?.content && postCnt.content?.length > 2097152) {
      setSnackbar({
        children: 'Content larger than 2 MB',
        severity: 'warning',
      });
      return;
    } else {
      setIsSaving(true);
      let ct: any = navCategories.find(
        (t: PostCategory) => category + '' == t.id + ''
      );
      if (ct) {
        data = { ...data, category: ct, categoryId: ct.id };
      } else {
        setSnackbar({
          children: 'Please Select Category',
          severity: 'warning',
        });
        setIsSaving((p: boolean) => false);
        return;
      }
      let tg = tags
        .filter(
          (t: PostTag) => selectedTags.findIndex((tt) => tt == t.name) > -1
        )
        .map((t: PostTag) => t.id);
      if (tg) {
        data = { ...data, tags: tg };
      } else {
        setSnackbar({
          children: 'Please Select Tags',
          severity: 'warning',
        });
        setIsSaving((p: boolean) => false);
        return;
      }
      data = { ...data, image: null };
      if (newPost.publishAt == null) {
        data = {
          ...data,
          publishAt: dayjs(new Date()).format('YYYY-MM-DD'),
        };
      }
      try {
        await saveNewPage(data, selectedImage);
      } catch (error) {
        console.log(error);
      }
      setIsSaving(false);
    }
  };

  const saveNewPage = useCallback(async (data: any, selectedImage: any) => {
    await saveMe(data, selectedImage);
  }, []);

  const saveMe = async (data: any, selectedImage: any) => {
    // console.log(await data);
    // console.log(await newPost);
    // console.log(selectedImage);
    // console.log(selectedImage);
    if (!data?.tags || data?.tags?.length == 0) {
      setSnackbar({ children: 'Please Select Tags', severity: 'warning' });
      return;
    }
    if (!data?.category) {
      setSnackbar({ children: 'Please Select Category', severity: 'warning' });
      return;
    }
    data = { ...data, image: '', publicUrl: '' }; //todo remove
    dispatch(
      setNewPost({
        ...data,
      })
    );
    // console.log(await newPost);
    if (selectedImage) {
      //todo enable
      const { fileRes } = await uploadImgForKey(
        Date.now() + 'test' + '_post.' + selectedImage.type.split('/')[1],
        'post/',
        selectedImage
      );
      // console.log(fileRes);
      if (fileRes?.Key) {
        data = { ...data, image: fileRes.Key, publicUrl: fileRes.Location };
      }
    } else {
      setSnackbar({ children: 'Please Select Image', severity: 'warning' });
      return;
    }
    createPost(data).then(async (d) => {
      if (d?.data?.id) {
        dispatch(setNewPost({ ...d.data, image: d.data?.publicUrl }));
        // setSelectedTags((r) => []);
        setSnackbar({
          children: 'Successfully saved',
          severity: 'success',
        });
      } else {
        setSnackbar({ children: 'Fail', severity: 'error' });
      }
    });
  };

  const updateStatus = (id: any, stt: any) => {
    updatePostStatus(id, stt).then((d: any) => {
      if (d.data) {
        dispatch(setPageLoading(false));
        dispatch(
          setPosts(posts.filter((p: Post) => p?.published && p.id != id))
        );
        dispatch(setNewPost({ ...newPost, ...d.data }));
        setSnackbar({
          children: 'Successfully updated',
          severity: 'success',
        });
      } else {
        setSnackbar({ children: 'Fail', severity: 'error' });
      }
    });
  };

  return (
    <Box>
      {button}
      {newPostIsOpen ? (
        <Dialog
          fullScreen
          open={newPostIsOpen}
          onClose={handleClose}
          TransitionComponent={Transition}
          disableEnforceFocus
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>

              <Typography
                sx={{ ml: 2, flex: 1, display: { xs: 'none', sm: 'block' } }}
                variant="h6"
                component="div"
              >
                {newPost?.id ? 'Update Post' : 'New Post'}
              </Typography>
              <Box className="grow flex justify-start">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  centered
                  textColor="inherit"
                  sx={{
                    // borderBottom: '1px solid #e8e8e8',
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'text.secondary',
                    },
                  }}
                  // indicatorColor="secondary"
                >
                  <Tab label="Edit" />
                  <Tab label="View" />
                </Tabs>
              </Box>

              {newPost?.id && (
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => updateStatus(newPost.id, !newPost.published)}
                >
                  {newPost.published ? 'Unpublis' : 'Publish'}
                </Button>
              )}
              {matches_md_up ? (
                <Button
                  autoFocus
                  color="inherit"
                  onClick={async (e) => {
                    e.preventDefault();
                    saveData();
                  }}
                  className="ml-2"
                >
                  <SaveTwoToneIcon /> {matches_md_up && 'Save'}
                </Button>
              ) : (
                <Box
                  onClick={async (e) => {
                    e.preventDefault();
                    saveData();
                  }}
                >
                  <SaveTwoToneIcon fontSize="small" className="mx-2" />
                </Box>
              )}
              <Tooltip title="Theme">
                <IconButton onClick={() => dispatch(toggleTheme(colorMode))}>
                  <WbSunnyTwoToneIcon
                    sx={(theme) => ({
                      display: theme.palette.mode === 'light' ? 'none' : '',
                    })}
                  />
                  <DarkModeTwoToneIcon
                    sx={(theme) => ({
                      display: theme.palette.mode === 'dark' ? 'none' : '',
                    })}
                  />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Container maxWidth="xl" className="flex justify-center py-10 mb-20">
            <Backdrop
              sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={(!editorLoaded && newPostIsOpen) || isSaving}
              // onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {value == 0 && (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    minWidth: 300,
                    width: '100%',
                  }}
                >
                  <ImageButton
                    focusRipple
                    key={'Upload'}
                    style={{
                      width: '600px',
                    }}
                  >
                    {newPost?.image ? (
                      <ImageSrc
                        style={{
                          backgroundImage: `url(${newPost.image})`,
                        }}
                      />
                    ) : (
                      selectedImage && (
                        <ImageSrc
                          style={{
                            backgroundImage: `url(${URL.createObjectURL(
                              selectedImage
                            )})`,
                          }}
                        />
                      )
                    )}
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image aria-label="upload picture">
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                          position: 'relative',
                          p: 4,
                          pt: 2,
                          pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                        onChange={imageChange}
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input hidden accept="image/*" type="file" />
                          <PhotoCamera />
                        </IconButton>
                        <ImageMarked className="MuiImageMarked-root" />
                      </Typography>
                    </Image>
                  </ImageButton>
                  <Box className="flex flex-col">
                    <DropDownMultiselect
                      names={tags?.map((t: Tag) => t.name)}
                      label={'Tags'}
                      selectedItems={selectedTags}
                      setSelectedItems={setSelectedTags}
                    />
                    <DropDownDefault
                      handleChange={selectCategory}
                      label={'Category'}
                      items={navCategories}
                      selectedItem={category}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Publish At"
                        value={publishAt}
                        onChange={(newValue: any) => {
                          // console.log(new Date(newValue.$d).toISOString());
                          setPublishAt(newValue);
                          dispatch(
                            setNewPost({
                              ...newPost,
                              publishAt: new Date(newValue.$d).toISOString(),
                              // dayjs(newValue.$d).format(
                              //   "YYYY-MM-DD'T'HH:mm:ss.SSS'Z'"
                              // ),
                            })
                          );
                        }}
                        format="YYYY-MM-DD"
                        sx={{ margin: '8px' }}
                        // className="p-1 m-2"
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>

                <Box className="flex flex-col w-full">
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <TextField
                      id="standard-multiline-flexible"
                      label="Title"
                      multiline
                      maxRows={4}
                      variant="standard"
                      defaultValue={newPost?.title}
                      onChange={(e) => {
                        e.preventDefault();
                        // console.log(e.target.value);
                        dispatch(
                          setNewPost({
                            ...newPost,
                            ...{ title: e.target.value },
                          })
                        );
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <TextField
                      id="standard-multiline-flexible"
                      label="Summery"
                      multiline
                      maxRows={4}
                      variant="standard"
                      defaultValue={newPost?.summary}
                      onChange={(e) => {
                        // console.log(c);
                        e.preventDefault();
                        dispatch(
                          setNewPost({
                            ...newPost,
                            ...{ summary: e.target.value },
                          })
                        );
                      }}
                    />
                  </FormControl>
                  <FormControl
                    fullWidth
                    sx={() => ({
                      m: 1,
                      '.ck-editor__editable': {
                        backgroundColor: 'inherit !important',
                      },
                    })}
                    variant="standard"
                  >
                    Content
                    {editorLoaded && <Box className="ml-0 m-5 edit">{ed}</Box>}
                    {/* {
                      <TextField
                        id="standard-multiline-flexible"
                        label="Content"
                        multiline
                        maxRows={8}
                        variant="standard"
                        defaultValue={postCnt}
                        onChange={(e) => {
                          e.preventDefault();
                          setPostCnt((pc: any) => e.target.value);
                        }}
                      />
                    } */}
                  </FormControl>
                  <Typography>
                    {/* {selectedPost?.title} */}
                    {/* {selectedPost?.summary} */}
                    <br />
                  </Typography>
                  <Typography>
                    {JSON.stringify(newPost)}
                    <br />
                  </Typography>
                  <Typography>
                    {/* {JSON.stringify(selectedPost?.category)} */}
                  </Typography>
                </Box>
              </Box>
            )}

            {value == 1 && (
              <>
                <Grid
                  container
                  sx={{ flexGrow: 1, gap: 1 }}
                  className="custom-card"
                >
                  <Grid sm={12} md={6} lg={7} className="custom-card">
                    <Card className="p-0 custom-card">
                      <Box className="block rounded p-3">
                        {/* <SelectedPostContext.Provider
                          value={{
                            selectedPost: selectedPost,
                            setSelectedPost: setSelectedPost,
                            categories: categories,
                            tags: tags,
                          }}
                        > */}
                        <PostCardView
                          isViewOnly={true}
                          updateMe={() => {}}
                          handleClickOpen={() => {}}
                          loadingU={() => {}}
                          openUpdateDialog={() => {}}
                          setOpenUpdateDialog={() => {}}
                          updateStatus={() => {}}
                          isViewed={isViewed}
                          setPgViewed={setPgViewed}
                          selectedPost={newPost}
                        ></PostCardView>
                        {/* </SelectedPostContext.Provider> */}
                      </Box>
                    </Card>
                  </Grid>
                  <Grid sm={12} md={4} lg={4} className="custom-card">
                    <Card
                      sx={{ maxWidth: '400px' }}
                      className=" ml-3 rounded  p-3"
                    >
                      <CardPost
                        p={newPost}
                        showEditBtn={false}
                        isViewOnly={true}
                        setPosts={[]}
                      ></CardPost>
                    </Card>
                  </Grid>
                </Grid>
              </>
            )}
          </Container>
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
        </Dialog>
      ) : (
        <></>
      )}
    </Box>
  );
}
