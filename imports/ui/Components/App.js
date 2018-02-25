import React, { Component } from 'react';
import Styled from 'styled-components';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';


// Styled components

const App = Styled.section`
  width: 100%;
`

// App component - represents the whole app
export default class AppComponent extends Component {
  render() {
    return (
      <App>
        <Header />
        <Body />
        <Footer />
      </App>
    );
  }
}
