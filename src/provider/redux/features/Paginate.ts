import { createSlice } from '@reduxjs/toolkit';

export const Paginate = createSlice({
  name: 'Paginate',
  initialState: {
    posts: [],
    isPageLoading: true,
    isPageLoadingMore: false,
    hasMore: false,
    pageNumber: 0,
  },
  reducers: {
    setPageLoading(state, action) {
      state.isPageLoading = action.payload ? action.payload : false;
    },
    setPageLoadingMore(state, action) {
      state.isPageLoadingMore = action.payload ? action.payload : false;
    },
    setPosts(state, action) {
      state.posts = action.payload ? action.payload : [];
    },
    setHasMore(state, action) {
      state.hasMore = action.payload ? action.payload : false;
    },
    setPageNumber(state, action) {
      state.pageNumber = action.payload ? action.payload : 0;
    },
  },
});

export const {
  setPageLoading,
  setPageLoadingMore,
  setPosts,
  setHasMore,
  setPageNumber,
} = Paginate.actions;
export default Paginate.reducer;
