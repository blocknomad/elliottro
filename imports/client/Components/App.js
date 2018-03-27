import React, { Component } from 'react';
import Styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from './Header';
import Screener from './Screener';

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
`

export default class AppComponent extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <App>
          <Header />
          <Screener />
        </App>
      </MuiThemeProvider>
    );
  }
}
