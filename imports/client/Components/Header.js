import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

// Styled components

const Header = Styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 55px;
  box-sizing: border-box;
  padding: 1% ${config.padding.horizontal};
  border: 1px solid ${config.colors.border};
  position: fixed;
  top: 0;
  left: 0;
`

const Logo = Styled.img`
  width: 107px;
  height: 20.5px;
`

const Menu = Styled.div`
  padding-left: 50px;

  a {
    margin-right: 35px;
    font-size: 12px;
    color: ${config.colors.text};
    text-decoration: none;
    opacity: .7;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      opacity: 1;
    }
  }
`;

export default class HeaderComponent extends Component {
  render() {
    return (
      <Header>
        <Logo src="/logo-brand.svg" />

        <Menu>
          <a href="">Home</a>
          <a href="">Screener</a>
          <a href="">Breakout alerts</a>
          <a href="">Contact</a>
        </Menu>
      </Header>
    );
  }
}
