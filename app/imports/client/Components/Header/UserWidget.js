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
	Button,
} from '@material-ui/core';

// Styled components

const UserWidget = Styled.div`
  margin-left: 30px;
`;

const User = Styled.div`
  cursor: pointer;
  height: 45px;
  width: 45px;
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
			<div style={{ margin: '6px 0'}}>
				<Link to="/signin" style={{ marginRight: 15 }}>
					<Button color="secondary">
						Sign in
				</Button>
				</Link>
				<Link to="/signup">
					<Button variant="contained" color="secondary">
						Sign up
				</Button>
				</Link>
			</div> :

			<UserWidget>
				<User
					innerRef={r => this.userInfo = r}
					onClick={this.handleClick}
				>
					{user.emails[0].address.charAt(0)}
				</User>

				<Menu
					desktop="true"
					open={this.state.open}
					anchorEl={this.userInfo}
					onClose={this.handleRequestClose}
				>
					<Link to="/subscription" onClick={() => this.setState({ open: false })}>
						<MenuItem>Subscription</MenuItem>
					</Link>
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
	}
}

export default UserContainer(UserWidgetComponent);
