import React, { Component } from 'react';
import Styled from 'styled-components';

import Header from './Header';
import Body from './Body';


// Styled components

const Footer = Styled.section`
  width: 100%;
  text-align: center;
  padding: 4%;
  margin-top: 4%;
  font-size: 13px;
  color: #37474F;
  box-sizing: border-box;
`

// App component - represents the whole app
export default class FooterComponent extends Component {
  render() {
    return (
      <Footer>
        Copyright &copy; {new Date().getFullYear()} Elliottro. All Rights Reserved.
      </Footer>
    );
  }
}
