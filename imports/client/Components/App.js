import React, { Component } from 'react';
import Styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';

import Screen from './Screen';
import SignIn from './SignIn';
import View from './View';

import config from '/imports/client/config';

// Customize mui theme

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: config.colors.primary,
    textColor: '#546E7A',
  },
});


// Styled components

const App = Styled.section`
  width: 100%;
`;


// Page component

const Page = ({ component: Component, blank, ...props }) => (
  <Route {...props} render={renderProps => (
      <App>
        {!blank && <Header />}

        <Component {...renderProps} />

        {!blank && <Footer />}
      </App>
    )}
  />
);

export default class AppComponent extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Switch>
            <Page path="/screen" component={Screen} />
            <Page path="/view" component={View} />
            <Page path="/signin" component={SignIn} blank />
          </Switch>
        </MuiThemeProvider>
      </Router>
    );
  }
}
