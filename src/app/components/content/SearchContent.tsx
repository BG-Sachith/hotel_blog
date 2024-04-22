'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import {
  useMediaQuery,
  SelectChangeEvent,
  Card,
  CardContent,
  Container,
  Box,
  Stack,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  useTheme,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { findAllPostPage } from '@/service/post/postService';
var _ = require('lodash');
import dynamic from 'next/dynamic';
const CardPostListForFilterSearch = dynamic(
  () => import('../post/CardPostListForFilterSearch'),
  {
    ssr: false,
  }
);
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/provider/redux/store';
const perPage = 10;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 250,
    },
  },
};
export default function SearchContent() {
  const { navCategories, navSearchValue, tags }: any = useSelector(
    (state: RootState) => state.navData
  );
  const searchParams = useSearchParams();
  const searchC = searchParams.get('category');
  const searchFor = searchParams.get('search');
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isPageLoading, setPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [posts, setPosts] = useState([]);
  const domRef = useRef();
  const { data: session } = useSession();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedCats, setSelectedCats] = React.useState<string[]>(
    searchC ? [searchC] : []
  );

  const theme = useTheme();
  const matches_lg = useMediaQuery(theme.breakpoints.up('lg'));

  let executed = false;
  useEffect(() => {
    // console.log(pageProps);
    try {
      const observer2: any = new IntersectionObserver((entries, observer) => {
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
      observer2.observe(domRef.current);
      return () => observer2.disconnect();
    } catch (e) {
      // return { notFound: true };
    }
  });

  let [abortController, setAbortController] = useState(new AbortController());

  const postFilterByCat = (cts: any) => {
    // setTags([...tags, ...tags, ...tags]);
    // console.log(selectedTags.findIndex((p) => p == tg + 'l'));
    setPageLoading(true);
    let ct_: string[] =
      selectedCats.findIndex((p) => p == cts) > -1
        ? selectedCats.filter((p) => p != cts)
        : [...selectedCats, cts];
    if (selectedCats.findIndex((p) => p == cts) > -1) {
      setSelectedCats((prv) => [...prv.filter((p) => p != cts)]);
    } else setSelectedCats((prv) => [...prv.filter((p) => p != cts), cts]);
    let ct = navCategories
      ?.filter((c: any) => ct_.includes(c.name))
      .map((c: any) => c.id);

    let cnt = new AbortController();
    setAbortController((pr) => {
      pr.abort();
      return cnt;
    });
    setCatogoryNames(() => ct_);
    setPageNumber(() => 0);
    let tgIds: Number[] = tags
      ?.filter((c: any) => selectedTags.includes(c.name))
      .map((c: any) => c.id);
    findAllPostPage(
      0,
      perPage,
      'id',
      'desc',
      navSearchValue,
      true,
      ct,
      tgIds,
      []
      // cnt.signal
    )
      .then((d: any) => {
        // console.log(d);
        if (d && d?.data) {
          setPosts(() => (d.data ? d.data : []));
          setHasMore(() => d?.data?.length < d.count);
        }
        let t = setTimeout(() => {
          setPageLoading(false);
          cnt.abort();
          clearTimeout(t);
        }, 900);
      })
      .catch((er) => {
        console.log(er);
        setPageLoading(false);
      });
  };

  const postFilterByTag = (tg: any) => {
    // setTags([...tags, ...tags, ...tags]);
    // console.log(selectedTags.findIndex((p) => p == tg + 'l'));
    setPageLoading(true);
    let st: string[] =
      selectedTags.findIndex((p) => p == tg) > -1
        ? selectedTags.filter((p) => p != tg)
        : [...selectedTags, tg];
    if (selectedTags.findIndex((p) => p == tg) > -1) {
      setSelectedTags((prv) => [...prv.filter((p) => p != tg)]);
    } else setSelectedTags((prv) => [...prv.filter((p) => p != tg), tg]);
    let ct = navCategories
      ?.filter((c: any) => selectedCats.includes(c.name))
      .map((c: any) => c.id);
    setTagNames(() => st);
    setPageNumber(() => 0);
    let tgIds: Number[] = tags
      ?.filter((c: any) => st.includes(c.name))
      .map((c: any) => c.id);
    findAllPostPage(
      0,
      perPage,
      'id',
      'desc',
      navSearchValue,
      true,
      ct,
      tgIds,
      []
    )
      .then((d: any) => {
        // console.log(d);
        if (d && d?.data) {
          setPosts(() => (d.data ? d.data : [])); //todo set img
          setHasMore(() => d?.data?.length < d.count);
        }
        setTimeout(() => setPageLoading(false), 900);
      })
      .catch((er) => {
        console.log(er);
        setPageLoading(false);
      });
  };

  useEffect(() => {
    console.log(selectedCats);
    // console.log(selectedTags);
    // if (router.query?.search) {
    setPageLoading(true);
    let ct = navCategories
      ?.filter((c: any) => selectedCats.includes(c.name))
      .map((c: any) => c.id);
    let tgIds: Number[] = tags
      ?.filter((c: any) => selectedTags.includes(c.name))
      .map((c: any) => c.id);
    setPageNumber(() => 0);
    findAllPostPage(
      0,
      perPage,
      'id',
      'desc',
      navSearchValue,
      true,
      ct,
      tgIds,
      []
    )
      .then((d: any) => {
        // console.log(d);
        if (d && d?.data) {
          setPosts(() => (d.data ? d.data : []));
          setHasMore(() => d?.data?.length < d.count);
        }
        setTimeout(() => setPageLoading(false), 900);
        setLoading(false);
        setPageLoadingMore(false);
      })
      .catch((er) => {
        console.log(er);
        setPageLoading(false);
        setLoading(false);
        setPageLoadingMore(false);
      });
    // }
  }, [navSearchValue]);

  // ### handle dropdown
  useEffect(() => {
    // setCatogoryNames((pr: any) => Array.from(new Set([...pr, searchC])));
    setCatogoryNames((pr: any) => (searchC ? [searchC] : pr));
    setSelectedCats((pr: any) => (searchC ? [searchC] : pr));
  }, [searchC]);
  const [tagNames, setTagNames] = React.useState<string[]>([]);
  const [catogoryNames, setCatogoryNames] = React.useState<string[]>(
    searchC ? [searchC] : []
  );
  const [isPageLoadingMore, setPageLoadingMore] = useState<any>(false);

  const handleTagChange = (event: SelectChangeEvent<typeof tagNames>) => {
    const {
      target: { value },
    } = event;
    let v = typeof value === 'string' ? value.split(',') : value;
    let item = _.difference(v, tagNames);
    if (item.length == 0) item = _.difference(tagNames, v);
    if (item.length > 0) postFilterByTag(item[0]);
    setTagNames(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleCatogoryChange = (
    event: SelectChangeEvent<typeof catogoryNames>
  ) => {
    const {
      target: { value },
    } = event;
    // console.log(value);
    let v = typeof value === 'string' ? value.split(',') : value;
    let item = _.difference(v, catogoryNames);
    if (item.length == 0) item = _.difference(catogoryNames, v);
    // console.log(item);
    if (item.length > 0) postFilterByCat(item[0]);
    setCatogoryNames(() =>
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const observer = useRef<any>();
  const lastElmntRef = useCallback<any>(
    (node: any) => {
      // console.log('Visible');
      // console.log(isLoading + '||' + isPageLoading + '||' + isPageLoadingMore);
      if (isLoading || isPageLoadingMore || isPageLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // console.log('Visible');
          setPageNumber((prev) => prev + 1);
          setPageLoadingMore(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, isPageLoadingMore, isPageLoading]
  );

  useEffect(() => {
    if (isPageLoadingMore) {
      loadMore();
    }
  }, [pageNumber]);

  const loadMore = () => {
    // console.log(isPageLoadingMore);
    let ct = navCategories
      ?.filter((c: any) => selectedCats.includes(c.name))
      .map((c: any) => c.id);
    let tgIds: Number[] = tags
      ?.filter((c: any) => selectedTags.includes(c.name))
      .map((c: any) => c.id);
    let cnt = new AbortController();
    setAbortController((pr) => {
      pr.abort();
      return cnt;
    });

    findAllPostPage(
      pageNumber,
      perPage,
      'id',
      'desc',
      navSearchValue,
      true,
      ct,
      tgIds,
      []
      // cnt.signal
    )
      .then((d: any) => {
        if (d && d?.data) {
          const pst: any = [...posts, ...d.data];
          setPosts(() => pst);
          setHasMore(() => pst.length < d.count);
          setPageLoadingMore(false);
          setPageLoading(false);
        }
        let t = setTimeout(() => {
          cnt.abort();
          clearTimeout(t);
        }, 900);
      })
      .catch((er) => {
        console.log(er);
        setPageLoadingMore(false);
        setPageLoading(false);
      });
  };
  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
        border: 'none',
        borderRadius: 0,
        minHeight: '100vh',
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#f1f1f1'
            : theme.palette.primary + '',
      }}
      className="custom-card"
    >
      <CardContent className="custom-card">
        <Container sx={{ marginTop: 15 }} className={'main max-w-screen-xl'}>
          {/* <Card className="my-2 p-2">Category : {router.query?.category}</Card> */}
          {!isLoading ? (
            <Container
              sx={{
                marginTop: {
                  xs: '-45px !important',
                  sm: '-5px !important',
                  md: '0px !important',
                },
              }}
              className={'main pl-0 pr-0 max-w-screen-xl '}
            >
              <Box
                sx={{
                  width: '100%',
                  minWidth: '200px !important',
                  // height: '140px',
                  color: '#fff',
                  '& > .MuiBox-root > .MuiBox-root': {
                    p: 1,
                    borderRadius: 0,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    // backgroundColor: 'secondary.main',
                  },
                }}
              >
                <Box
                  sx={{
                    gridTemplateColumns: `repeat(${matches_lg ? 2 : 1}, 1fr)`,
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: matches_lg
                      ? `"header header ""main main ""footer footer "`
                      : `"header""main""footer"`,
                  }}
                >
                  <Card
                    sx={{
                      gridArea: 'header',
                      border: 'none',
                      borderRadius: 0,
                      boxShadow: 'none',
                      backgroundColor:
                        theme.palette.mode === 'light'
                          ? '#f1f1f1'
                          : theme.palette.primary + '',
                      // display: !matches_md ? 'block' : 'flex',
                    }}
                    className="my-5 px-1"
                  >
                    <Stack>
                      {navSearchValue && navSearchValue != '_' && (
                        <Typography
                          className="mx-5"
                          sx={{
                            display: {
                              xs: 'none',
                              sm: 'none',
                              md: 'initial',
                              lg: 'initial',
                            },
                          }}
                        >
                          Search For : {navSearchValue}
                        </Typography>
                      )}
                      <Divider className="my-5" />
                      {/* Category */}
                      <div>
                        <FormControl
                          sx={(theme) => ({
                            m: 1,
                            width: 300,
                            [theme.breakpoints.down('md')]: {
                              width: 200,
                            },
                          })}
                          size="small"
                        >
                          <InputLabel id="demo-multiple-checkbox-label">
                            Category
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={catogoryNames}
                            onChange={handleCatogoryChange}
                            input={<OutlinedInput label="Category" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                          >
                            {navCategories
                              .map((t: any) => t.name)
                              .map((name: any) => (
                                <MenuItem key={name} value={name} sx={{ p: 0 }}>
                                  <Checkbox
                                    checked={catogoryNames.indexOf(name) > -1}
                                  />
                                  <ListItemText primary={name} />
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>
                      <br />
                    </Stack>
                    <Stack
                      direction="row"
                      // spacing={1}
                      className="justify-around"
                      sx={{
                        display: {
                          xs: 'none',
                          sm: 'none',
                          md: 'initial',
                          lg: 'initial',
                        },
                      }}
                    >
                      {catogoryNames?.map((tg: String, index) => (
                        <Chip
                          label={tg}
                          color="primary"
                          variant="outlined"
                          key={index}
                          clickable
                          size="small"
                          sx={{
                            // minWidth: { md: '150px' },
                            display: {
                              xs: index < 3 ? 'inline-list-item' : 'none',
                              sm: index < 3 ? 'inline-list-item' : 'none',
                              md: index < 6 ? 'inline-list-item' : 'none',
                              lg: index < 12 ? 'inline-list-item' : 'none',
                            },
                            margin: '0.75rem !important',
                          }}
                          // className="my-3 mx-3"
                          onClick={() => postFilterByCat(tg)}
                          onDelete={() => {}}
                          deleteIcon={
                            selectedCats.findIndex((t) => tg == t) > -1 ? (
                              <DoneIcon />
                            ) : (
                              <></>
                            )
                          }
                        />
                      ))}
                    </Stack>
                    {/* <Divider className="my-5" /> */}
                    {/* Tag */}
                    <div>
                      <FormControl
                        sx={(theme) => ({
                          m: 1,
                          width: 300,
                          [theme.breakpoints.down('md')]: {
                            width: 200,
                          },
                        })}
                        size="small"
                      >
                        <InputLabel id="demo-multiple-checkbox-label">
                          Tag
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={tagNames}
                          onChange={handleTagChange}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {tags
                            .map((t: any) => t.name)
                            .map((name: any) => (
                              <MenuItem key={name} value={name} sx={{ p: 0 }}>
                                <Checkbox
                                  checked={tagNames.indexOf(name) > -1}
                                />
                                <ListItemText primary={name} />
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>{' '}
                    {/* <br /> */}
                    <Stack
                      direction="row"
                      // spacing={1}
                      className="justify-around"
                      sx={{ display: 'initial' }}
                    >
                      {tagNames?.map((tg: string, index) => (
                        <Chip
                          label={tg}
                          color="primary"
                          variant="outlined"
                          key={index}
                          clickable
                          size="small"
                          sx={{
                            // minWidth: { md: '150px' },
                            display: {
                              xs: 'none',
                              sm: 'none',
                              md: index < 6 ? 'inline-list-item' : 'none',
                              lg: index < 12 ? 'inline-list-item' : 'none',
                            },
                            margin: '0.75rem !important',
                          }}
                          // className="my-3 mx-3"
                          onClick={() => postFilterByTag(tg)}
                          onDelete={() => {}}
                          deleteIcon={
                            selectedTags.findIndex((t) => tg == t) > -1 ? (
                              <DoneIcon />
                            ) : (
                              <></>
                            )
                          }
                        />
                      ))}
                    </Stack>
                  </Card>
                  {/* <PostContext.Provider
                    value={{
                      posts: posts,
                      tags: tags,
                      categories: categories,
                      setPosts: setPosts,
                      setTags: setTags,
                      setCategories: setCategories,
                      hasMore: hasMore,
                      isLoading: isLoading,
                      isPageLoading: isPageLoading,
                      isPageLoadingMore: isPageLoadingMore,
                      pageNumber: pageNumber,
                      setHasMore: setHasMore,
                      setLoading: setLoading,
                      setPageLoading: setPageLoading,
                      setPageNumber: setPageNumber,
                      selectedTags: selectedTags,
                      setSelectedTags: setSelectedTags,
                    }}
                  > */}
                  <CardPostListForFilterSearch
                    session={session}
                    lastElmntRef={lastElmntRef}
                    posts={posts}
                    isPageLoading={isPageLoading}
                  />
                  {/* </PostContext.Provider> */}
                </Box>
              </Box>
            </Container>
          ) : (
            <Container
              sx={{
                marginTop: {
                  xs: '-45px !important',
                  sm: '-5px !important',
                  md: '0px !important',
                },
              }}
              className={'main pl-0 pr-0 max-w-screen-xl '}
            >
              <Typography className="mt-50">Loading...</Typography>
            </Container>
          )}
        </Container>
      </CardContent>
    </Card>
  );
}
