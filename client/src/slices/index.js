import itemSlice from './itemSlice';
import errorSlice from './errorSlice';
import authSlice from './authSlice';

const rootSlice = {
  item: itemSlice,
  error: errorSlice,
  auth: authSlice,
};

export default rootSlice;
