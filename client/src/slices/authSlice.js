import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { returnErrors } from './errorSlice';

const success = (state, action) => {
  localStorage.setItem('token', action.payload.token);
  state.isAuthenticated = true;
  state.isLoading = false;
  state.token = action.payload.token;
  state.user = action.payload.user;
};

const fail = (state) => {
  localStorage.removeItem('token');
  state.token = null;
  state.user = null;
  state.isAuthenticated = false;
  state.isLoading = false;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  },
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
    },

    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },

    loginSuccess: success,
    registerSuccess: success,

    authError: fail,
    loginFail: fail,
    logout: fail,
    registerFail: fail,
  },
});

export const {
  userLoading,
  userLoaded,
  loginSuccess,
  registerSuccess,
  authError,
  loginFail,
  logout,
  registerFail,
} = authSlice.actions;

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch(userLoading());

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => dispatch(userLoaded(res.data)))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch(authError());
    });
};

// Register user
export const register = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };

  // request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post('/api/users', body, config)
    .then((res) => dispatch(registerSuccess(res.data)))
    .catch((err) => {
      dispatch(registerFail());
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
    });
};

// login user
export const login = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };

  // request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then((res) => dispatch(loginSuccess(res.data)))
    .catch((err) => {
      dispatch(loginFail);
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
    });
};

// setup config/headers and token
export const tokenConfig = (getState) => {
  // get token from localStorage
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };

  // if token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

export default authSlice.reducer;
