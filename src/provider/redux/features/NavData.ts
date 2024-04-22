import { createSlice } from '@reduxjs/toolkit';

export const NavData = createSlice({
  name: 'NavData',
  initialState: {
    navCategories: [],
    navSearchValue: '',
    tags: [],
  },
  reducers: {
    updateNavCategories(state, action) {
      state.navCategories = action.payload ? action.payload : [];
    },
    updateNavSearchValue(state, action) {
      state.navSearchValue = action.payload;
    },
    updateTags(state, action) {
      state.tags = action.payload ? action.payload : [];
    },
  },
});

export const { updateNavCategories, updateNavSearchValue, updateTags } =
  NavData.actions;
export default NavData.reducer;
