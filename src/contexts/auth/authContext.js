import React from 'react';
import { login, register } from './authActions';
import { authReducer } from './authReducer';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const init = (initialState = null) =>
    ({
      userToken: window.localStorage.getItem('userToken'),
      isAuthenticated: false,
    } || initialState);

  const [userData, dispatch] = React.useReducer(
    authReducer,
    {
      userToken: null,
      isAuthenticated: false,
    },
    init
  );

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

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
