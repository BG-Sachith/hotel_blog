import { createSlice } from '@reduxjs/toolkit';

export const Settings = createSlice({
  name: 'Settings',
  initialState: {
    isEdidMode: false,
    openDrwAdm: true,
    hideMe: true,
  },
  reducers: {
    toggleEditMode(state, action) {
      state.isEdidMode = !action.payload;
    },
    toggleDrwAdm(state, action) {
      state.openDrwAdm = !action.payload;
    },
    toggleHideMe(state, action) {
      state.hideMe = !action.payload;
    },
  },
});

export const { toggleEditMode, toggleDrwAdm, toggleHideMe } = Settings.actions;
export default Settings.reducer;
