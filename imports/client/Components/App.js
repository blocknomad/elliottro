import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: config.colors.primary,
    accent1Color: config.colors.accent,
    textColor: config.colors.text,
  },
});

export default class AppComponent extends Component {
  state = {
    sidebar: true,
  }

  render() {
    const { sidebar } = this.state;

    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Switch>
            <Page exact path="/" component={Home} sidebar={sidebar} handleSideBarToggle={this.handleSideBarToggle} />
            <Page path="/alerts" component={Alerts} sidebar={sidebar} handleSideBarToggle={this.handleSideBarToggle} />
            <Page path="/screen/:slug?" component={Screen} sidebar={sidebar} handleSideBarToggle={this.handleSideBarToggle} />
            <Page path="/view/:slug?" component={View} sidebar={sidebar} handleSideBarToggle={this.handleSideBarToggle} />
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

  handleSideBarToggle = () => {
    this.setState({ sidebar: !this.state.sidebar });
  }
}
