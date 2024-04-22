'use client';
import { styled } from '@mui/material/styles';
import {
  DialogTitle,
  Button,
  DialogContent,
  Typography,
  DialogActions,
  Paper,
  PaperProps,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { VariantType, enqueueSnackbar } from 'notistack';
import Draggable from 'react-draggable';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { registerValidate } from '../../../util/validate';
import { createUser } from '@/src/service/user/userService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props: any) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <Box sx={{ textAlign: 'center' }}>{children}</Box>

      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function PaperComponent(props: PaperProps) {
  const theme = useTheme();
  const matches_md_up: boolean = useMediaQuery(theme.breakpoints.up('md'));
  const nodeRef = React.useRef(null);
  return (
    <>
      {matches_md_up ? (
        <Draggable
          handle="#draggable-dialog-title"
          cancel={'[class*="MuiDialogContent-root"]'}
          nodeRef={nodeRef}
        >
          <Paper {...props} ref={nodeRef} />
        </Draggable>
      ) : (
        <Paper {...props} ref={nodeRef} />
      )}
    </>
  );
}

export default function RegisterDialog({
  handleClose,
  open,
  handleClickOpenLog,
}: any) {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        hideBackdrop
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        open={open}
        disableScrollLock
        maxWidth="xs"
        PaperProps={{
          elevation: 0,
          sx: {
            border: 'solid 1px gray',
            position: 'relative',
          },
        }}
        fullScreen={false}
        PaperComponent={PaperComponent}
        className="cursor-move"
      >
        <BootstrapDialogTitle
          //   id="customized-dialog-title"
          onClose={handleClose}
        >
          <Box sx={{ justifySelf: 'center' }}>
            <Grid display="flex" justifyContent="center" alignItems="center">
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
            </Grid>

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent dividers className="cursor-auto">
          {SignUp(handleClose, handleClickOpenLog)}
        </DialogContent>
        <DialogActions></DialogActions>
        <Grid container justifyContent="flex-end" className="cursor-pointer">
          <Link
            onClick={() => {
              handleClose();
              handleClickOpenLog();
            }}
            variant="body2"
            className="mb-2 mr-2"
          >
            Already have an account? Sign in
          </Link>
        </Grid>
      </BootstrapDialog>
    </div>
  );
}

export function SignUp(handleClose: any, handleClickOpenLog: any) {
  const [formError, setFormError] = useState<any>({
    password: null,
    email: null,
    username: null,
  });
  const [isNotificationOn, setNotificationOn] = useState(false);
  const handleClickVariant = (variant: VariantType, msg: any) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };
  // const
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let er = registerValidate({
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('fullName'),
    });
    if (!(!er.email && !er.password && !er.username)) return;
    // console.log(er);

    await createUser({
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('fullName'),
      isNotificationOn: isNotificationOn,
    })
      .then((data: any) => {
        console.log(data);

        if (data.status == 422) {
          handleClickVariant('warning', data.data?.message);
        } else {
          handleClose();
          handleClickVariant('success', 'success!');
          handleClickOpenLog();
        }
        // if (data) router.push('http://localhost:3000');
      })
      .catch((er) => handleClickVariant('error', er));
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate={false} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                required
                error={formError?.username != null}
                helperText={formError?.username}
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setFormError((pr: any) => {
                    return {
                      ...pr,
                      username: registerValidate({ username: e.target.value })
                        .username,
                    };
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={formError?.email != null}
                helperText={formError?.email}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="small"
                onChange={(e) => {
                  e.preventDefault();
                  setFormError((pr: any) => {
                    return {
                      ...pr,
                      email: registerValidate({ email: e.target.value }).email,
                    };
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={formError?.password != null}
                helperText={formError?.password}
                fullWidth
                name="password"
                label="Password"
                // type="password"
                id="password"
                autoComplete="new-password"
                size="small"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  e.preventDefault();
                  setFormError((pr: any) => {
                    return {
                      ...pr,
                      password: registerValidate({ password: e.target.value })
                        .password,
                    };
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ fontSize: '1px !important' }}>
              <FormControlLabel
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 20 },
                  fontSize: '12px !important',
                }}
                control={
                  <Checkbox
                    value={isNotificationOn}
                    color="primary"
                    onChange={(e) => {
                      setNotificationOn(!isNotificationOn);
                    }}
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
            <Grid item xs={12} style={{ fontSize: '1px !important' }}>
              <Box className="mb-1 flex justify-center">
                <Button
                  autoFocus
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{}}
                  // onClick={handleClose}
                >
                  Sign Up
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
