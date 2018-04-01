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
  background-color: ${config.colors.primary};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.12) 0px 3px 4px;
  z-index: 100;
`;

const Brand = Styled.div`
  display: flex;
  align-items: center;
  padding: 18px ${config.padding.horizontal};
`;

const Logo = Styled.img`
  width: 124px;
  height: 22.5px;
`;

const Language = Styled.div`
  color: #FFF;
  font-size: 13px;
  line-height: 1;
  margin: 0 30px;
`;

const Search = Styled.div`
  flex-grow: 100;
  margin: 0 10px;
  background-color: ${config.colors.primaryLighter};
  display: flex;

  div {
    color: #FFF;
    padding: 0 13px;
    flex-shrink: 0;
    display: flex;
    align-items: center;

    i {
      font-size: 20px;
    }
  }

  input {
    color: #FFF;
    font-size: 14px;
    line-height: 1;
    padding: 13px;
    flex-grow: 100;
    background-color: transparent;
    border: none;

    &::placeholder {
      color: #FFF;
      opacity: .75;
    }

    &:focus {
      outline: none;
    }
  }
`;

const SignIn = Styled.a`
  color: #FFF;
  font-size: 14px;
  text-transform: uppercase;
  line-height: 1;
  margin-left: 30px;
  text-decoration: none;

  &:hover {
  }
`;

const Menu = Styled.div`
  display: flex;
  padding: 0 ${config.padding.horizontal};

  a {
    display: block;
    padding: 14px 0;
    margin-right: 35px;
    font-size: 15px;
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

          <Language>
            EN
          </Language>

          <Search>
            <div><i className="material-icons">search</i></div>
            <input placeholder="Search for symbols" />
          </Search>

          <SignIn href="">
            Sign in
          </SignIn>
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
