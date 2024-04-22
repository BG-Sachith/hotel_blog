import { configureStore } from '@reduxjs/toolkit';
import { ToggleTheme } from './features/ToggleTheme';
import { Settings } from './features/Settings';
import { Paginate } from './features/Paginate';
import { SelectedItem } from './features/SelectedItem';
import { PostManage } from './features/PostManage';
import { NavData } from './features/NavData';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    toggleTheme: ToggleTheme.reducer,
    settings: Settings.reducer,
    navData: NavData.reducer,
    paginate: Paginate.reducer,
    selectedItem: SelectedItem.reducer,
    postManage: PostManage.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
