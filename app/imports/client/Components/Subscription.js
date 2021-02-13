import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Styled from 'styled-components';
import { withRouter } from 'react-router';

import config from '/imports/client/config';
import {
	Typography,
	Paper,
	Button,
	CircularProgress,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Styled components

const Subscription = Styled.section`
  width: 100%;
  min-height: 60vh;
  box-sizing: border-box;
  padding: ${config.padding.vertical} ${config.padding.horizontal};
`;

class SubscriptionComponent extends Component {
	state = {
		dialogOpen: false,
		cancellingSubscription: false,
		cancelledSubscription: false,
	}

	render() {
		return (
			<Subscription>
				<Paper style={{ padding: '30px', margin: '30px 0' }} elevation={1}>
					<Typography variant="h4" component="h1">
						Subscription
					</Typography>
					<Typography variant="subtitle1" style={{ marginTop: '15px' }} color="textSecondary">
						${Meteor.settings.public.price}/mo
					</Typography>
					<Button color="primary" variant="contained" style={{ marginTop: 30 }} onClick={this.handleOpen.bind(this)}>Cancel subscription</Button>
				</Paper>

				<Dialog
					open={this.state.dialogOpen}
					onClose={this.handleClose.bind(this)}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">{this.state.cancelledSubscription ? 'Your subscription has been cancelled' : `Cancel${this.state.cancellingSubscription ? 'ling' : ''} subscription`}</DialogTitle>
					<DialogContent>
						{this.state.cancellingSubscription ?
							<div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
								<CircularProgress color="primary" size={30} thickness={5} />
							</div> :
							<DialogContentText>
								{this.state.cancelledSubscription ? 'Logging you out...' : 'Are you sure you would like to cancel your Pattern Dog subscription?'}
            </DialogContentText>}
					</DialogContent>
					{this.state.cancellingSubscription === false && this.state.cancelledSubscription === false ?
						<DialogActions>
							<Button onClick={this.handleSubscriptionCancelling.bind(this)} color="primary" autoFocus>
								Yes
            </Button>
							<Button onClick={this.handleClose.bind(this)} color="primary">
								No
            </Button>
						</DialogActions> : null}
				</Dialog>
			</Subscription>
		);
	}

	handleOpen() {
		this.setState({ dialogOpen: true })
	}

	handleClose() {
		this.setState({ dialogOpen: false })
	}

	handleSubscriptionCancelling() {
		this.setState({ cancellingSubscription: true })

		Meteor.call('user/cancelSubscription', (err) => {
			this.setState({ cancellingSubscription: false })
			
			if (err) {
				alert(JSON.stringify(err.reason));
			} else {
				this.setState({ cancelledSubscription: true })
				
				Meteor.setTimeout(() => {
					Meteor.logout(() => {
						this.props.history.push("/");
					});
				}, 3000)
			}
		})
	}
};

export default withRouter(SubscriptionComponent);
