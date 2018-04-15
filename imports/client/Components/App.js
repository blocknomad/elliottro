import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';

import Alerts from './Alerts';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import ResetPassword from './ResetPassword';
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

const Page = ({
  component: Component,
  blank,
  onlyLoggedOut = false,
  onlyLoggedIn = false,
  ...props
}) =>

  <Route {...props} render={renderProps => {
    // if the route is limited for logged out users and there's a logged in user, redirect
    // if the route is limited for logged in users and there's a logged out user, redirect

    const isLoggedIn = Meteor.user() || Meteor.loggingIn();

    if (
      (onlyLoggedOut && isLoggedIn) ||
      (onlyLoggedIn && isLoggedIn === false)
    ) {
     return <Redirect to="/" />;
    }

    // otherwise, act naturally

    return (
      <App>
        {!blank && <Header />}

        <Component {...renderProps} />

        {!blank && <Footer />}
      </App>
    )
  }} />

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
            <Page path="/signin" component={SignIn} onlyLoggedOut blank />
            <Page path="/signup" component={SignUp} onlyLoggedOut blank />
            <Page path="/forgot-password" component={ForgotPassword} onlyLoggedOut blank />
            <Page path="/reset-password/:token" component={ResetPassword} onlyLoggedOut blank />
            <Page path="/terms" component={Terms} blank />
          </Switch>
        </MuiThemeProvider>
      </Router>
    );
  }
}
