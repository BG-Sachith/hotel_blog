/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Stack,
  Chip,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { findAllCategories } from '@/service/categoryService';
import { findAllTags } from '@/service/tagService';
import { findAllPostPage } from '@/service/post/postService';
import CardSkeleton from '../skeleton/CardSkeleton';
import DoneIcon from '@mui/icons-material/Done';
var _ = require('lodash');

import dynamic from 'next/dynamic';
const CardPostListForFilter = dynamic(
  () => import('../post/CardPostListForFilter'),
  {
    ssr: false,
  }
);

const perPage = 10;

// export const PostContext = React.createContext({
//   posts: [],
//   setPosts: (value) => {},
//   setTags: (value) => {},
//   tags: [],
//   setCategories: (value) => {},
//   categories: [],
//   isLoading: true,
//   setLoading: (value) => {},
//   hasMore: true,
//   setHasMore: (value) => {},
//   isPageLoading: true,
//   setPageLoading: (value) => {},
//   isPageLoadingMore: true,
//   pageNumber: 0,
//   setPageNumber: (value) => {},
//   selectedCats: [''],
//   setSelectedCats: (value) => {},
//   selectedTags: [''],
//   setSelectedTags: (value) => {},
// });

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

export default function CategoryContend() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isPageLoading, setPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = React.useState<any>([]);
  const { data: session } = useSession();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const theme = useTheme();
  const matches_xs = useMediaQuery(theme.breakpoints.up('xs'));
  const matches_sm = useMediaQuery(theme.breakpoints.up('sm'));
  const matches_md = useMediaQuery(theme.breakpoints.up('md'));
  const matches_lg = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    // if (isLoading) {
    // console.log(check);
    // setLoading(false);
    findAllTags(true).then((d) => {
      setTags(d);
    });
    findAllCategories(true).then((d) => {
      setCategories((c) => d);
      load(d);
    });
    // setLoading(true);
    // }
    // () => {
    //   router.query.category = '';
    // };
  }, []);

  useEffect(() => {
    if (
      router.query?.category &&
      router.query?.category != '' &&
      categories.length > 0
    ) {
      setLoading((p) => true);
      load(categories);
    }
  }, [router.query?.category]);

  const load = (d: any) => {
    // console.log(d);
    // console.log(router.query);
    // if (
    //   router.query?.category &&
    //   router.query?.category != '' &&
    //   d.length > 0
    // ) {
    setLoading((p) => true);
    setPageNumber((prev) => 0);
    // console.log(d);
    let ct = router.query?.category ? [router.query.category] : [];
    let ctIds: Number[] = d
      ?.filter((c: any) => ct.includes(c.name))
      .map((c: any) => c.id);
    findAllPostPage(0, perPage, 'id', 'desc', null, true, ctIds, [], [])
      .then(async (res: any) => {
        if (res.ok) {
          return await res.json();
        } else {
          res = await res.json();
          // console.log(res);
          throw Error(res?.error + '');
        }
      })
      .then((d: any) => {
        // console.log(d);
        if (d && d?.data) {
          setPosts(() => (d?.data ? d.data : []));
          setHasMore((pr) => d?.data?.length < d.count);
        }

        if (router.query?.category) {
          setSelectedCats([router.query.category + '']);
          setCatogoryNames([router.query.category + '']);
        }
        // setSelectedTags([]);
        let t = setTimeout(() => {
          setLoading(false);
          clearTimeout(t);
        }, 900);
      })
      .catch((er) => {
        console.log(er);
        setLoading(false);
      });
    // } else setLoading(false);
  };

  const postFilterByCat = (cts: any) => {
    setPageLoading(true);
    // console.log(cts);
    // setTags([...tags, ...tags, ...tags]);
    // console.log(selectedTags.findIndex((p) => p == tg + 'l'));
    let ct_: string[] =
      selectedCats.findIndex((p: any) => p == cts) > -1
        ? selectedCats.filter((p: any) => p != cts)
        : [...selectedCats, cts];
    if (selectedCats.findIndex((p: any) => p == cts) > -1) {
      setSelectedCats((prv: any) => [...prv.filter((p: any) => p != cts)]);
    } else
      setSelectedCats((prv: any) => [...prv.filter((p: any) => p != cts), cts]);
    let ct: Number[] = categories
      ?.filter((c: any) => ct_.includes(c.name))
      .map((c: any) => c.id);
    setCatogoryNames((pr) => ct_);
    setPageNumber((prev) => 0);
    let tgIds: Number[] = tags
      ?.filter((c: any) => selectedTags.includes(c.name))
      .map((c: any) => c.id);
    findAllPostPage(0, perPage, 'id', 'desc', null, true, ct, tgIds, [])
      .then(async (res: any) => {
        if (res.ok) {
          return await res.json();
        } else {
          res = await res.json();
          // console.log(res);
          throw Error(res?.error + '');
        }
      })
      .then((d: any) => {
        console.log(d);
        if (d && d?.data) {
          setPosts(() => (d?.data ? d.data : []));
          setHasMore((pr) => d?.data?.length < d.count);
        }
        setTimeout(() => setPageLoading(false), 900);
      })
      .catch((er) => {
        console.log(er);
        setPageLoading(false);
      });
  };

  const postFilterByTag = (tg: any) => {
    //todo bug
    // setTags([...tags, ...tags, ...tags]);
    // console.log(selectedTags.findIndex((p) => p == tg + 'l'));
    // console.log(tg);
    setPageLoading(true);
    let st: string[] =
      selectedTags.findIndex((p) => p == tg) > -1
        ? selectedTags.filter((p) => p != tg)
        : [...selectedTags, tg];
    if (selectedTags.findIndex((p) => p == tg) > -1) {
      setSelectedTags((prv) => [...prv.filter((p) => p != tg)]);
    } else setSelectedTags((prv) => [...prv.filter((p) => p != tg), tg]);
    let ct: Number[] = categories
      ?.filter((c: any) => selectedCats.includes(c.name))
      .map((c: any) => c.id);
    let tgIds: Number[] = tags
      ?.filter((c: any) => selectedTags.includes(c.name))
      .map((c: any) => c.id);
    // console.log(selectedTags);
    setTagNames((pr) => st);
    setPageNumber((prev) => 0);
    findAllPostPage(0, perPage, 'id', 'desc', null, true, ct, tgIds, [])
      .then(async (res: any) => {
        if (res.ok) {
          return await res.json();
        } else {
          res = await res.json();
          // console.log(res);
          throw Error(res?.error + '');
        }
      })
      .then((d: any) => {
        // console.log(d);
        if (d && d?.data) {
          setPosts(() => (d?.data ? d.data : []));
          setHasMore((pr) => d?.data?.length < d.count);
        }
        setTimeout(() => setPageLoading(false), 900);
      })
      .catch((er) => {
        console.log(er);
        setPageLoading(false);
      });
  };

  // ### handle dropdown
  const [tagNames, setTagNames] = React.useState<string[]>([]);
  const [catogoryNames, setCatogoryNames] = React.useState<string[]>([]);
  const [isPageLoadingMore, setPageLoadingMore] = useState<any>(false);

  const handleTagChange = (event: SelectChangeEvent<typeof tagNames>) => {
    const {
      target: { value },
    } = event;
    let v = typeof value === 'string' ? value.split(',') : value;
    // let item = v.filter((i) => !tagNames.includes(i));
    let item = _.difference(v, tagNames); // v.filter((i) => !catogoryNames.includes(i));
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
    // console.log(catogoryNames);
    let v = typeof value === 'string' ? value.split(',') : value;
    let item = _.difference(v, catogoryNames); // v.filter((i) => !catogoryNames.includes(i));
    if (item.length == 0) item = _.difference(catogoryNames, v);
    // console.log(item);
    if (item.length > 0) postFilterByCat(item[0]);
    setCatogoryNames((pr) =>
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const observer = useRef<any>();
  const lastElmntRef = useCallback<any>(
    (node: any) => {
      // console.log('Visible');
      // console.log(isLoading + '||' + isPageLoading + '||' + isPageLoadingMore);
      if (isLoading || isPageLoadingMore) return;
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
    [isLoading, hasMore, isPageLoadingMore]
  );

  useEffect(() => {
    if (isPageLoadingMore) {
      loadMore();
    }
  }, [pageNumber]);

  const loadMore = () => {
    let ct: Number[] = categories
      ?.filter((c: any) => selectedCats.includes(c.name))
      .map((c: any) => c.id);
    let tg: Number[] = tags
      ?.filter((c: any) => selectedTags.includes(c.name))
      .map((c: any) => c.id);
    findAllPostPage(pageNumber, perPage, 'id', 'desc', null, true, ct, tg, [])
      .then(async (res: any) => {
        if (res.ok) {
          return await res.json();
        } else {
          res = await res.json();
          // console.log(res);
          throw Error(res?.error + '');
        }
      })
      .then((d: any) => {
        // console.log(d);
        if (d && d?.data) {
          const pst: any = [...posts, ...d.data];
          setPosts((pr) => pst);
          setHasMore((p) => pst.length < d.count);
          setPageLoadingMore(false);
          setPageLoading(false);
        }
        // setTimeout(() => setPageLoadingMore(false), 900);
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
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#f1f1f1'
            : theme.palette.primary + '',
      }}
      className="custom-card mb-50 min-h-screen"
    >
      <CardContent className="custom-card">
        <Container sx={{ marginTop: 15 }} className={'main max-w-screen-xl'}>
          {/* <Card className="my-2 p-2">Category : {router.query?.category}</Card> */}
          {!isLoading && (
            <Container
              sx={{
                marginTop: {
                  // xs: '45px !important',
                  // sm: '-5px !important',
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
                      boxShadow: 'none',
                      gridArea: 'header',
                      backgroundColor:
                        theme.palette.mode === 'light'
                          ? '#f1f1f1'
                          : theme.palette.primary + '',
                      // display: !matches_md ? 'block' : 'flex',
                    }}
                    className="my-5 px-1 justify-around"
                  >
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
                          {categories
                            .map((t: any) => t.name)
                            .map((name) => (
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
                      {catogoryNames?.map((ct: string, index) => (
                        <Chip
                          label={ct}
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
                          onClick={() => postFilterByCat(ct)}
                          onDelete={() => {}}
                          deleteIcon={
                            selectedCats.findIndex((t: any) => ct == t) > -1 ? (
                              <DoneIcon />
                            ) : (
                              <></>
                            )
                          }
                        />
                      ))}
                    </Stack>
                    {/* {JSON.stringify(selectedCats)} */}
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
                            .map((name) => (
                              <MenuItem key={name} value={name} sx={{ p: 0 }}>
                                <Checkbox
                                  checked={tagNames.indexOf(name) > -1}
                                />
                                <ListItemText primary={name} />
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                    <br />
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
                              xs: index < 3 ? 'inline-list-item' : 'none',
                              sm: index < 3 ? 'inline-list-item' : 'none',
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
                      selectedCats: selectedCats,
                      setSelectedCats: setSelectedCats,
                      selectedTags: selectedTags,
                      setSelectedTags: setSelectedTags,
                    }}
                  > */}
                  <CardPostListForFilter lastElmntRef={lastElmntRef} />
                  {/* </PostContext.Provider> */}
                </Box>
              </Box>
            </Container>
          )}
          {isLoading && (
            <Container
              sx={{
                marginTop: {
                  // xs: '-45px !important',
                  // sm: '-5px !important',
                  md: '0px !important',
                },
              }}
              className={'main pl-0 pr-0 max-w-screen-xl'}
            >
              <CardSkeleton no={1} width={'100%'} />
              <Box
                sx={{
                  display: 'grid',
                  gap: 2.5,
                  gridTemplateColumns: {
                    xs: 'repeat(auto-fill, min(200px, .8fr))',
                    sm: 'repeat(auto-fill, minmax(300px, .8fr))',
                    md: 'repeat(auto-fill, minmax(300px, .8fr))',
                  },
                  mb: 10,
                }}
              >
                <CardSkeleton no={3} width={'100%'} />
              </Box>
              {/* <Typography className="mt-50">Loading...</Typography> */}
            </Container>
          )}
        </Container>
      </CardContent>
    </Card>
  );
}
