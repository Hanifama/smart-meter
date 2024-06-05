// src/redux/actions/authActions.js

import { LOGIN_SUCCESS } from './typeActions';

export const loginSuccess = (userProfile) => ({
  type: LOGIN_SUCCESS,
  payload: userProfile,
});
