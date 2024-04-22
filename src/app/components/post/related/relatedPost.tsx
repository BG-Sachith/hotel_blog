/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  alpha,
  Box,
  Card,
  Collapse,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  ListSubheader,
  Skeleton,
  Stack,
  styled,
  SvgIcon,
  SvgIconProps,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useSpring, animated } from '@react-spring/web';
import { TransitionProps } from '@mui/material/transitions';
import { useRouter } from 'next/navigation';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  TreeItem,
  TreeItemProps,
  treeItemClasses,
} from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Post } from '@/src/modules/post';

function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 24, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  //@ts-ignore
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  //@ts-ignore
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    boxShadow: 'none',
    border: 'none',
    borderRadius: 0,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export default function RelatedPost({ relatedPosts }: any) {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const domRef = useRef();
  let executed = false;
  useEffect(() => {
    try {
      const observer: any = new IntersectionObserver((entries, observer) => {
        if (!executed)
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(entry.isIntersecting);
            }
            return () => {
              if (domRef.current) observer.unobserve(domRef.current);
            };
            // }
          });
      });
      observer.observe(domRef.current);
      return () => observer.disconnect();
    } catch (e) {
      // return { notFound: true };
    }
  }, []);

  useEffect(() => {
    setLoading(() => false);
  }, [relatedPosts[0]]);
  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={['1']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      sx={{
        height: 'auto',
        flexGrow: 1,
        // maxWidth: 400,
        overflowY: 'hidden',
        overflowX: 'hidden',
        boxShadow: 'none',
        border: 'none',
        borderRadius: 0,
      }}
      className="w-full"
    >
      <StyledTreeItem nodeId="1" label="Related">
        <Box
          sx={{
            display: 'flex',
            justifySelf: 'center',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
          }}
          // className={` ${l ? 'fade-in-section' : 'fade-in-section-l'}  ${
          //   isVisible && l ? 'is-visible' : isVisible ? 'is-visible-l' : ''
          // }`}
          ref={domRef}
        >
          <Card
            className="p-0 w-full"
            sx={{
              boxShadow: 'none',
              border: 'none',
              borderRadius: 0,
              maxWidth: '500px',
            }}
          >
            <Box sx={{ flexGrow: 1, cursor: 'pointer' }}>
              <Grid
                container
                spacing={0.1}
                sx={
                  {
                    // '--Grid-borderWidth': '1px',
                    // padding: 1,
                    // borderColor: 'divider',
                    // '& > div': {
                    // borderRight: 'var(--Grid-borderWidth) solid',
                    // borderBottom: 'var(--Grid-borderWidth) solid',
                    // borderColor: 'divider',
                    // },
                  }
                }
              >
                {relatedPosts?.map((p: Post, index: any) => (
                  <Box
                    key={index}
                    sx={(theme) => ({
                      flexGrow: 1,
                      transition: 'transform 0.3s, border 0.3s',
                      '&:hover': {
                        borderColor: theme.palette.primary,
                        transform: 'scale(1.03)',
                      },
                      '& > *': {
                        minWidth: 'clamp(0px, (360px - 100%) * 999,100%)',
                      },
                    })}
                    className=" w-full"
                  >
                    <Grid
                      container
                      spacing={1.5}
                      margin={1}
                      // rowSpacing={1}
                      // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        '--Grid-borderWidth': '1.5px',
                        // borderTop: 'var(--Grid-borderWidth) solid',
                        // borderLeft: 'var(--Grid-borderWidth) solid',

                        borderColor: 'divider',
                        '& > div': {
                          borderRight: 'var(--Grid-borderWidth) solid',
                          borderTop: 'var(--Grid-borderWidth) solid',
                          borderBottom: 'var(--Grid-borderWidth) solid',
                          borderColor: 'divider',
                        },
                      }}
                      className="animated animatedFadeInLeft fadeInLeft w-full"
                    >
                      <ImageListItem cols={2} className="p-0 w-full">
                        <ListSubheader component="div" className="m-0 text-sm">
                          {p?.title?.substring(0, 40) + '... ' || ''}
                        </ListSubheader>
                      </ImageListItem>
                      <Grid
                        {...{ xs: 5, sm: 5, md: 5, lg: 4 }}
                        minHeight={120}
                        // marginBottom={5}
                        display="block"
                      >
                        {/* -------------------------------------------------------------------------- sx={{ height: 150 }} */}
                        {!isLoading ? (
                          <ImageList className="w-full h-full" cols={1}>
                            {p.publicUrl &&
                              [p.publicUrl].map((item, i) => (
                                <ImageListItem
                                  key={i}
                                  className="text-xs w-full"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    router.push(`/posts/${p.id}`, {
                                      scroll: true,
                                    });
                                    setLoading(() => true);
                                  }}
                                >
                                  {item ? (
                                    <img
                                      src={`${item}`}
                                      srcSet={`${item}`}
                                      alt={item}
                                      loading="lazy"
                                    />
                                  ) : (
                                    <Skeleton
                                      height="100%"
                                      width="100%"
                                      animation="wave"
                                      variant="rectangular"
                                    />
                                  )}
                                  <ImageListItemBar
                                    title={''}
                                    subtitle={p?.category?.name}
                                    className="text-xs p-0 "
                                    actionIcon={
                                      <IconButton
                                        sx={{
                                          color: 'rgba(255, 255, 255, 0.54)',
                                        }}
                                        aria-label={`info about ${
                                          p?.title || ''
                                        }`}
                                      >
                                        {p?.likes?.length || ''}
                                        <InfoOutlinedIcon />
                                      </IconButton>
                                    }
                                  />
                                </ImageListItem>
                              ))}
                          </ImageList>
                        ) : (
                          <>
                            <Skeleton
                              variant="rectangular"
                              width={'100%'}
                              height={50}
                            />
                            <Skeleton
                              variant="rectangular"
                              width={'100%'}
                              height={50}
                            />
                          </>
                        )}
                        {/* -------------------------------------------------------------------------- */}
                        {/* <CardMedia
                          component="img"
                          width="200"
                          image={p.image + ''}
                          alt="green iguana"
                          onClick={() => {
                            setSelectedPost(p);
                          }}
                        /> */}
                      </Grid>
                      <Grid
                        {...{ xs: 7, sm: 7, md: 7, lg: 8 }}
                        minHeight={120}
                        sx={{ borderRight: 'none !important' }}
                        // marginBottom={5}
                      >
                        <Stack>
                          {/* <Link>
                            8.1M Likes
                            <Link
                              component="button"
                              underline="none"
                              fontSize="10px"
                              sx={{ color: 'text.tertiary', my: 0.5, ml: 4 }}
                            >
                              2 DAYS AGO
                            </Link>
                          </Link> */}
                          <Typography
                            className="px-1 decoration-1 font-serif"
                            sx={{ fontSize: '11px' }}
                          >
                            {/* <Link>Traval</Link>{' '} */}
                            {p?.summary?.substring(0, 100) + '...'}
                          </Typography>
                          <Link
                            className="text-xs px-1 decoration-1 font-serif"
                            // component="button"
                            // underline="none"
                            // fontSize="sm"
                            // startDecorator="…"
                            sx={{ color: 'text.tertiary' }}
                            onClick={(e) => {
                              router.push(`/posts/${p.id}`, {
                                scroll: true,
                              });
                              setLoading(() => true);
                            }}
                          >
                            more...
                          </Link>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Grid>
            </Box>
          </Card>
        </Box>
      </StyledTreeItem>
    </TreeView>
  );
}
