import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Styled from 'styled-components';
import Lodash from 'lodash';
import { Link } from "react-router-dom";

import config from '/imports/client/config';
import UserContainer from '/imports/client/Containers/user';

import {
  Popover,
  Menu,
  MenuItem,
  Divider,
} from 'material-ui';

// Styled components

const UserWidget = Styled.div`
  margin-left: 30px;
  width: 170px;
`;

const UserInfo = Styled.div`
  height: 43px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, .06);
  }
`;

const UserPic = Styled.div`
  height: 33px;
  width: 33px;
  border-radius: 50%;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: ${config.colors.primaryLighter};
  color: #FFF;
  margin-right: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserName = Styled.div`
  color: #FFF;
  font-size: 14px;
  margin-right: 5px;
  flex-grow: 100;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Arrow = Styled.i.attrs({
  className: 'material-icons'
})`
  color: #FFF;
  flex-shrink: 0;
  transition: .2s;

  ${props => props.open && 'transform: rotate(180deg);'}
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
        <UserInfo
          innerRef={r => this.userInfo = r}
          onClick={this.handleClick}
        >
          <UserPic>
            {user.username.charAt(0)}
          </UserPic>

          <UserName>
            {user.username}
          </UserName>

          <Arrow open={this.state.open}>
            arrow_drop_down
          </Arrow>
        </UserInfo>

        <Popover
          open={this.state.open}
          anchorEl={this.userInfo}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu desktop={true}>
            <MenuItem
              style={menuItemStyle}
              primaryText="Profile"
            />
            <MenuItem
              style={menuItemStyle}
              primaryText="Settings"
            />
            <Divider />
            <MenuItem
              style={menuItemStyle}
              primaryText="Sign out"
              onClick={this.handleSignOut}
            />
          </Menu>
        </Popover>
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
  }
}

export default UserContainer(UserWidgetComponent);
