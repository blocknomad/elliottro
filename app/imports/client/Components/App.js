import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { teal, cyan } from '@material-ui/core/colors';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Tracker } from 'meteor/tracker';

import Page from './Page';

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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: config.colors.primaryLighter,
      main: config.colors.primary,
      dark: config.colors.primary,
      contrastText: 'white',
    },
    accent1Color: config.colors.accent,
    textColor: config.colors.text,
  },
  typography: {
    useNextVariants: true,
  },
})

export default class AppComponent extends Component {
  state = {
    sidebar: false,
  }

  render() {
    const { sidebar } = this.state;

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Page exact path="/" component={Home} sidebar={sidebar} handleSideBarToggle={this.hSBT} setSideBar={this.sSB} />
            <Page path="/alerts" component={Alerts} sidebar={sidebar} handleSideBarToggle={this.hSBT} setSideBar={this.sSB} />
            <Page path="/screen/:slug?" component={Screen} sidebar={sidebar} handleSideBarToggle={this.hSBT} setSideBar={this.sSB} />
            <Page path="/view/:slug?" component={View} sidebar={sidebar} handleSideBarToggle={this.hSBT} setSideBar={this.sSB} />

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

  /* handle side bar toggle */

  hSBT = () => {
    this.setState({ sidebar: !this.state.sidebar });
  }

  /* set side bar */

  sSB = sidebar => {
    this.setState({ sidebar })
  }
}
