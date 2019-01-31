import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Styled from 'styled-components';
import Lodash from 'lodash';
import { Link } from "react-router-dom";

import config from '/imports/client/config';
import UserContainer from '/imports/client/Containers/user';

import {
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core';

// Styled components

const UserWidget = Styled.div`
  margin-left: 30px;
`;

const User = Styled.div`
  cursor: pointer;
  height: 33px;
  width: 33px;
  border-radius: 50%;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: ${config.colors.primaryLighter};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignIn = Styled(Link)`
  margin-left: 30px;
  color: #FFF;
  font-size: 14px;
  text-transform: uppercase;
  line-height: 1;
  text-decoration: none;

  &:hover {
  }
`;

class UserWidgetComponent extends Component {
  state = {
    open: false,
  }

  render() {
    const { user } = this.props;

    const menuItemStyle = {
      fontSize: 14,
      minWidth: 170,
    };

    return Lodash.isEmpty(user) ?
      <SignIn to="/signin">
        Sign in
      </SignIn> :

      <UserWidget>
        <User
          innerRef={r => this.userInfo = r}
          onClick={this.handleClick}
        >
          {user.username.charAt(0)}
        </User>

        <Menu
          desktop="true"
          open={this.state.open}
          anchorEl={this.userInfo}
          onClose={this.handleRequestClose}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <Divider />
          <MenuItem onClick={this.handleSignOut}>Sign out</MenuItem>
        </Menu>
      </UserWidget>
  }

  handleClick = event => {
    event.preventDefault();

    this.setState({ open: true });
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  handleSignOut = () => {
    Meteor.logout();
    this.props.setSideBar(false);
  }
}

export default UserContainer(UserWidgetComponent);
