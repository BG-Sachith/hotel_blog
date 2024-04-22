import { PostVM } from '@/src/modules/PostVm';
import { createSlice } from '@reduxjs/toolkit';

export const PostManage = createSlice({
  name: 'PostManage',
  initialState: {
    newPost: { ...new PostVM({}) },
    editPost: { ...new PostVM({}) },
    newPostIsOpen: false,
    editPostIsOpen: false,
  },
  reducers: {
    setNewPost(state, action) {
      state.newPost = action.payload ? action.payload : {};
    },
    setEditPost(state, action) {
      state.editPost = action.payload ? action.payload : {};
    },
    toggleNewPage(state, action) {
      state.newPostIsOpen = action.payload && action.payload == true;
    },
    toggleEditPage(state, action) {
      state.editPostIsOpen = action.payload && action.payload == true;
    },
  },
});

export const { setNewPost, setEditPost, toggleNewPage, toggleEditPage } =
  PostManage.actions;
export default PostManage.reducer;
