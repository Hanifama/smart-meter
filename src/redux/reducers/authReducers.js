// src/redux/reducers/authReducer.js

import { LOGIN_SUCCESS } from '../actions/typeActions';

const initialState = {
  isAuthenticated: false,
  userProfile: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userProfile: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
