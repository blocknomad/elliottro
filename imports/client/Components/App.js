import React, { Component } from 'react';
import Styled from 'styled-components';

import Header from './Header';
import Body from './Body';


// Styled components

const App = Styled.section`
  width: 100%;
`

export default class AppComponent extends Component {
  render() {
    return (
      <App>
        <Header />
        <Body />
      </App>
    );
  }
}
