import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    msg: {},
    status: null,
    id: null,
  },
  reducers: {
    getErrors: (state, action) => {
      console.log(action);
      state.msg = action.payload.msg;
      state.status = action.payload.status;
      state.id = action.payload.id;
    },
    clearErrors: (state) => {
      return {
        msg: {},
        status: null,
        id: null,
      };
    },
  },
});

export const { getErrors, clearErrors } = errorSlice.actions;

// return errors
export const returnErrors = (msg, status, id = null) => {
  return getErrors({ msg, status, id });
};

export default errorSlice.reducer;
