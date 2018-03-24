import React, { Component } from 'react';
import Styled from 'styled-components';

import Header from './Header';
import Screener from './Screener';


// Styled components

const App = Styled.section`
  width: 100%;
`

export default class AppComponent extends Component {
  render() {
    return (
      <App>
        <Header />
        <Screener />
      </App>
    );
  }
}
