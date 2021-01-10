import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { tokenConfig } from './authSlice';
import { returnErrors } from './errorSlice';

export const itemSlice = createSlice({
  name: 'item',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    itemsLoading: (state) => {
      state.loading = true;
    },

    getItemsSucccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },

    addItemsSuccess: (state, action) => {
      state.items = [action.payload, ...state.items];
    },

    deleteItemsSuccess: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const {
  itemsLoading,
  getItemsSucccess,
  addItemsSuccess,
  deleteItemsSuccess,
} = itemSlice.actions;

export const getItems = () => (dispatch) => {
  dispatch(itemsLoading());

  axios
    .get('/api/items')
    .then((res) => dispatch(getItemsSucccess(res.data)))
    .catch((err) => dispatch(returnErrors(err.response.status)));
};

export const addItems = (item) => (dispatch, getState) => {
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then((res) => dispatch(addItemsSuccess(res.data)))
    .catch((err) => dispatch(returnErrors(err.response.status)));
};

export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then((res) => dispatch(deleteItemsSuccess(id)))
    .catch((err) => dispatch(returnErrors(err.response.status)));
};

export default itemSlice.reducer;
