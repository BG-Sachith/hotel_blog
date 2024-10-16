import { PhotoCamera } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  ButtonGroup,
  Button,
  Typography,
  IconButton,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CardActionArea,
  useMediaQuery,
  AlertProps,
  Container,
  Snackbar,
  Alert,
  styled,
  useTheme,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { updateListSwiper, updateSwiperSatatus } from '@/service/swiperService';
import { getImgByName, uploadImg } from '@/service/aws/awsService';
import SortableList from '../../swiper/sortableList';
const OneLove = [
  { src: '/images/sld1.jpg', order: 1, id: null, active: true, title: 't' },
  { src: '/images/sld2.jpg', order: 2, id: 2, active: true, title: 't' },
  { src: '/images/sld3.jpg', order: 3, id: 3, active: true, title: 't' },
  { src: '/images/sld4.jpg', order: 4, id: 4, active: true, title: 't' },
  // { src: '/images/sld5.jpeg', order: 5, id: 5, active: true, title: 't' },
  // { src: '/images/sld6.jpeg', order: 6, id: 6, active: true, title: 't' },
];

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

const SelectedItem = ({
  data,
  index,
  active,
  matches_xs_up,
  matches_sm_down,
  matches_sm_up,
  matches_md_down,
  matches_lg_up,
  matches_md_up,
  checked,
  handleChange,
  handleupdate,
  imageChange,
}: any) => (
  <Card className="swiper-zoom-container p-0">
    <CardContent
      className={`song swiper-zoom-container p-0 ${active ? 'is-active' : ''}`}
    >
      {data?.src && (
        <CardMedia
          component="img"
          sx={{
            maxWidth: '700px',
            minHeight:
              matches_xs_up && matches_sm_down
                ? '300px'
                : matches_sm_up && matches_md_down
                ? '380px'
                : !matches_lg_up && matches_md_up
                ? '380px'
                : '455px',
          }}
          image={data?.src} //URL.createObjectURL(data?.src)
          alt={data.title}
          // height="100%"
          // width={'100%'}
          className="w-full h-fit"
        />
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          variant="text"
          aria-label="text button group "
          className="flex-wrap"
        >
          <Button color="primary" aria-label="upload picture" component="label">
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
                onChange={(e) => {
                  e.preventDefault();
                  imageChange(e, data);
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton>
                {/* <ImageMarked className="MuiImageMarked-root" /> */}
              </Typography>
            </Image>
            {/* <PhotoCamera /> */}
          </Button>
          <Button className="m-0 p-0"></Button>
          <Button focusRipple={false}>
            <TextField
              id="standard-helperText"
              label="Title"
              variant="standard"
              defaultValue={data?.title}
              // size="small"
              onChange={(e) => {
                e.preventDefault();
                data.title = e.target.value;
              }}
              sx={{ '.MuiInputLabel-root': { fontSize: '12px !important' } }}
            />
          </Button>

          <Button
            variant="outlined"
            size="small"
            sx={{ maxHeight: 30 }}
            className=" mx-2 self-center "
            disabled={data?.tight && data.tight != ''}
            onClick={(e) => {
              e.preventDefault();
              handleupdate(data);
            }}
          >
            {data?.id ? 'Update' : 'Save'}
          </Button>
          <FormGroup className="mx-5 self-center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Active"
            />
          </FormGroup>
        </ButtonGroup>
      </Box>
    </CardContent>
  </Card>
);

const ListItem = ({
  data,
  index,
  active,
  matches_xs_up,
  matches_sm_down,
  matches_sm_up,
  matches_md_down,
  matches_lg_up,
  matches_md_up,
}: any) => (
  <Box className={`  song   ${active ? 'is-active' : ''}`} key={index}>
    <div className="flex flex-row gap-3">
      {/* <Box className="song_id flex-none w-1">{index + 1}</Box> */}
      <Box className="song_id flex-none w-1">{data.order}</Box>
      <CardActionArea className=" flex-auto " sx={{ width: '150px' }}>
        {data?.src && (
          <CardMedia
            component="img"
            sx={{
              width: '150px',
              height: '80px',
            }}
            image={data?.src} //URL.createObjectURL(data?.src)
            alt={data.title}
            // height="100%"
            // width={'100%'}
            className="flex-auto"
          />
        )}
      </CardActionArea>
    </div>
  </Box>
  // <div className={`song ${active ? 'is-active' : ''}`}>
  //   <div className="song_id">{index + 1}</div>
  //   <div className="song__content">
  //     <div className="song__title">{data.title}</div>
  //     <div className="song__artist">{data.artist}</div>
  //   </div>
  //   <div className="song__duration">{data.duration}</div>
  //   <div className="song__duration">{data.order}</div>
  // </div>
);
export default function SlidePage() {
  const [data, setData] = useState(OneLove);
  const [selectedImg, setSelectedImg] = useState<any>(data[0]);
  const theme = useTheme();
  const { data: session } = useSession();
  const matches_xs_up = useMediaQuery(theme.breakpoints.up('xs'));
  const matches_sm_up = useMediaQuery(theme.breakpoints.up('sm'));
  const matches_sm_down = useMediaQuery(theme.breakpoints.down('sm'));
  const matches_md_up = useMediaQuery(theme.breakpoints.up('md'));
  const matches_md_down = useMediaQuery(theme.breakpoints.down('md'));
  const matches_lg_up = useMediaQuery(theme.breakpoints.up('lg'));

  const [selectedImage, setSelectedImage] = useState<any>();

  const [checked, setChecked] = React.useState(true);

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const handleupdate2 = (item: any) => {
    let signal = new AbortController();
    uploadImg('tst', '/', selectedImage, session, signal.signal)
      .then((d) => {
        console.log(d);
        // setData((pr) => {
        //   return [...pr, d];
        // });
        setSnackbar({
          children: 'Successfully added',
          severity: 'success',
        });
        signal.abort();
      })
      .catch((er) => {
        console.log(er);
        setSnackbar({
          children: 'Fail',
          severity: 'warning',
        });
        signal.abort();
      });
  };

  // const handleupdate = (item) => {
  //   item.modfiedAt = new Date();
  //   item.modfiedBy = session?.user?.email;
  //   console.log(item);
  //   if (item.id)
  //     updateSwiper(item, session)
  //       .then(async (res: any) => {
  //         if (res.ok) {
  //           return await res.json();
  //         } else {
  //           res = await res.json();
  //           // console.log(res);
  //           throw Error(res?.error + '');
  //         }
  //       })
  //       .then((d) => {
  //         console.log(d);
  //         setSnackbar({
  //           children: 'Successfully updated',
  //           severity: 'success',
  //         });
  //       })
  //       .catch((er) => {
  //         console.log(er);
  //         setSnackbar({
  //           children: 'Fail',
  //           severity: 'warning',
  //         });
  //       });
  //   else {
  //     item.createdBy = session?.user?.email;
  //     addSwiper(item, session)
  //       // .then(async (res: any) => {
  //       //   if (res.ok) {
  //       //     console.log(res);
  //       //     return await res.json();
  //       //   } else {
  //       //     console.log(res);
  //       //     res = await res.json();
  //       //     throw Error(res?.error + '');
  //       //   }
  //       // })
  //       .then((d) => {
  //         console.log(d);
  //         setData((pr) => {
  //           return [...pr, d];
  //         });
  //         setSnackbar({
  //           children: 'Successfully added',
  //           severity: 'success',
  //         });
  //       })
  //       .catch((er) => {
  //         console.log(er);
  //         setSnackbar({
  //           children: 'Fail',
  //           severity: 'warning',
  //         });
  //       });
  //   }
  // };

  const handleupdateList = (list: any) => {
    if (list && list > 0) {
      list = list.map((item: any) => {
        item.modfiedAt = new Date();
        item.modfiedBy = session?.user?.email;
        return item;
      });
      updateListSwiper(list, session)
        .then(async (res: any) => {
          if (res.ok) {
            return await res.json();
          } else {
            res = await res.json();
            console.log(res);
            throw Error(res?.error + '');
          }
        })
        .then((d: any) => {
          console.log(d);
          setSnackbar({
            children: 'Successfully updated',
            severity: 'success',
          });
        })
        .catch((er: any) => {
          console.log(er);
          setSnackbar({
            children: 'Fail',
            severity: 'warning',
          });
        });
    }
  };

  const handleChangeStatus = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setChecked(event.target.checked);
    if (id) {
      const res = await updateSwiperSatatus(id, event.target.checked, session);
      console.log(res);
      if (res == 'Deleted') {
        setData((p) =>
          data.map((row) => {
            if (row.id !== id) {
              row.active = event.target.checked;
            }
            return row;
          })
        );
        setSnackbar({
          children: 'Successfully updated',
          severity: 'success',
        });
      } else {
        setSnackbar({
          children: 'Fail',
          severity: 'warning',
        });
      }
    }
  };

  const imageChange = async (e: any, item: any) => {
    if (e.target.files && e.target.files.length > 0) {
      // selectedPost.image = URL.createObjectURL(e.target.files[0]);
      const signal = new AbortController();
      const { fileRes } = await uploadImg(
        Date.now() + '_swiper.' + e.target.files[0].type.split('/')[1],
        'blog/',
        e.target.files[0],
        session,
        signal.signal
      );

      // console.log(e.target.files[0]);
      // const { fileRes } = await getImgByName(
      //   '1681011860313_swiper.png',
      //   session
      // );
      // setSelectedImage(fileRes);
      setSelectedImg((pr: any) => {
        return { ...pr, src: fileRes };
      });
      signal.abort();
      // console.log(e.target.files[0]);
      // item.src = URL.createObjectURL(e.target.files[0]);
      // console.log(fileRes);
    }
  };
  const handleupdate = async (item: any) => {
    console.log(item);
    const { fileRes } = await getImgByName('1681011860313_swiper.png', session);
    setSelectedImg((pr: any) => {
      return { ...pr, src: fileRes }; //URL.createObjectURL(fileRes)
    });
    console.log(fileRes);
  };

  useEffect(() => {
    // getImgByName('n', session).then((u) => {
    //   console.log(u);
    //   if (u?.signedURL)
    //     setSelectedImg({
    //       src: u.signedURL,
    //       order: 1,
    //       id: null,
    //       active: true,
    //       title: 't',
    //     });
    // });
  }, []);
  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
        zIndex: '2',
        minHeight: '1200px',
        marginTop: { xs: '45px !important', lg: '45px !important' },
      }}
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
          className={'main pl-0 pr-0 max-w-screen-xl h-screen'}
        >
          <Box className={'animated animatedFadeInUp fadeInUp pt-10'}>
            <Box className={`mt-5 grid justify-items-center`}>
              Welcome 862 367 sm 863 575
            </Box>
          </Box>
          <div className="flex flex-wrap">
            <div className="album flex-auto">
              <SelectedItem
                data={selectedImg}
                index={selectedImg?.order}
                active={selectedImg?.order}
                matches_lg_up={matches_lg_up}
                matches_xs_up={matches_xs_up}
                matches_md_down={matches_md_down}
                matches_md_up={matches_md_up}
                matches_sm_down={matches_sm_down}
                matches_sm_up={matches_sm_up}
                checked={checked}
                handleChange={handleChangeStatus}
                handleupdate={handleupdate}
                imageChange={imageChange}
              />
            </div>
            <SortableList
              data={data}
              handleupdateList={handleupdateList}
              renderItem={(item: any, index: any, active: any) => (
                <ListItem
                  data={item}
                  index={index}
                  active={active}
                  matches_lg_up={matches_lg_up}
                  matches_xs_up={matches_xs_up}
                  matches_md_down={matches_md_down}
                  matches_md_up={matches_md_up}
                  matches_sm_down={matches_sm_down}
                  matches_sm_up={matches_sm_up}
                />
              )}
              keyExtractor={(item: any) => item.id}
              onReorder={(ordered: any) => setData(ordered)}
              separator={<div className="separator" />}
              setSelectedImg={setSelectedImg}
            />
          </div>
        </Container>
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </CardContent>
    </Card>
  );
}
