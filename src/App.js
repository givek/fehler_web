import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RegisterForm } from './pages/RegisterForm';
import { LoginForm } from './pages/LoginForm';
import { CreateSpaceForm } from './pages/CreateSpaceForm';

import { Fonts } from './components/Fonts';
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
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/createspace" component={CreateSpaceForm} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
