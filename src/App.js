import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { CreateSpace } from './pages/CreateSpace';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Fonts } from './components/Fonts';
import { Spaces } from './pages/Spaces';
import { Projects } from './pages/Projects';
import { PrivateRoute } from './PrivateRoute';
import { AuthProvider } from './contexts/auth/authContext';
import Kanban from './pages/Kanban';
import RegisterSuccess from './components/dialogs/RegisterSuccess';

const theme = extendTheme({
  fonts: {
    body: 'Montserrat',
  },
});

function App() {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <AuthProvider>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/register-success" component={RegisterSuccess} />

            <QueryClientProvider client={queryClient}>
              <PrivateRoute path="/createspace" component={CreateSpace} />
              <PrivateRoute path="/spaces" component={Spaces} />

              <PrivateRoute
                exact
                path="/:spaceName/projects"
                component={Projects}
              />
              <PrivateRoute
                exact
                path="/:spaceName/:projectName/board"
                component={Kanban}
              />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </AuthProvider>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
