import { createSlice } from '@reduxjs/toolkit';

export const SelectedItem = createSlice({
  name: 'selectedItem',
  initialState: {
    selectedPost: {},
  },
  reducers: {
    setSelectedPost(state, action) {
      state.selectedPost = action.payload ? action.payload : {};
    },
  },
});

export const { setSelectedPost } = SelectedItem.actions;
export default SelectedItem.reducer;
