import { SET_TOKEN, LOGUT, SET_CURRENT_USER, SET_LOADING } from './authTypes';

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...prevState,
        currentUser: action.currentUser,
        isLoading: false,
        isAuthenticated: true,
      };

    case SET_TOKEN:
      window.localStorage.setItem('userToken', action.token);
      return {
        ...prevState,
        isAuthenticated: true,
        userToken: action.token,
      };

    case SET_LOADING:
      return {
        ...prevState,
        isLoading: true,
      };

    case LOGUT:
      window.localStorage.removeItem('userToken');
      return {
        ...prevState,
        isAuthenticated: false,
        userToken: null,
      };

    default:
      return { ...prevState };
  }
};
