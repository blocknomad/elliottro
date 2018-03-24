import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

// Styled components

const Header = Styled.header`
  width: 100%;
  box-sizing: border-box;
  background-color: ${config.colors.primary};
  z-index: 100;
`

const Brand = Styled.div`
  display: flex;
  align-items: center;
  padding: 18px ${config.padding.horizontal};
`

const Logo = Styled.img`
  width: 115px;
  height: 22px;
`

const Menu = Styled.div`
  padding: 12px ${config.padding.horizontal};
  background-color: ${config.colors.primaryDarker};

  a {
    margin-right: 35px;
    font-size: 13px;
    color: ${config.colors.primaryContrast};
    text-decoration: none;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Button = Styled.button`
  padding: 8px 12px;
  font-size: 13px;
  text-transform: uppercase;
  color: ${config.colors.primaryContrast};
  border: none;
`;

const SignIn = Button.extend`
  background-color: transparent;
  margin-right: 12px;
`;

const SignUp = Button.extend`
  background-color: ${config.colors.primaryDarker};
  font-weight: bold;
`;


export default class HeaderComponent extends Component {
  render() {
    return (
      <Header>
        <Brand>
          <Logo src="/logo-brand.svg" />
          <div style={{flexGrow: 100}} />
          <SignIn>Sign in</SignIn>
          <SignUp>Join now</SignUp>
        </Brand>

        <Menu>
          <a href="">Screener</a>
          <a href="">Breakout alerts</a>
        </Menu>
      </Header>
    );
  }
}
