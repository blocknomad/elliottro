import React, { Component } from "react";
import Styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

import config from "/imports/client/config";

import UserWidget from "./UserWidget";

import { FlatButton, Button } from "@material-ui/core";

// Styled components

const Header = Styled.header`
  width: 100%;
  box-sizing: border-box;
  background-color: ${config.colors.primary};
  // box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.12) 0px 3px 4px;
	z-index: 100;
	padding: 24px ${config.padding.horizontal};
`;

const Brand = Styled.div`
  display: flex;
  align-items: center;
`;

const Logo = Styled.img`
  width: 118px;
  height: 22.5px;
`;

const State = Styled.div`
  color: #FFF;
	font-size: 11px;
	line-height: 1;
	padding: 5px 10px
  text-transform: uppercase;
  margin: 0 20px;
  border-radius: 4px;
	background-color: ${config.colors.primaryLighter};
`;

const Nav = Styled.nav`
	flex-grow: 1;
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
    padding: 0 ${config.padding.horizontalMin};
    text-decoration: none;

    &:hover {
      background-color: rgba(0, 0, 0, .06);
    }

    span {
      display: block;
      border-bottom: 4px solid transparent;
      padding: 16px 0;
      font-size: 15px 0;
      line-height: 1;
      color: ${config.colors.primaryContrast};
    }

    &.active span {
      border-color: #FFF;
    }
  }
`;

export default class HeaderComponent extends Component {
  render() {
    const insidePathnames = (match, loc, pathnames = []) => {
      let insideMatch = false;

      pathnames.forEach((pathname) => {
        if (loc.pathname.includes(pathname)) {
          insideMatch = true;
        }
      });

      return Boolean(match) || insideMatch;
    };

    return (
      <Header>
        <Brand>
          <Link to="/">
            <Logo src="/logo-brand.svg" />
          </Link>

          <State>Beta</State>

          <Nav></Nav>
          {/* <Search>
            <div><i className="material-icons">search</i></div>
            <input placeholder="Search for symbols" />
          </Search> */}

          <UserWidget />
        </Brand>

        {/* <Menu>
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
        </Menu> */}
      </Header>
    );
  }
}
