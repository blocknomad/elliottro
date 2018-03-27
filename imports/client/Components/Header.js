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
  width: 124px;
  height: 22.5px;
`

const Menu = Styled.div`
  padding: 0 ${config.padding.horizontal};
  background-color: ${config.colors.primaryDarker};

  a {
    display: inline-block;
    padding: 13px 0;
    margin-right: 35px;
    font-size: 14px;
    color: ${config.colors.primaryContrast};
    text-decoration: none;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Button = Styled.button`
  padding: 8px 12px;
  font-size: 14px;
  text-transform: uppercase;
  color: ${config.colors.primaryContrast};
  border: none;
  border-radius: 2px;
`;

const SignIn = Button.extend`
  background-color: transparent;
  margin-right: 12px;
`;

const SignUp = Button.extend`
  background-color: ${config.colors.primaryDarker};
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
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
