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
import React, { useState, useTransition } from 'react';
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
import { useSnackbar, VariantType } from 'notistack';
import Draggable from 'react-draggable';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import login_validate from '../../../util/validate';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import {
  sendOTP,
  signInReq,
  updatePwd,
  validateOTP,
} from '@/src/service/user/userService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

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

function BootstrapDialogTitle(props: any) {
  const { children, onClose, active, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <Box sx={{ textAlign: 'center' }}>{children}</Box>
      {onClose ? (
        <IconButton
          aria-label="close"
          className="cursor-auto"
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

export default function LoginDialog({
  handleClose,
  open,
  handleClickOpenReg,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [loadingMail, setLoadingMail] = React.useState(false);
  const [loadingOTP, setLoadingOTP] = React.useState(false);
  const [loadingPWD, setLoadingPWD] = React.useState(false);

  const [isForgotPassword, setForgotPassword] = React.useState(false);
  const [resetPwd, setResetPwd] = React.useState({
    isSentMail: false,
    isValidCode: false,
  });
  const [resetEmailTxt, setResetEmailTxt] = React.useState<any>();
  const [resetPwdTxt, setResetPwdTxt] = React.useState<any>();
  const [resetOTPTxt, setResetOTPTxt] = React.useState<any>();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose2 = () => {
    // console.log('hii');
    handleClose();
  };

  const { enqueueSnackbar } = useSnackbar();

  const [formError, setFormError] = useState<any>({
    password: null,
    email: null,
  });

  const [resetformError, setResetFormError] = useState<any>({
    password: null,
    otp: null,
    email: null,
  });

  const [showResetPassword, setShowResetPassword] = React.useState(false);

  const handleClickShowResetPassword = () =>
    setShowResetPassword((show) => !show);

  function sendMail() {
    if (resetformError.email) {
      return;
    }
    setLoadingMail(true);
    sendOTP(resetEmailTxt).then((r: any) => {
      console.log(r);
      if (r?.message == 'OK') {
        setTimeout(() => {
          setResetPwd((pr) => {
            return { ...pr, isSentMail: true };
          });
          setLoadingMail(false);
        }, 1000);
      } else {
        setResetFormError((pr: any) => {
          return {
            ...pr,
            email: r,
          };
        });
        setLoadingMail(false);
      }
    });
  }
  function submitOTP() {
    if (resetOTPTxt?.length != 4) {
      setResetFormError((pr: any) => {
        return {
          ...pr,
          otp: 'Invalid Code, check inbox',
        };
      });
      return;
    }
    setLoadingOTP(true);
    validateOTP(resetEmailTxt, resetOTPTxt).then((r: any) => {
      // console.log(r);
      if (r?.message == 'OK') {
        setTimeout(() => {
          setResetPwd((pr) => {
            return { ...pr, isValidCode: true };
          });
          setLoadingOTP(false);
        }, 1000);
      } else {
        setResetFormError((pr: any) => {
          return {
            ...pr,
            otp: r?.message,
          };
        });
        setLoadingOTP(false);
      }
    });
  }
  function updatePwd_() {
    if (
      resetformError.password ||
      resetPwdTxt == null ||
      resetPwdTxt.trim().length == 0
    ) {
      return;
    }

    setLoadingPWD(true);

    setResetFormError((pr: any) => {
      return { ...pr, password: null };
    });
    updatePwd(resetEmailTxt, resetPwdTxt).then((r: { message: string }) => {
      if (r.message == 'OK') {
        setTimeout(() => {
          setResetPwd((pr) => {
            return { isSentMail: false, isValidCode: false };
          });
          setLoadingPWD(false);
          setForgotPassword(false);
          handleClickVariant('success', 'Password is updated');
        }, 1000);
      } else {
        setLoadingPWD(false);
        handleClickVariant('error', r.message);
      }
      // console.log(r);
    });
  }

  const handleClickVariant = (variant: VariantType, msg: any) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant: variant });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let er = login_validate({
      email: data.get('email'),
      password: data.get('password'),
      rememberPassword: data.get('rememberPassword'),
    });
    // );
    if (!er.email) {
      startTransition(async () => {
        const status: any = await signInReq({
          redirect: false,
          email: data.get('email'),
          password: data.get('password'),
          rememberPassword: data.get('rememberPassword'),
          // callbackUrl: '/',
        });
        if (status?.ok) {
          handleClose();
          // getImgById().then((res: { image: string }) => {
          //   // console.log(res);
          //   localStorage.setItem('profImage', res?.image);
          // });
        } else handleClickVariant('error', status?.error);
      });
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
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
        {' '}
        {!isForgotPassword ? (
          <>
            <BootstrapDialogTitle onClose={handleClose2}>
              <Box sx={{ justifySelf: 'center' }}>
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                </Grid>

                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Box>
            </BootstrapDialogTitle>
            <DialogContent dividers className="cursor-auto">
              <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="form"
                    noValidate={false}
                    onSubmit={handleSubmit}
                  >
                    <Grid container spacing={1} className="pt-0 pb-0 mt-0">
                      <Grid item xs={12} className="pt-0 pb-0 mt-0">
                        <TextField
                          margin="normal"
                          required
                          error={formError?.email != null}
                          helperText={formError?.email}
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          size="small"
                          autoFocus
                          className="pt-0 pb-0 mt-0"
                          onChange={(e) => {
                            e.preventDefault();
                            setFormError((pr: any) => {
                              return {
                                ...pr,
                                email: login_validate({ email: e.target.value })
                                  .email,
                              };
                            });
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} className="pt-0 pb-0">
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          // error={formError?.password != null}
                          // helperText={formError?.password}
                          id="password"
                          autoComplete="current-password"
                          size="small"
                          className="pt-0 pb-0 mt-0"
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
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => {
                            e.preventDefault();
                            setFormError((pr: any) => {
                              return {
                                ...pr,
                                password: login_validate({
                                  password: e.target.value,
                                }).password,
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
                              value={true}
                              name="rememberPassword"
                              color="primary"
                            />
                          }
                          label="Remember me"
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
                            className="max-w-xs"
                          >
                            Sign in
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Grid container className="pt-0 pb-0 mt-0">
                    <Grid item xs={12} className="pt-0 pb-0 mt-0">
                      <Box className="flex justify-center">
                        <Button
                          autoFocus
                          type="submit"
                          fullWidth
                          variant="outlined"
                          sx={{}}
                          disabled
                          // onClick={handleClose}
                          className="max-w-xs"
                        >
                          Sign in with Google
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </DialogContent>
            <DialogActions sx={{ display: 'block' }} className="cursor-auto">
              <Grid container className="pt-0 pb-0 mt-0">
                <Grid item xs={12} className="pt-0 pb-0 mt-0">
                  <Box sx={{ display: { xs: 'grid', sm: 'grid', md: 'flex' } }}>
                    <Box className="flex-none ml-2 mb-2 cursor-pointer">
                      <Link
                        onClick={() => setForgotPassword(true)}
                        variant="body2"
                      >
                        Forgot password?
                      </Link>
                    </Box>
                    <Box className="grow"></Box>
                    <Box className="flex-none mr-2 mb-2 ml-2 cursor-pointer">
                      <Link
                        variant="body2"
                        className="mb-2 mr-1"
                        onClick={() => {
                          handleClose();
                          handleClickOpenReg();
                        }}
                      >
                        {`Don't have an account? Sign Up`}
                      </Link>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogActions>
          </>
        ) : (
          <>
            <BootstrapDialogTitle onClose={handleClose2}>
              <Box sx={{ justifySelf: 'center' }}>
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                </Grid>

                <Typography component="h1" variant="h5">
                  Password Reset
                </Typography>
              </Box>
            </BootstrapDialogTitle>
            <DialogContent dividers className="cursor-auto">
              <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Grid item xs={12} className="pt-0 pb-0 mt-0">
                  {!resetPwd.isSentMail && (
                    <TextField
                      margin="normal"
                      required
                      error={resetformError?.email != null}
                      helperText={resetformError?.email}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      size="small"
                      autoFocus
                      className="pt-0 pb-0 mt-0"
                      onChange={(e) => {
                        e.preventDefault();
                        setResetEmailTxt((p: any) => e.target.value);
                        setResetFormError((pr: any) => {
                          return {
                            ...pr,
                            email: login_validate({ email: e.target.value })
                              .email,
                          };
                        });
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} className="pt-0 pb-0 mt-0">
                  {resetPwd.isSentMail && !resetPwd.isValidCode && (
                    <TextField
                      margin="normal"
                      required
                      error={resetformError?.otp != null}
                      helperText={resetformError?.otp}
                      fullWidth
                      id="code"
                      label="Code"
                      name="code"
                      size="small"
                      autoFocus
                      className="pt-0 pb-0 mt-0"
                      onChange={(e) => {
                        e.preventDefault();
                        setResetOTPTxt((p: any) => e.target.value);
                        setResetFormError((pr: any) => {
                          return {
                            ...pr,
                            otp:
                              e.target?.value?.length == 4 ? null : 'Invalid',
                          };
                        });
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} className="pt-0 pb-0">
                  {resetPwd.isSentMail && resetPwd.isValidCode && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="New Password"
                      error={resetformError?.password != null}
                      helperText={
                        resetformError?.password != null
                          ? 'Must be 4 - 8 characters long'
                          : null
                      }
                      id="password"
                      // autoComplete="current-password"
                      size="small"
                      className="pt-0 pb-0 mt-0"
                      type={showResetPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowResetPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showResetPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        e.preventDefault();
                        setResetFormError((pr: any) => {
                          return {
                            ...pr,
                            password: login_validate({
                              password: e.target.value,
                            }).password,
                          };
                        });
                        setResetPwdTxt((p: any) => e.target.value);
                      }}
                    />
                  )}
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions sx={{ display: 'block' }} className="cursor-auto">
              <Grid container className="pt-0 pb-0 mt-0">
                <Grid item xs={12} className="pt-0 pb-0 mt-0">
                  <Box sx={{ display: { xs: 'grid', sm: 'grid', md: 'flex' } }}>
                    <Box className="flex-none ml-2 mb-2 cursor-pointer">
                      <Link
                        onClick={() => {
                          if (resetPwd.isValidCode) {
                            setResetPwd((pr) => {
                              return { ...pr, isValidCode: false };
                            });
                          } else if (resetPwd.isSentMail) {
                            setResetPwd((pr) => {
                              return { ...pr, isSentMail: false };
                            });
                          } else setForgotPassword(false);
                        }}
                        variant="body2"
                      >
                        Back
                      </Link>
                    </Box>
                    <Box className="grow"></Box>
                    <Box className="flex-none mr-2 mb-2 ml-2 cursor-pointer">
                      {!resetPwd.isSentMail && (
                        <LoadingButton
                          size="small"
                          onClick={sendMail}
                          endIcon={<SendIcon />}
                          loading={loadingMail}
                          loadingPosition="end"
                          variant="outlined"
                        >
                          {' '}
                          send
                        </LoadingButton>
                      )}
                      {resetPwd.isSentMail && !resetPwd.isValidCode && (
                        <LoadingButton
                          size="small"
                          onClick={submitOTP}
                          endIcon={<SendIcon />}
                          loading={loadingOTP}
                          loadingPosition="end"
                          variant="outlined"
                        >
                          {' '}
                          submit
                        </LoadingButton>
                      )}
                      {resetPwd.isSentMail && resetPwd.isValidCode && (
                        <LoadingButton
                          size="small"
                          onClick={updatePwd_}
                          endIcon={<SendIcon />}
                          loading={loadingPWD}
                          loadingPosition="end"
                          variant="outlined"
                        >
                          {' '}
                          save
                        </LoadingButton>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogActions>
          </>
        )}
      </BootstrapDialog>
    </div>
  );
}
