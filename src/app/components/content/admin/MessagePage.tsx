'use client';
import { LoadingButton } from '@mui/lab';
import {
  Paper,
  useMediaQuery,
  Box,
  CardContent,
  Container,
  Typography,
  Tooltip,
  IconButton,
  Stack,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  styled,
  useTheme,
} from '@mui/material';
import React from 'react';
import {
  deleteClientMsgs,
  updateClientMsgs,
} from '@/service/contact/clientMsg';
import { EmailToClient } from '@/service/email/emailService';

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useSession } from 'next-auth/react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f1f1f1',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  // maxWidth: 400,
}));

export default function MessagePage({ initialRows }: any) {
  const [rows, setRows] = React.useState(
    initialRows ? initialRows : { data: [], total: 0 }
  );

  const session: any = useSession();

  const theme = useTheme();
  const matches_xs_up = useMediaQuery(theme.breakpoints.up('xs'));
  const matches_sm_up = useMediaQuery(theme.breakpoints.up('sm'));
  const matches_sm_down = useMediaQuery(theme.breakpoints.down('sm'));
  const matches_md_up = useMediaQuery(theme.breakpoints.up('md'));
  const matches_md_down = useMediaQuery(theme.breakpoints.down('md'));
  const matches_lg_up = useMediaQuery(theme.breakpoints.up('lg'));

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Box
      sx={{ width: '100%', position: 'relative' }}
      className="custom-card min-h-screen"
    >
      <CardContent className="custom-card">
        <Container
          sx={{
            marginTop: 5,
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
          className={'main'}
          maxWidth="md"
        >
          <Box className="py-5 sm:py-10 w-full">
            <Box className="mx-auto max-w-7xl px-6 lg:px-8">
              <Box className="mx-auto max-w-2xl lg:text-center">
                <Typography className="mt-2 text-3xl font-bold tracking-tight  sm:text-3xl">
                  Messages{rows.total && ' (' + rows.total + ')'}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              '& .actions': {
                color: 'text.secondary',
              },
              '& .textPrimary': {
                color: 'text.primary',
              },
            }}
          >
            <Box className="flex flex-col w-full">
              {rows?.data &&
                rows?.data?.map((item: any, i: number) => (
                  <Item
                    className="grow w-full"
                    sx={{
                      my: 1.5,
                      mx: 'auto',
                      p: 2,
                    }}
                    key={i}
                  >
                    <Box className="flex justify-end -mt-4">
                      {item?.isReplied && (
                        <Box>
                          <Tooltip title="Replied" arrow>
                            <IconButton aria-label="Replied">
                              <DoneAllIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                      {item?.isRead ? (
                        <Box>
                          <Tooltip
                            title="UnRead Message"
                            arrow
                            onClick={() => {}}
                          >
                            <IconButton aria-label="UnRead Message">
                              <MarkEmailReadIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        <Box>
                          <Tooltip
                            title="Read Message"
                            arrow
                            onClick={() => {}}
                          >
                            <IconButton aria-label="Read Message">
                              <MarkEmailUnreadIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                      <Box>
                        <Tooltip title="Delete Message" arrow>
                          <IconButton
                            aria-label="Delete Message"
                            disabled={item?.disabled}
                            onClick={(e) => {
                              e.preventDefault();
                              setRows((pre: any) => {
                                return {
                                  data: rows?.data?.map((r: any) => {
                                    if (r.id == item.id) r.disabled = true;
                                    return r;
                                  }),
                                  total: rows.total,
                                };
                              });
                              deleteClientMsgs(item?.id, session).then((r) => {
                                let t = setTimeout(() => {
                                  setRows((pre: any) => {
                                    return {
                                      data: rows?.data?.filter(
                                        (r: any) => r.id != item.id
                                      ),
                                      total: rows.total - 1,
                                    };
                                  });
                                  clearTimeout(t);
                                }, 2000);
                              });
                            }}
                          >
                            <UnsubscribeIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    <Stack spacing={2} direction="row" alignItems="center">
                      <Avatar>{item?.name[0]}</Avatar>

                      <Stack
                        spacing={2}
                        direction="column"
                        alignItems="left"
                        sx={{ textAlign: 'left' }}
                        className="w-full"
                      >
                        <Box
                          // spacing={2}
                          // direction="row"
                          // alignItems="center"
                          className="flex justify-between "
                        >
                          <Typography
                            noWrap
                            sx={{
                              fontSize: matches_md_up ? '14px' : '12px',
                              fontFamily: 'monospace',
                            }}
                          >
                            {item?.name}
                          </Typography>
                          <Typography
                            noWrap
                            sx={{
                              textAlign: 'right',
                              fontSize: matches_md_up ? '14px' : '11px',
                              fontFamily: 'monospace',
                            }}
                          >
                            {item?.createdAt}
                          </Typography>
                        </Box>
                        <Accordion
                          expanded={expanded === 'panel' + i}
                          onChange={handleChange('panel' + i)}
                          onClick={() => {
                            if (!item.isRead)
                              updateClientMsgs(
                                {
                                  id: item?.id,
                                  isRead: true,
                                },
                                session
                              ).then((r) => {
                                setRows((pre: any) => {
                                  return {
                                    data: rows?.data?.map((r: any) => {
                                      if (r.id == item.id) r.isRead = true;
                                      return r;
                                    }),
                                    total: rows.total,
                                  };
                                });
                                //reply:''
                              });
                          }}
                          sx={(theme) => ({
                            backgroundColor:
                              theme.palette.mode === 'dark'
                                ? '#1A2027'
                                : '#f1f1f1',
                            boxShadow: 'none',
                          })}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography
                              noWrap
                              sx={{
                                fontSize: matches_md_up ? '16px' : '12px',
                                fontWeight: '900',
                              }}
                            >
                              {item?.message?.substring(
                                0,
                                matches_md_up ? 40 : 20
                              ) + '... ' || ''}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{item?.message}</Typography>
                            <Stack
                              spacing={2}
                              direction="row"
                              alignItems="center"
                            >
                              <TextField
                                id="standard-basic"
                                label="Reply"
                                variant="standard"
                                fullWidth
                                defaultValue={item?.reply}
                                onChange={(e) => {
                                  e.preventDefault();
                                  setRows((pre: any) => {
                                    return {
                                      data: rows?.data?.map((r: any) => {
                                        if (r.id == item.id)
                                          r.reply = e.target.value;
                                        return r;
                                      }),
                                      total: rows.total,
                                    };
                                  });
                                }}
                              />
                              <LoadingButton
                                size="small"
                                onClick={() => {
                                  setRows((pre: any) => {
                                    return {
                                      data: rows?.data?.map((r: any) => {
                                        if (r.id == item.id)
                                          r.loadingBtnS = true;
                                        return r;
                                      }),
                                      total: rows.total,
                                    };
                                  });

                                  updateClientMsgs(
                                    {
                                      id: item?.id,
                                      reply: item.reply,
                                    },
                                    session
                                  ).then((r) => {
                                    let t = setTimeout(() => {
                                      setRows((pre: any) => {
                                        return {
                                          data: rows?.data?.map((r: any) => {
                                            if (r.id == item.id) {
                                              r.isReplied = true;
                                              r.loadingBtnS = false;
                                              r.reply = '';
                                            }
                                            return r;
                                          }),
                                          total: rows.total,
                                        };
                                      });
                                      clearTimeout(t);
                                    }, 2000);
                                  });
                                  console.log(item);
                                  if (item.createdBy)
                                    EmailToClient({
                                      email: item.createdBy,
                                      name: 'Vajrapani Blog (https://www.vajrapanilife.com)',
                                      message: item.reply,
                                    }).then((d: any) => {
                                      console.log(d.message);
                                    });
                                }}
                                endIcon={<SendIcon />}
                                loading={item.loadingBtnS}
                                loadingPosition="end"
                                variant="outlined"
                              >
                                <span></span>
                              </LoadingButton>
                            </Stack>
                          </AccordionDetails>
                        </Accordion>
                      </Stack>
                    </Stack>
                  </Item>
                ))}
            </Box>
          </Box>
        </Container>
      </CardContent>
    </Box>
  );
}
