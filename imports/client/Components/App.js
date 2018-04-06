import React, { Component } from 'react';
import Styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';

import Alerts from './Alerts';
import Home from './Home';
import Screen from './Screen';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Terms from './Terms';
import View from './View';

import config from '/imports/client/config';

// Customize mui theme

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: config.colors.primary,
    textColor: config.colors.text,
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
            <Page exact path="/" component={Home} />
            <Page path="/alerts" component={Alerts} />
            <Page path="/screen" component={Screen} />
            <Page path="/view" component={View} />
            <Page path="/signin" component={SignIn} blank />
            <Page path="/signup" component={SignUp} blank />
            <Page path="/terms" component={Terms} blank />
          </Switch>
        </MuiThemeProvider>
      </Router>
    );
  }
}
