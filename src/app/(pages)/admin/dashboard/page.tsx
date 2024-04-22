'use client';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

export default function Dashboard() {
  const router = useRouter();
  const [msgData, setMsgData] = useState({
    total: 0,
    unread: 0,
    msg: ['test', 'fdfdfdfd', 'test', 'fdfdfdfd'],
  });
  const [articleData, setArticleData] = useState({ total: 0, publish: 0 });
  const [categoryData, setCategoryData] = useState({ total: 0, publish: 0 });
  const [tagData, setTagData] = useState({ total: 0, publish: 0 });
  useEffect(() => {
    var config = {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: '#3182ce',
            borderColor: '#3182ce',
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: '#edf2f7',
            borderColor: 'black',
            data: [40, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Sales Charts',
          fontColor: 'white',
        },
        legend: {
          labels: {
            fontColor: 'white',
          },
          align: 'end',
          position: 'bottom',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          x: {
            ticks: {
              fontColor: 'rgba(255,255,255,.7)',
            },
            display: true,
            scaleLabel: {
              display: false,
              labelString: 'Month',
              fontColor: 'white',
            },
            gridLines: {
              display: false,
              borderDash: [2],
              borderDashOffset: [2],
              color: 'rgba(33, 37, 41, 0.3)',
              zeroLineColor: 'rgba(0, 0, 0, 0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },

          y: {
            ticks: {
              fontColor: 'rgba(255,255,255,.7)',
            },
            display: true,
            scaleLabel: {
              display: false,
              labelString: 'Value',
              fontColor: 'white',
            },
            gridLines: {
              borderDash: [3],
              borderDashOffset: [3],
              drawBorder: false,
              color: 'rgba(255, 255, 255, 0.15)',
              zeroLineColor: 'rgba(33, 37, 41, 0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        },
      },
    };
    var ctx: any = document.getElementById('line-chart');
    ctx = ctx?.getContext('2d');
    //@ts-ignore
    window['myLine'] = new Chart(ctx, config);
  }, []);
  return (
    <>
      {/* <Meta
        title={'Dashbord | Vajrapani Life'}
        url={'admin/dashboard'}
        image={'/images/vg-hotel.jpg'}
      /> */}
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          backgroundColor: (theme) =>
            theme.palette.mode == 'light' ? '#f1f1f1' : 'rgb(16, 24, 48)',
        }}
        className=" min-h-screen pt-10"
      >
        <CardContent className="custom-card">
          <Container
            sx={{
              pt: 5,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
            className={'main'}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item sm={12} md={12} lg={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    className="underline underline-offset-8"
                  >
                    Article{' '}
                    <Button
                      size="small"
                      color="success"
                      focusRipple
                      variant="outlined"
                      sx={{ ml: 5 }}
                    >
                      New
                    </Button>
                  </Typography>

                  <Card sx={{ minWidth: 275, width: '100%' }}>
                    <CardContent>
                      <Typography
                        component="div"
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <div className="grid grid-cols-4 grid-flow-col gap-4">
                          <div>Total - {articleData.total}</div>
                          <div className="col-span-2"></div>
                          <div>
                            Publish - {articleData.publish}/{articleData.total}
                          </div>
                        </div>
                        --------
                      </Typography>
                      <Typography component="div">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xs rounded bg-blueGray-700">
                          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                            <div className="flex flex-wrap items-center">
                              <div className="relative w-full max-w-full flex-grow flex-1">
                                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                                  Overview
                                </h6>
                                <h2 className="text-white text-xl font-semibold">
                                  Sales value
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 flex-auto">
                            {/* Chart */}
                            <div className="relative h-350-px">
                              <canvas id="line-chart"></canvas>
                            </div>
                          </div>
                        </div>
                      </Typography>
                    </CardContent>
                    <CardActions className="-mt-5">
                      <Button
                        size="small"
                        onClick={() => router.push('/admin/post-manage')}
                      >
                        Manage
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item sm={12} md={12} lg={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    className="underline underline-offset-8"
                  >
                    Messages
                  </Typography>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        component="div"
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <div className="grid grid-cols-4 grid-flow-col gap-4">
                          <div>Total - {msgData.total}</div>
                          <div className="col-span-2"></div>
                          <div>
                            Unread - {msgData.unread}/{msgData.total}
                          </div>
                        </div>
                        --------
                      </Typography>

                      {msgData.msg.map((m, i) => (
                        <Alert severity="info" sx={{ mb: 1.5 }} key={i}>
                          {m}
                        </Alert>
                      ))}
                    </CardContent>
                    <CardActions className="-mt-5">
                      <Button
                        size="small"
                        onClick={() => router.push('/admin/client-msg')}
                      >
                        Show All
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={12} md={12} lg={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    className="underline underline-offset-8"
                  >
                    Category
                  </Typography>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        component="div"
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <div className="grid grid-cols-4 grid-flow-col gap-4">
                          <div>Total - {categoryData.total}</div>
                          <div className="col-span-2"></div>
                          <div>
                            Publish - {categoryData.publish}/
                            {categoryData.total}
                          </div>
                        </div>
                        --------
                      </Typography>
                    </CardContent>
                    <Button
                      className="px-5 pb-4 -mt-5"
                      size="small"
                      onClick={() => router.push('/admin/category')}
                    >
                      Show All
                    </Button>
                  </Card>
                </Grid>
                <Grid item sm={12} md={12} lg={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    className="underline underline-offset-8"
                  >
                    Tag Manage
                  </Typography>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        component="div"
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <div className="grid grid-cols-4 grid-flow-col gap-4">
                          <div>Total - {tagData.total}</div>
                          <div className="col-span-2"></div>
                          <div>
                            Publish - {tagData.publish}/{tagData.total}
                          </div>
                        </div>
                        --------
                      </Typography>
                    </CardContent>
                    <Button
                      size="small"
                      className="px-5 pb-4 -mt-5"
                      onClick={() => router.push('/admin/tag')}
                    >
                      Show All
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </CardContent>
      </Box>
    </>
  );
}

// export async function getServerSideProps({ req, res }: any) {
//   // const hostname = req.headers.host;
//   // const a = () => {
//   //   const { data: session } = useSession();
//   //   return session;
//   // };
//   const session = await getSession({ req });
//   // console.log(session?.user);
//   if (!(session && new User(session.user)?.role?.name == 'ADMIN')) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }
//   // Fetch data from external API
//   // const ress = await getAllCategory(await getSession({ req }), req);
//   // const initialRows = await ress;
//   // console.log(initialRows);

//   // Pass data to the page via props
//   return { props: {} };
// }
