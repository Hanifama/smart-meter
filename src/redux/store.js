// redux/store.js

import { createStore } from 'redux';
import userReducer from './reducers/userReducer';

const store = createStore(
  userReducer,
  // Initial state
  { userProfile: null }
);


export default store;
