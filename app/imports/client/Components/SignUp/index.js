import React, { Component } from 'react';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router';
import SimpleSchema from 'simpl-schema';
import Lodash from 'lodash';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import config from '/imports/client/config';

import Background from '/imports/client/Components/Reusable/Background';

import {
	FormHelperText,
	TextField,
	Button,
	Paper,
} from '@material-ui/core';


// Styled components

const SignUp = Styled.section`
  display: flex;
  justify-content: center;
`;

const Panel = Styled(Paper)`
  padding: 50px;
  background-color: #FFF;
  width: 450px;
  margin-top: 12vh;
  position: relative;
  z-index: 2;

  a {
    color: ${config.colors.primary};
  }
`;

const Logo = Styled.img`
  width: 118px;
`;

const Title = Styled.h1`
  font-size: 18px;
  font-weight: 300;
  margin: 30px 0 10px;
  color: ${config.colors.textSecondary};
`;

const Buttons = Styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  & > * {
    flex-shrink: 0;
  }
`;

const Terms = Styled.span`
  font-size: 13px;
  color: ${config.colors.textSecondary};
`

const Links = Styled.div`
  margin: 30px 0 0;
  font-size: 14px;
  color: ${config.colors.textSecondary};

  p:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const Input = Styled(TextField).attrs({
	fullWidth: true,
	style: { fontSize: 14 },
})``;

class SignUpComponent extends Component {
	state = {
		errors: {},
		submitting: false,
	}

	render() {
		return (
			<SignUp>
				<Background />

				<Panel>
					<Link to="/">
						<Logo src="/logo-brand_black.svg" />
					</Link>

					<Title>Sign up</Title>

					<form onSubmit={this.handleSubmit}>
						<Input
							label="Email"
							inputRef={r => this._email = r}
							error={this.state.errors.email}
							name="email"
						/>
						{this.state.errors.email ? <FormHelperText error>{this.state.errors.email}</FormHelperText> : null}

						<Input
							label="Password"
							type="password"
							inputRef={r => this._password = r}
							error={this.state.errors.password}
							name="password"
							style={{marginTop: 8}}
						/>
						{this.state.errors.password ? <FormHelperText error>{this.state.errors.password}</FormHelperText> : null}

						<div error={this.state.errors.card} style={{ margin: '25px 0 35px' }}>
							<CardElement
								options={{
									style: {
										base: {
											fontSize: '16px',
											color: '#424770',
											'::placeholder': {
												color: '#aab7c4',
											},
										},
										invalid: {
											color: '#9e2146',
										},
									},
								}}
							/>

							{this.state.errors.card ? <FormHelperText error>{this.state.errors.card}</FormHelperText> : null}
						</div>

						<Terms>
							By clicking on “Sign up” you are agreeing to the <Link to="/terms" target="_blank">Terms of Service.</Link>
						</Terms>

						<Buttons>
							<Button
								variant="contained"
								type="submit"
								color="primary"
								disabled={this.state.submitting}
							>
								Sign up for ${Meteor.settings.public.price}/mo
              </Button>
						</Buttons>
					</form>

					<Links>
						<p>Already have an account? Click to <Link to="/signin">sign in.</Link></p>
					</Links>
				</Panel>
			</SignUp>
		);
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		this.setState({ submitting: true })

		const errors = {};

		const email = this._email.value;
		const password = this._password.value;

		const { stripe, elements } = this.props;
		const cardElement = elements.getElement(CardElement);

		const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (stripeError) {
			errors.card = stripeError.message;
		}

		if (Lodash.isEmpty(email)) {
			errors.email = 'This field is required.';
		} else if (SimpleSchema.RegEx.Email.test(email) === false) {
			errors.email = 'Please enter a valid email address.';
		}

		if (Lodash.isEmpty(password)) {
			errors.password = 'This field is required.';
		} else if (password.length < 8) {
			errors.password = 'Password must be at least 8 characters long.';
		}

		if (Lodash.isEmpty(errors)) {
			Meteor.call('user/setup', { email, password, paymentMethod }, error => {
				if (error) {
					if (error.reason.includes('Email')) {
						this.setState({ errors: { email: error.reason } });
					} else if (error.reason.includes('Password')) {
						this.setState({ errors: { password: error.reason } });
					} else {
						alert(error.reason);
					}

					return this.setState({ submitting: false })
				}

				Meteor.loginWithPassword(email, password, (error) => {
					this.setState({ submitting: false })

					if (error) {
						alert(error.reason)
					} else {
						this.props.history.push('/view');
					}
				})
			})
		} else {
			this.setState({ errors, submitting: false });
		}
	}
}

const SignUpComponentWithRouter = withRouter(SignUpComponent)

const InjectedSignUp = () => (
	<ElementsConsumer>
		{({ stripe, elements }) => (
			<SignUpComponentWithRouter stripe={stripe} elements={elements} />
		)}
	</ElementsConsumer>
);

const stripePromise = loadStripe(Meteor.settings.public.stripe_pk);

const SignUpWithStripe = () => {
	return (
		<Elements stripe={stripePromise}>
			<InjectedSignUp />
		</Elements>
	);
};

export default SignUpWithStripe;
