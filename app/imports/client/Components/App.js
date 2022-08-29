import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Page from "./Page";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Subscription from "./Subscription";
import Terms from "./Terms";
import View from "./View";

import config from "/imports/client/config";

// Customize mui theme

const theme = createMuiTheme({
  palette: {
    primary: {
      light: config.colors.primaryLighter,
      main: config.colors.primary,
      dark: config.colors.primary,
      contrastText: "#fff",
    },
    secondary: {
      light: "#fff",
      main: "#fff",
      dark: "#fff",
      contrastText: "#000",
    },
    accent1Color: config.colors.accent,
  },
  typography: {
    useNextVariants: true,
  },
});

export default class AppComponent extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Page exact path="/" component={Home} />
            <Page path="/view/:slug?" component={View} />
            <Page path="/subscription" component={Subscription} />

            <Page path="/signin" component={SignIn} onlyLoggedOut blank />
            <Page path="/signup" component={SignUp} onlyLoggedOut blank />
            <Page
              path="/forgot-password"
              component={ForgotPassword}
              onlyLoggedOut
              blank
            />
            <Page
              path="/reset-password/:token"
              component={ResetPassword}
              onlyLoggedOut
              blank
            />
            <Page path="/terms" component={Terms} blank />
          </Switch>
        </MuiThemeProvider>
      </Router>
    );
  }
}
