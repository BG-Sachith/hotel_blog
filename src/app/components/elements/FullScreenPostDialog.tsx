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
import React, { lazy, useCallback, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DropDownMultiselect from './DropDownMultiselect';
import DropDownDefault from './DropDownDefault';
import { findPost } from '@/service/post/postService';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import { getImgByName } from '@/service/aws/awsService';
import { DEFAULT_IMG } from '@/util/const';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PostCategory } from '@/src/modules/postCategory';
import { PostTag } from '@/src/modules/postTag';
import { RootState } from '@/src/provider/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/src/provider/redux/features/ToggleTheme';
import { PostContentVM, PostVM } from '@/src/modules/PostVm';
import { setSelectedPost } from '@/src/provider/redux/features/SelectedItem';

// const CardPost = dynamic(() => import('../post/CardPost'));
const PostCardView = dynamic(() => import('../post/view/PostView'));
const CardPost = lazy(() => wait(1000).then(() => import('../post/CardPost')));

function wait(time: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

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

// const categories = [
//   { id: 1, name: 'Fruits', active: true },
//   { id: 2, name: 'Flowre', active: true },
// ];

export default function FullScreenPostDialog({
  open,
  setOpen,
  updateMe,
  updateStatus,
}: any) {
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const { selectedPost }: any = useSelector(
    (state: RootState) => state.selectedItem
  );
  const colorMode = useSelector((state: RootState) => state.toggleTheme.theme);
  const { isEdidMode, openDrwAdm, hideMe }: any = useSelector(
    (state: RootState) => state.settings
  );
  const { navCategories, navSearchValue, tags }: any = useSelector(
    (state: RootState) => state.navData
  );
  const { data: session } = useSession();
  const [value, setValue] = useState(0);
  // const [content, setContent] = useState();
  const [selectedImage, setSelectedImage] = useState(selectedPost.publicUrl);
  const [isViewed, setIsViewed] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [postCnt, setPostCnt] = useState<PostContentVM>(
    new PostContentVM(selectedPost.postContent)
  );
  const [category, setCategory] = useState<any>(selectedPost.category?.id);
  const [selectedTags, setSelectedTags] = useState<string[] | PostTag[]>(
    selectedPost?.tags ? selectedPost?.tags.map((t: any) => t.name) : []
  );

  const MyCKeditor = dynamic(() => import('../../components/ckeditor/Editor'), {
    ssr: false,
  });
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [isImageChange, setIsImageChange] = useState<boolean>(false);
  const [ed, setEd] = useState<any>('');

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const theme = useTheme();
  const matches_md_up = useMediaQuery(theme.breakpoints.up('md'));
  const [publishAt, setPublishAt] = React.useState<Dayjs | null>(
    selectedPost?.publishAt ? dayjs(selectedPost.publishAt) : null
  );
  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size > 1572864) {
        //2e6
        setSnackbar({
          children: 'Please upload a file smaller than 1.5 MB',
          severity: 'warning',
        });
        return;
      }
      setSelectedImage((pr: any) => e.target.files[0]);
      dispatch(
        setSelectedPost({
          ...selectedPost,
          image: URL.createObjectURL(e.target.files[0]),
        })
      );
      setIsImageChange((pr) => true);
      // selectedPost.image = ;
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  // const removeSelectedImage = () => {
  //   setSelectedImage(undefined);
  // };

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const selectCategory = (event: any) => {
    event.preventDefault();
    // console.log(event.target.value);
    setCategory((pr: any) => event.target.value);
  };

  // useEffect(() => {
  //   if (selectedPost?.tag) setSelectedTags(selectedPost?.tag);
  // }, [selectedPost]);
  const setPgViewed = useCallback(() => {
    setIsViewed(true);
  }, []);

  useEffect(() => {
    if (open) {
      setEditorLoaded(false);
      // console.log(selectedPost);
      // console.log(open);
      // if (selectedPost?.image) setSelectedImage((s) => selectedPost.image);
      if (selectedPost?.id && open) {
        findPost(selectedPost.id)
          .then((v_) => {
            let v = { ...v_ };
            if (v.data) dispatch(setSelectedPost(v.data));
            // console.log(v);
            if (v?.data?.publicUrl)
              setSelectedImage((s: any) => v?.data?.publicUrl);
            // dispatch(
            //   setSelectedPost({ ...selectedPost, image: r.fileRes })
            // );
            // if (v.data?.image && v.data?.image?.split('post/').length > 1) {
            //   // console.log(selectedPost);
            //   getImgByName(v.data?.image?.split('post/')[1], session).then(
            //     (r) => {
            //       if (r?.fileRes) {
            //         // selectedPost.image = r.fileRes;
            //         // console.log(selectedPost.image);
            //         if (r?.fileRes) setSelectedImage((s: any) => r.fileRes);
            //         dispatch(
            //           setSelectedPost({ ...selectedPost, image: r.fileRes })
            //         );
            //       } else v.data.image = DEFAULT_IMG;
            //     }
            //   );
            // }
            // console.log(v);
            if (v.data) {
              if (v.data?.tags)
                setSelectedTags((p: any) =>
                  v.data?.tags.map((t: any) => t.name)
                );
              if (v.data?.category?.id) {
                setCategory((p: any) => v.data?.category?.id);
              }
              setPostCnt((p: any) => v.data?.postContent);
            }
            setEditorLoaded(true);
          })
          .catch((e) => {
            console.log(e);
          });
        // findPostContent(selectedPost.id).then((v_: PostContent) => {
        //   if (v_) {
        //     let pst: any = JSON.parse(JSON.stringify(v_));
        //     setSelectedPost((pr: any) => {
        //       return { ...pr, postContent: [pst] };
        //     });
        //   }
        // });
        let t = setTimeout(() => {
          setEditorLoaded(true);
          clearTimeout(t);
        }, 3000);
      } else {
        let t = setTimeout(() => {
          setEditorLoaded(true);
          clearTimeout(t);
        }, 3000);
      }
    }
    () => dispatch(setSelectedPost({ ...new PostVM({}) }));
  }, [open]);

  useEffect(() => {
    // console.log(selectedPost);
    if (editorLoaded)
      dispatch(setSelectedPost({ ...selectedPost, postContent: postCnt }));
  }, [postCnt?.content]);

  useEffect(() => {
    if (editorLoaded) {
      let match = {};
      let ct = navCategories.find((c: PostCategory) => c.id == category);
      if (ct) match = { category: ct };
      let tg = tags
        .filter(
          (t: PostTag) => selectedTags.findIndex((tt) => tt == t.name) > -1
        )
        .map((t: any) => t.id);
      if (tg) {
        match = { tags: tg, ...match };
      }
      dispatch(setSelectedPost({ ...selectedPost, ...match }));
    }
    // console.log(category);
  }, [selectedTags, category]);

  const saveData = async () => {
    let data = { ...selectedPost };
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
      if (selectedPost.publishAt == null) {
        data = {
          ...data,
          publishAt: dayjs(new Date()).format('YYYY-MM-DD'),
        };
      }
      data = { ...data, selectedImage: selectedImage };
      await updateMe(data, selectedImage);
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (editorLoaded && value == 0) {
      let t = setTimeout(async () => {
        await setEd(
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
            initialdata={postCnt?.content ?? ''}
          />
        );
        setDataLoading(false);
        clearTimeout(t);
      }, 500);
    }
  }, [editorLoaded, value]);

  return (
    <>
      <Box>
        {open ? (
          <Dialog
            fullScreen
            open={open}
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
                  {selectedPost?.id ? 'Update Post' : 'New Post'}
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

                {selectedPost?.id &&
                  (matches_md_up ? (
                    <Button
                      size="small"
                      autoFocus
                      color="inherit"
                      onClick={() =>
                        updateStatus(selectedPost.id, !selectedPost.published)
                      }
                    >
                      {selectedPost.published ? (
                        <PublicOffIcon fontSize="small" />
                      ) : (
                        <PublicIcon fontSize="small" />
                      )}
                      {selectedPost.published ? 'Unpublis' : 'Publish'}
                    </Button>
                  ) : (
                    <Box
                      onClick={() =>
                        updateStatus(selectedPost.id, !selectedPost.published)
                      }
                    >
                      {' '}
                      {selectedPost.published ? (
                        <PublicOffIcon fontSize="small" className="mx-2" />
                      ) : (
                        <PublicIcon fontSize="small" className="mx-2" />
                      )}
                    </Box>
                  ))}
                {matches_md_up ? (
                  <Button
                    autoFocus
                    size="small"
                    color="inherit"
                    onClick={async (e) => {
                      e.preventDefault();
                      saveData();
                    }}
                    className="ml-2"
                  >
                    <SaveTwoToneIcon fontSize="small" />{' '}
                    {matches_md_up && 'Save'}
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
                <Tooltip title="Theme" sx={{ display: 'none' }}>
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

            <Container
              maxWidth="xl"
              className="flex justify-center py-10 mb-20"
            >
              {dataLoading && (
                <Backdrop
                  sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }} //(theme) => theme.zIndex.drawer + 1
                  open={dataLoading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
              <Backdrop
                sx={{
                  color: '#fff',
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={(!editorLoaded && open) || isSaving}
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
                      {selectedPost?.publicUrl && !isImageChange ? (
                        <ImageSrc
                          style={{
                            backgroundImage: `url(${selectedPost.publicUrl})`,
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
                    {editorLoaded && (
                      <Box className="flex flex-col">
                        <DropDownMultiselect
                          names={tags?.map((t: any) => new PostTag(t).name)}
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
                          {/* <DemoContainer components={['DatePicker']}> */}
                          <DatePicker
                            label="Publish At"
                            value={publishAt}
                            onChange={(newValue: any) => {
                              setPublishAt(newValue);
                              selectedPost.publishAt = dayjs(
                                newValue.$d
                              ).format('YYYY-MM-DD');
                            }}
                            format="YYYY-MM-DD"
                            sx={{ margin: '8px' }}
                            // className="p-1 m-2"
                          />
                          {/* </DemoContainer> */}
                        </LocalizationProvider>
                      </Box>
                    )}
                  </Box>

                  <Box className="flex flex-col w-full">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <TextField
                        id="standard-multiline-flexible"
                        label="Title"
                        multiline={false}
                        // maxRows={4}
                        required
                        variant="standard"
                        defaultValue={selectedPost?.title}
                        onChange={(e) => {
                          e.preventDefault();
                          // console.log(e.target.value);
                          dispatch(
                            setSelectedPost({
                              ...selectedPost,
                              ...{ title: e.target.value },
                            })
                          );
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <TextField
                        id="standard-multiline-static"
                        label="Summery"
                        multiline
                        // maxRows={4}
                        required
                        variant="standard"
                        defaultValue={selectedPost?.summary}
                        onChange={(e) => {
                          // console.log(c);
                          e.preventDefault();
                          dispatch(
                            setSelectedPost({
                              ...selectedPost,
                              ...{ summary: e.target.value },
                            })
                          );
                        }}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        m: 1,
                        maxWidth: '1000px',
                        '.ck-editor__editable': {
                          backgroundColor: 'inherit !important',
                        },
                      }}
                      variant="standard"
                    >
                      Content
                      {editorLoaded && (
                        <Box className="ml-0 m-5 edit">{ed}</Box>
                      )}
                      {/* <TextField
                    id="standard-multiline-flexible"
                    label="Content"
                    multiline
                    maxRows={8}
                    variant="standard"
                    defaultValue={postCnt}
                    onChange={(e) => {
                      e.preventDefault();
                      setPostCnt((p) => e.target.value);
                    }}
                  /> */}
                    </FormControl>
                    <Typography>
                      {/* {selectedPost?.title} <br />
                  {selectedPost?.postContents[0].content}
                  {postCnt} */}
                      <br />
                    </Typography>
                    <Typography>
                      {/* {JSON.stringify(selectedPost)} */}
                      <br />
                    </Typography>
                    <Typography>
                      {/* {JSON.stringify(selectedPost?.category) + '   test'} */}
                      {/* {JSON.stringify(category) + '   test2'} */}
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
                              tags: tags,
                              categories: categories,
                            }}
                          > */}
                          <PostCardView
                            isViewOnly={true}
                            handleClickOpen={() => {}}
                            loadingU={false}
                            openUpdateDialog={() => {}}
                            setOpenUpdateDialog={() => {}}
                            updateMe={() => {}}
                            updateStatus={() => {}}
                            isViewed={isViewed}
                            setPgViewed={setPgViewed}
                            selectedPost={
                              isImageChange
                                ? {
                                    ...selectedPost,
                                    publicUrl: selectedPost.image,
                                  }
                                : selectedPost
                            }
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
                          p={
                            isImageChange
                              ? {
                                  ...selectedPost,
                                  publicUrl: selectedPost.image,
                                }
                              : selectedPost
                          }
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
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
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
    </>
  );
}
