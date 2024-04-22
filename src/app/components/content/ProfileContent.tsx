import { PhotoCamera } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  CardContent,
  Container,
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
  TextField,
  Alert,
  CardActions,
  Button,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import {
  deleteProfile,
  findProfileByUserId,
  updateProfile,
} from '@/service/user/profileService';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '@/src/modules/user';

export default function ProfileContent() {
  const [selectedImage, setSelectedImage] = useState<any>();

  const [loading, setLoading] = React.useState(false);
  const [loadingP, setLoadingP] = React.useState(true);
  const [errorName, setErrorName] = React.useState(false);
  const [errorBio, setErrorBio] = React.useState(false);
  const [nameRef, setNameRef] = React.useState<any>();
  const [bioRef, setBioRef] = React.useState<any>();
  const [user, setUser] = React.useState<User>(new User({}));
  const { data: session } = useSession();

  const imageChange = async (e: any) => {
    if (e.target.files && e.target.files.length == 1) {
      let buffer: any = Buffer.from(await e.target.files[0].arrayBuffer());
      // buffer = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      buffer = btoa(
        new Uint8Array(buffer).reduce(function (data, byte) {
          return data + String.fromCharCode(byte);
        }, '')
      );
      buffer = `data:${e.target.files[0].type};base64,${buffer}`;
      // console.log(buffer);
      setSelectedImage(buffer);
      // selectedPost.image = null; //URL.createObjectURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    // console.log(session);
    if (session) {
      setUser((u) => new User(session?.user));
      findProfileByUserId(user.id).then((d: any) => {
        // console.log(d);
        if (d?.id) {
          setUser((pre) => new User(d));
          setSelectedImage((p: any) => d.image);
          setNameRef((p: any) => d.name);
          setBioRef((p: any) => d.bio);
          console.log(d);
          setLoadingP(false);
        }
      });
    }
  }, [session]);

  function updateMe_() {
    setLoading(true);
    let data: any = {
      ...user,
      name: nameRef,
      bio: bioRef,
      image: selectedImage,
    };
    updateProfile(data).then((d: any) => {
      if (d?.id) {
        setUser((pre) => new User(d));
        setNameRef((p: any) => d.name);
        setBioRef((p: any) => d.bio);
        console.log(d);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });
  }

  function deleteMe_() {
    deleteProfile(user.id).then(async (d: any) => {
      if (d?.id) {
        console.log(d);
      }
    });
  }
  return (
    <Card
      sx={{ width: '100%', position: 'relative' }}
      className="custom-card min-h-screen"
    >
      <CardContent className="custom-card">
        <Container
          sx={{
            marginTop: 15,
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
          className={'main'}
        >
          <Box className=" py-5 sm:py-10 w-full">
            <Box className="mx-auto max-w-7xl px-6 lg:px-8">
              <Box className="mx-auto max-w-2xl lg:text-center">
                <Typography className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
                  Profile Manage
                </Typography>
              </Box>
            </Box>
          </Box>
          {!loadingP && (
            <Card
              sx={{ minHeight: 350, marginBottom: 5 }}
              className="flex flex-col justify-center p-5"
            >
              <Stack direction="row" className="justify-center">
                <Avatar
                  alt="Remy Sharp"
                  src={selectedImage}
                  sx={{ width: 86, height: 86 }}
                />
              </Stack>
              <Stack direction="row" className="justify-center">
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  onChange={imageChange}
                  className="-mt-10 ml-20"
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera sx={{ width: 36, height: 36 }} />
                </IconButton>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ marginTop: '50px' }}>
                <Box
                  className="flex flex-col gap-10 mt-15"
                  sx={{ width: '800px' }}
                >
                  <Box>
                    <TextField
                      fullWidth
                      error={errorName}
                      id="standard-error"
                      label="Full Name"
                      defaultValue={nameRef}
                      variant="standard"
                      onChange={(e) => {
                        e.preventDefault();
                        setNameRef((p: any) => e.target.value);
                        setUser((p: any) => {
                          return { ...p, ...{ name: e.target.value } };
                        });
                        setErrorName(
                          (pr) =>
                            e.target.value == '' || e.target.value == undefined
                        );
                      }}
                    />
                  </Box>
                  {/* {nameRef} */}
                  <Box>
                    <TextField
                      fullWidth
                      error={errorBio}
                      id="standard-error"
                      label="Bio"
                      defaultValue={bioRef}
                      variant="standard"
                      onChange={(e) => {
                        e.preventDefault();
                        setBioRef((p: any) => e.target.value);
                        setUser((p: any) => {
                          return { ...p, ...{ bio: e.target.value } };
                        });
                        setErrorBio(
                          (pr) =>
                            e.target.value == '' || e.target.value == undefined
                        );
                      }}
                    />
                  </Box>
                  <Box></Box>
                </Box>
              </Stack>
              <Stack
                direction="row"
                className="justify-center "
                sx={{ marginTop: '30px' }}
              >
                <LoadingButton
                  size="small"
                  color="secondary"
                  onClick={updateMe_}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  <span>Save</span>
                </LoadingButton>
              </Stack>
              {loading && <Alert severity="success">Updating!</Alert>}
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={deleteMe_}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          )}
        </Container>
      </CardContent>
    </Card>
  );
}
