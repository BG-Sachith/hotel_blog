import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCardIcon from '@mui/icons-material/AddCard';
import MailIcon from '@mui/icons-material/Mail';
import CategoryIcon from '@mui/icons-material/Category';
import StyleIcon from '@mui/icons-material/Style';
import headerNavLinks from '../layout/headerNavLinks';
import { Switch, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AppsIcon from '@mui/icons-material/Apps';
import InfoIcon from '@mui/icons-material/Info';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Label from '@mui/icons-material/Label';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { User } from '@/src/modules/user';
import { RootState } from '@/src/provider/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleEditMode,
  toggleHideMe,
} from '@/src/provider/redux/features/Settings';
import {
  TreeItem,
  TreeItemProps,
  treeItemClasses,
} from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AntSwitch = styled(Switch)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: 26,
    height: 12,
  },
  [theme.breakpoints.down('md')]: {
    width: 20,
    height: 11,
  },
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    [theme.breakpoints.up('md')]: {
      padding: 0.8,
    },
    [theme.breakpoints.down('md')]: {
      padding: 0.1,
    },
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

// declare module 'react' {
//   interface CSSProperties {
//     '--tree-view-color'?: string;
//     '--tree-view-bg-color'?: string;
//   }
// }

// type StyledTreeItemProps = TreeItemProps & {
//   bgColor?: string;
//   color?: string;
//   labelIcon: React.ElementType<SvgIconProps>;
//   labelInfo?: string;
//   labelText: string;
// };

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  //@ts-ignore
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    // borderTopRightRadius: theme.spacing(2),
    // borderBottomRightRadius: theme.spacing(2),
    // paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      // backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      // backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    //@ts-ignore
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  //@ts-ignore
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    //@ts-ignore
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: any) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    key,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 0.2,
            pl: 0,
            pr: 0,
            m: 0,
          }}
          key={key}
        >
          <Box
            component={LabelIcon}
            color="inherit"
            sx={(theme) => ({
              mr: 2.8,
              fontSize: '10px',
              [theme.breakpoints.up('md')]: {
                fontSize: '12px',
              },
            })}
          />
          <Typography
            // variant="body2"
            sx={(theme) => ({
              fontWeight: 'inherit',
              flexGrow: 1,
              fontSize: '10px',
              [theme.breakpoints.up('md')]: {
                fontSize: '12px',
              },
            })}
          >
            {labelText}
          </Typography>
          <Typography
            variant="caption"
            color="inherit"
            sx={(theme) => ({
              fontSize: '10px',
              [theme.breakpoints.up('md')]: {
                fontSize: '12px',
              },
            })}
          >
            {labelInfo}
          </Typography>
        </Box>
      }
      // style={{
      //   '--tree-view-color': color,
      //   '--tree-view-bg-color': bgColor,
      // }}
      {...other}
    />
  );
}

export default function DrawerSettingsAdm({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}: any) {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const colorMode = useSelector((state: RootState) => state.toggleTheme.theme);
  const { isEdidMode, openDrwAdm, hideMe }: any = useSelector(
    (state: RootState) => state.settings
  );
  const [mouseEnter, setMouseEnter] = React.useState(false);
  const [fixedMe, setFixdMe] = React.useState(false);

  const isAuthAdm = () => {
    // console.log(session);
    return status == 'authenticated' && new User(session.user)?.role == 'ADMIN';
  };
  const isAuth = () => {
    return status == 'authenticated';
  };
  return (
    <Box
      sx={{
        display: {
          xs: 'flex',
          sm: 'flex',
          md: isAuthAdm() ? 'flex' : 'none',
        },
      }}
    >
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            zIndex: 11,
            marginTop: { xs: 6.8, sm: 8, md: 8 },
          },
          // (theme) =>
          //theme.breakpoints.down('md') ? '8px !important' : '12px !important',
          opacity: { xs: open ? 1 : 0, sm: open ? 1 : 0, md: hideMe ? 0 : 1 },
        }}
        onMouseEnter={() => {
          if (!openDrwAdm && !fixedMe) {
            handleDrawerOpen();
            setMouseEnter(true);
          }
        }}
        onMouseLeave={() => {
          if (openDrwAdm && mouseEnter && !fixedMe) {
            handleDrawerClose();
            setMouseEnter(false);
          }
        }}
      >
        <DrawerHeader className="p-0" sx={{ minHeight: 'auto !important' }}>
          <IconButton
            aria-label="Hide"
            onClick={
              open
                ? handleDrawerClose
                : hideMe
                ? handleDrawerOpen
                : () => {
                    dispatch(toggleHideMe(hideMe));
                    setFixdMe(false);
                  }
            }
          >
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          {/* <IconButton size="small" sx={{ padding: 0 }}>
            {!fixedMe ? (
              <RadioButtonUncheckedIcon
                onClick={() => setFixdMe(true)}
                sx={{
                  width: '20px !important',
                  height: '20px !important',
                  margin: 0.5,
                }}
              />
            ) : (
              <RadioButtonCheckedIcon
                onClick={() => setFixdMe(false)}
                sx={{
                  width: '20px !important',
                  height: '20px !important',
                  margin: 0.5,
                }}
              />
            )}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List sx={{ p: 0 }}>
          <ListItem
            disablePadding
            sx={{
              display: isAuthAdm() ? 'block' : 'none',
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 40,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : -4,
                  justifyContent: 'center',
                }}
              >
                <AntSwitch
                  inputProps={{ 'aria-label': 'Quick Settings' }}
                  checked={isEdidMode && isEdidMode}
                  onChange={() => {
                    dispatch(toggleEditMode(isEdidMode));
                  }}
                  className="ml-0"
                />
              </ListItemIcon>
              <ListItemText
                primary={'Quick Settings'}
                primaryTypographyProps={{
                  sx: {
                    fontSize: '10px',
                    [theme.breakpoints.up('md')]: {
                      fontSize: '12px',
                    },
                  },
                }}
                sx={{
                  opacity: open ? 1 : 0,

                  marginLeft: -1.5,
                }}
                onClick={() => {
                  dispatch(toggleEditMode(isEdidMode));
                  setFixdMe(false);
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider
            className={isAuthAdm() ? '' : 'hidden'}
            sx={{
              display: {
                xs: 'block',
                sm: 'block',
                md: 'none',
              },
            }}
          />
          {headerNavLinks.default
            // .filter((l) => !l.multi)
            .map((text: any, index) => {
              return text?.multi && text.title == 'Category' ? (
                <TreeView
                  key={index + 't'}
                  aria-label={text.title}
                  // defaultExpanded={['3']}
                  // defaultCollapseIcon={<ArrowDropDownIcon />}
                  // defaultExpandIcon={<ArrowRightIcon />}
                  // defaultEndIcon={<div style={{ width: 24 }} />}
                  sx={{
                    display: { xs: 'block', sm: 'block', md: 'none' },
                    flexGrow: 1,
                    maxWidth: 400,
                    ml: -1.4,

                    // py: 0.3,
                    overflowY: 'auto',
                  }}
                >
                  <StyledTreeItem
                    nodeId="1"
                    labelText={text.name}
                    // label={text.name}
                    labelIcon={Label}
                  >
                    {text.links.map((lnk: any, i: any) => (
                      <StyledTreeItem
                        key={i}
                        nodeId={i + 2 + ''}
                        labelText={lnk.title}
                        labelIcon={FiberManualRecordIcon}
                        // labelInfo="90"
                        color="#1a73e8"
                        bgColor="#e8f0fe"
                        sx={{ ml: 1 }}
                        onClick={(e: any) => {
                          e.preventDefault();
                          navigate.push(lnk.href + '');
                        }}
                      />
                    ))}
                  </StyledTreeItem>
                </TreeView>
              ) : (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    //   display: 'block',
                    m: 0,
                    display: { xs: 'block', sm: 'block', md: 'none' },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate.push(text.href + '');
                    // window.location.reload();
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 40,
                      justifyContent: open ? 'initial' : 'center',
                      p: 0,
                      px: 2.5,
                      m: 0,
                      mt: text.title == 'Contact' ? '-14px' : 0,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        fontSize: '8px',
                      }}
                    >
                      {text.title == 'Home' ? (
                        <AppsIcon
                          sx={{
                            fontSize: '10px',
                            [theme.breakpoints.up('md')]: {
                              fontSize: '12px',
                            },
                          }}
                        />
                      ) : text.title == 'About' ? (
                        <InfoIcon
                          sx={{
                            fontSize: '10px',
                            [theme.breakpoints.up('md')]: {
                              fontSize: '12px',
                            },
                          }}
                        />
                      ) : text.title == 'Contact' ? (
                        <ContactPhoneIcon
                          sx={{
                            fontSize: '10px',
                            [theme.breakpoints.up('md')]: {
                              fontSize: '12px',
                            },
                          }}
                        />
                      ) : (
                        <InfoIcon
                          sx={{
                            fontSize: '10px',
                            [theme.breakpoints.up('md')]: {
                              fontSize: '12px',
                            },
                          }}
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={text.name}
                      sx={{ opacity: open ? 1 : 0 }}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: '10px',
                          [theme.breakpoints.up('md')]: {
                            fontSize: '12px',
                          },
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
        <Divider />
        <List
          sx={(theme) => ({
            display: {
              xs: isAuthAdm() ? 'block' : 'none',
              sm: isAuthAdm() ? 'block' : 'none',
              md: isAuthAdm() ? 'block' : 'none',
            },
          })}
        >
          {[
            {
              name: 'DashBoard',
              icon: <DashboardIcon />,
              href: '/admin/dashboard',
            },
            {
              name: 'Category',
              icon: <CategoryIcon />,
              href: '/admin/category',
            },
            { name: 'Tag', icon: <StyleIcon />, href: '/admin/tag' },
            {
              name: 'Post Manage',
              icon: <AddCardIcon />,
              href: '/admin/post-manage',
            },
            {
              name: 'Messages',
              icon: <ContactMailIcon />,
              href: '/admin/client-msg',
            },

            // {
            //   name: 'Slides Manage',
            //   icon: <VideoSettingsIcon />,
            //   href: '/admin/slide-manage',
            // },
          ].map((text, index) => (
            <ListItem
              key={text.name}
              disablePadding
              sx={{
                display: { xs: 'none', sm: 'none', md: 'block' },
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 40,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate.push(text.href);
                  // window.location.reload();
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    '& span, & svg': {
                      fontSize: '16px',
                    },
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '10px',
                      [theme.breakpoints.up('md')]: {
                        fontSize: '12px',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          sx={{
            display: {
              xs: isAuthAdm() ? 'block' : 'none',
              sm: isAuthAdm() ? 'block' : 'none',
              md: isAuthAdm() ? 'block' : 'none',
            },
          }}
        >
          {['Payment', 'Users', 'Any'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 40,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                disabled
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <AddCardIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
