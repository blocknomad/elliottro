import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';


// Styled components

const Footer = Styled.section`
  width: 100%;
  text-align: center;
  padding: 4%;
  font-size: 13px;
  color: #fff;
  background-color: ${config.colors.primary};
  box-sizing: border-box;
`

// App component - represents the whole app
export default class FooterComponent extends Component {
  render() {
    return (
      <Footer>
        <span>Copyright &copy; {new Date().getFullYear()} Elliottro. All Rights Reserved.</span>
      </Footer>
    );
  }
}
