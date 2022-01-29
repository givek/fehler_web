import React from 'react';
import { login, register } from './authActions';
import { authReducer } from './authReducer';
import { SET_CURRENT_USER, SET_LOADING } from './authTypes';

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
      const token = window.localStorage.getItem('userToken');

      // set isLoading to true

      dispatch({ type: SET_LOADING });

      if (token) {
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: userData.userToken }),
        };

        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/user-details`,
            requestOptions
          );

          // set isLoading to false

          if (response.ok) {
            const res = await response.json();
            console.log(res.user);
            dispatch({ type: SET_CURRENT_USER, currentUser: res.user });
          } else {
            const res = await response.json();
            console.error(res);
          }
        } catch (error) {
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
    }),
    [userData]
  );

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
