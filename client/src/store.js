import { configureStore } from '@reduxjs/toolkit';
import rootSlice from './slices';

export default configureStore({
  reducer: rootSlice,
});
