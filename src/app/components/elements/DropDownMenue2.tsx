import {
  MenuItem,
  Typography,
  Box,
  Avatar,
  IconButton,
  Card,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import dynamic from 'next/dynamic';
const LoginDialog = dynamic(() => import('../auth/LoginDialog'), {
  ssr: false,
});
const RegisterDialog = dynamic(() => import('../auth/RegisterDialog'), {
  ssr: false,
});

export default function DropDownMenue2({ items, router }: any) {
  const { data: session, status } = useSession();
  const [registerCardOpen, setRegisterCardOpen] = React.useState(false);
  const [loginCardOpen, setLoginCardOpen] = React.useState(false);
  const [profImg, setProfImg] = React.useState<any>();

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
  useEffect(() => {
    // if (!session && router.asPath != '/') {
    //   router.push('/');
    // }
    setProfImg(localStorage.getItem('profImage'));
  }, [session]);
  return (
    <>
      <Box style={{ marginTop: '16px' }} sx={{ flexGrow: 0 }}>
        <div className="flex items-center justify-center">
          <div className="group relative cursor-pointer">
            <Box
              className={`flex items-center justify-between space-x-5 -mt-4 -mr-5 ${
                status != 'authenticated' ? '-mr-8' : ''
              }`}
            >
              <IconButton
                aria-label="auth"
                onClick={() => {
                  status == 'authenticated' ? '' : handleLoginCardOpen();
                }}
                sx={{ m: 1 }}
                className={
                  'menu-hover text-base font-medium text-black lg:mx-4 p-0 m-0 '
                }
                component="label"
              >
                {status == 'authenticated' ? (
                  <Avatar
                    alt={session?.user?.name + ''}
                    src={
                      typeof profImg != undefined && profImg != null
                        ? profImg
                        : session?.user?.name?.charAt(0)
                    }
                    sx={(theme) => ({
                      width: '30px',
                      height: '30px',
                      [theme.breakpoints.up('md')]: {
                        width: '35px',
                        height: '35px',
                      },
                    })}
                  />
                ) : (
                  <LoginIcon
                    sx={(theme) => ({
                      fontSize: '15px',
                      [theme.breakpoints.up('md')]: {
                        fontSize: '18px',
                      },
                    })}
                  />
                )}
              </IconButton>
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
            </Box>
            <Card
              className={
                status != 'authenticated'
                  ? 'hidden'
                  : `invisible absolute my-dr z-50 flex w-full flex-col 
              group-hover:visible group-hover:scale-100 min-w-max transform scale-75 
              transition duration-900 ease-in origin-right drop-shadow-2xl py-6`
              }
              onClick={() => {}}
              sx={{
                marginLeft: router.locale != 'ar' ? '-70px !important' : '0',
                marginRight: router.locale != 'ar' ? '0' : '-70px !important',
              }}
            >
              {items.map((setting: any) => (
                <MenuItem
                  // disabled={setting.title != 'Logout'}
                  key={setting.title}
                  onClick={(e) => {
                    if (setting.title != 'Logout') router.push(setting.href);
                    if (setting.title == 'Logout') {
                      signOut();

                      localStorage.removeItem('profImage');
                    }
                  }}
                  className=" flex border-gray-100 font-semibold my-1 m-0  md:mx-2"
                >
                  <IconButton
                    onClick={() => {}}
                    sx={{ m: 1 }}
                    className="menu-hover text-base font-medium lg:mr-4 p-0 m-0"
                    component="label"
                  >
                    {setting.title == 'Logout' ? (
                      <LogoutIcon
                        sx={(theme) => ({
                          fontSize: '12px',
                          [theme.breakpoints.up('md')]: {
                            fontSize: '14px',
                          },
                        })}
                      />
                    ) : (
                      <ManageAccountsIcon
                        sx={(theme) => ({
                          fontSize: '12px',
                          [theme.breakpoints.up('md')]: {
                            fontSize: '14px',
                          },
                        })}
                      />
                    )}
                  </IconButton>
                  <Typography
                    textAlign="left"
                    sx={(theme) => ({
                      fontSize: '12px',
                      [theme.breakpoints.up('md')]: {
                        fontSize: '14px',
                      },
                    })}
                  >
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Card>
          </div>
        </div>
      </Box>
    </>
  );
}
