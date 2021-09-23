import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { CreateSpace } from './pages/CreateSpace';

import { Fonts } from './components/Fonts';
import { Spaces } from './pages/Spaces';
import { Projects } from './pages/Projects';
import { PrivateRoute } from './PrivateRoute';

const theme = extendTheme({
  fonts: {
    body: 'Montserrat',
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/createspace" component={CreateSpace} />
            <PrivateRoute path="/spaces" component={Spaces} />
            <PrivateRoute path="/projects" component={Projects} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
