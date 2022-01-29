import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './contexts/auth/authContext';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userData } = useAuth();
  const { isAuthenticated, isLoading } = userData;

  return (
    <Route
      {...rest}
      render={props =>
        !isLoading ? (
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        ) : (
          <Spinner />
        )
      }
    />
  );
};
