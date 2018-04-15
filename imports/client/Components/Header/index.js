import React, { Component } from 'react';
import Styled from 'styled-components';
import { Link, NavLink } from "react-router-dom";

import config from '/imports/client/config';

import UserWidget from './UserWidget';

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
  padding: 16px ${config.padding.horizontal};
`;

const Logo = Styled.img`
  width: 118px;
  height: 22.5px;
`;

const Language = Styled.div`
  color: #FFF;
  font-size: 12px;
  line-height: 26px;
  width: 26px;
  height: 26px;
  text-transform: uppercase;
  margin: 0 20px;
  border-radius: 3px;
  text-align: center;
  background-color: rgba(0, 0, 0, .06);
`;

const Search = Styled.div`
  flex-grow: 100;
  margin: 0 10px;
  background-color: ${config.colors.primaryLighter};
  display: flex;

  div {
    color: #FFF;
    padding: 0 10px 0 14px;
    flex-shrink: 0;
    display: flex;
    align-items: center;

    i {
      font-size: 22px;
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
      opacity: .85;
    }

    &:focus {
      outline: none;
    }
  }
`;

const Menu = Styled.div`
  display: flex;
  padding: 0 calc(${config.padding.horizontal} - 20px);
  background-color: rgba(0, 0, 0, .06);

  a {
    display: block;
    padding: 0 20px;
    text-decoration: none;

    &:hover {
      background-color: rgba(0, 0, 0, .06);
    }

    span {
      display: block;
      border-bottom: 3px solid transparent;
      padding: 16px 0;
      font-size: 15px 0;
      line-height: 1;
      color: ${config.colors.primaryContrast};
    }

    &.active span {
      border-color: rgba(255, 255, 255, .95);
    }
  }
`;


export default class HeaderComponent extends Component {
  render() {
    const insidePathnames = (match, loc, pathnames = []) => {
      let insideMatch = false;

      pathnames.forEach(pathname => {
        if (loc.pathname.includes(pathname)) {
          insideMatch = true;
        }
      })

      return Boolean(match) || insideMatch;
    };

    return (
      <Header>
        <Brand>
          <Link to="/">
            <Logo src="/logo-brand.svg" />
          </Link>

          <Language>
            EN
          </Language>

          <Search>
            <div><i className="material-icons">search</i></div>
            <input placeholder="Search for symbols" />
          </Search>

          <UserWidget />
        </Brand>

        <Menu>
          <NavLink
            to="/screen"
            isActive={(m, l) => insidePathnames(m, l, ['/view'])}
            activeClassName="active"
          >
            <span>Screener</span>
          </NavLink>

          <NavLink to="/alerts" activeClassName="active">
            <span>Alerts</span>
          </NavLink>
        </Menu>
      </Header>
    );
  }
}
