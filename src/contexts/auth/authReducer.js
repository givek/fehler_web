import { SET_TOKEN, LOGUT } from './authTypes';

export const authReducer = (prevState, action) => {
  switch (action.type) {
    // case 'GET_USER_DETAILS':
    //   return {
    //     ...prevState,
    //     userToken: action.token,
    //     isLoading: false,
    //   };

    case SET_TOKEN:
      return {
        ...prevState,
        isAuthenticated: true,
        userToken: action.token,
      };

    case LOGUT:
      return {
        ...prevState,
        isAuthenticated: false,
        userToken: null,
      };

    default:
      return { ...prevState };
  }
};
