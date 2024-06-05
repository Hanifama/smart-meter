// redux/reducers/userReducer.js

const initialState = {
  userProfile: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      return {
        ...state,
        userProfile: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
