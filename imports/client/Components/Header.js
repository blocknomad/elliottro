import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

import {
  FlatButton,
  RaisedButton,
} from 'material-ui';

// Styled components

const Header = Styled.header`
  width: 100%;
  box-sizing: border-box;
  background-color: ${config.colors.primaryLighter};
  z-index: 100;
`

const Brand = Styled.div`
  display: flex;
  align-items: center;
  padding: 18px ${config.padding.horizontal};
`

const Logo = Styled.img`
  width: 130px;
  height: 25px;
`

const Menu = Styled.div`
  display: flex;
  padding: 0 ${config.padding.horizontal};
  background-color: ${config.colors.primary};

  a {
    display: block;
    padding: 12px 0;
    margin-right: 35px;
    font-size: 14px;
    line-height: 1;
    color: ${config.colors.primaryContrast};
    text-decoration: none;

    &:last-child {
      margin-right: 0;
    }
  }
`;


export default class HeaderComponent extends Component {
  render() {
    return (
      <Header>
        <Brand>
          <Logo src="/logo-brand.svg" />

          <div style={{flexGrow: 100}} />

          <FlatButton label="Sign in" style={{marginRight: 12, color: 'white'}} />
          <RaisedButton label="Join now" primary={true} />
        </Brand>

        <Menu>
          <a href="">
            Screener
          </a>

          <a href="">
            Alerts
          </a>
        </Menu>
      </Header>
    );
  }
}
