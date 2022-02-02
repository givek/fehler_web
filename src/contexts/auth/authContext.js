import { Spinner } from '@chakra-ui/react';
import React from 'react';
import fehlerApi from '../../utils/fehlerApi';
import { login, register } from './authActions';
import { authReducer } from './authReducer';
import { LOGUT, SET_CURRENT_USER, SET_LOADING } from './authTypes';

// TODO: separate Auth and User context
const AuthContext = React.createContext();

const initialState = {
  userToken: null,
  currentUser: null,
  isLoading: false,
  isAuthenticated: false,
};

// initialize initial state with userToken from localStorage on page refresh

// - initilize with isLoading set to true, as checkLogin effect will start
//  after render. So on render if isLoading = false and isAuthenticate = false,
//  it will redirect to login page.
function init(initialState) {
  return (
    {
      userToken: window.localStorage.getItem('userToken'),
      currentUser: null,
      isLoading: true,
      isAuthenticated: false,
    } || initialState
  );
}

// wrapper component for AuthContext.Provider
export const AuthProvider = ({ children }) => {
  const [userData, dispatch] = React.useReducer(
    authReducer,
    initialState,
    init
  );

  React.useEffect(() => {
    async function checkLogin() {
      console.log('start checkLogin');

      // set isLoading to true

      dispatch({ type: SET_LOADING });

      if (userData.userToken) {
        try {
          fehlerApi.defaults.headers.common[
            'Authorization'
          ] = `Token ${userData.userToken}`;

          const response = await fehlerApi.get(`user-details`);

          console.log(response);
          // set isLoading to false

          if (response.status === 200) {
            console.log(response.data);
            dispatch({ type: SET_CURRENT_USER, currentUser: response.data });
          }
        } catch (error) {
          if (error.response) {
            // dispatch({ type: LOGUT });
            dispatch({ type: SET_CURRENT_USER, currentUser: null });
          }
          alert(error);
        }
      }
    }
    checkLogin();
  }, [userData.userToken]);

  // Memoize the return value, only recompute when userData has changed.
  const value = React.useMemo(
    () => ({
      userData,
      register: userData => register(userData, dispatch),
      login: userData => login(userData, dispatch),
      logout: () => dispatch({ type: 'SIGN_OUT' }),
      dispatch,
    }),
    [userData]
  );

  // return userData.isLoading ? (
  //   <Spinner />
  // ) : (
  //   <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  // );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// wrapper for useContext hook call.
// - instead of exporting context directly, custom hook to consume AuthContext
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
