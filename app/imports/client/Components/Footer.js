import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

import {
	TextField,
	Button,
	Snackbar
} from '@material-ui/core';

// Styled components

const color = '#acadaf';

const Footer = Styled.footer`
  padding: 4vh ${config.padding.horizontal};
  // background-color: ${config.colors.primaryContrast};
  background-color: #2f2e3c;
`

const About = Styled.div`
  padding: 10px 0;
  color: white;
  padding-bottom: calc(4vh + 10px);

  img {
    margin-bottom: 20px;
    width: 100px;
  }

  p {
    font-size: 12px;
    line-height: 18px;
    max-width: 40%;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;

const NewsletterForm = Styled.form`
	color: white;
	width: 100%;
	max-width: 400px;

	.label {
		font-size: 1rem;
		font-weight: bold;
	}

	[class*="MuiFormControl-root"] {
		margin-top: 25px;
	}

	[class*="MuiInputBase-root"]:after {
		border-color: rgba(0, 0, 0, .3) !important;
	}

	[class*="MuiInputBase-input"], [class*="MuiInput-input"], [class*="MuiFormLabel"] {
		color: white !important;
	}

	[class*="MuiOutlinedInput-notchedOutline"] {
		border-color: white !important;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover, 
	input:-webkit-autofill:focus, 
	input:-webkit-autofill:active  {
		box-shadow: 0 0 0px 1000px #2c2b37 inset !important;
		-webkit-text-fill-color: white !important;
	}
`;

const Copyright = Styled.div`
  font-size: 15px;
  color: white;
  padding: 10px 0;
`;

export default class FooterComponent extends Component {
	constructor(props) {
		super();

		this.state = {
			newsletterEmail: "",
			newsletterEmailError: false,
			newsletterEmailOpen: false,
		}
	}

	render() {
		return (
			<Footer>
				<div style={{ display: 'flex' }}>
					<About>
						<img src="/logo-brand.svg" />
						<p>
							Welcome to <strong>elliott ro</strong>! This is an in-development comprehensible trendline-based cryptocurrency
							screener designed for <strong>active traders</strong>.
						</p>
						<p>
							elliott ro enables you to combine multiple criteria such as <strong>candlestick patterns</strong>, classical <strong>chart patterns</strong>,
							<strong> indicators</strong> (e.g., MACD and RSI) divergences and trends, <strong>price performance</strong> and <strong>volume</strong> to screen symbols
							from major exchanges.
						</p>
						<p>
							Besides screening the cryptomarket, you will also be able to set up <strong>alerts</strong> for the screens you create
							and have notifications delivered in-app and/or on your email.
						</p>
						<p>
							<strong>Disclaimer:</strong> the content provided on this website is purely informational. We take no responsibility for
							any investment decision you make.
						</p>
					</About>
					<NewsletterForm onSubmit={this.handleNewsletterFormSubmit.bind(this)}>
						<p className="label">Subscribe to our newsletter</p>
						<TextField
							error={!!this.state.newsletterEmailError}
							InputProps={{
								name: "email",
							}}
							label="Your email"
							variant="filled"
							fullWidth
							value={this.state.newsletterEmail}
							onChange={this.handleNewsletterFormChange.bind(this)}
							helperText={this.state.newsletterEmailError ? `An error occurred while adding your email to our newsletter: ${this.state.newsletterEmailError}` : undefined}
						/>
						<Button
							variant="contained"
							color="secondary"
							type="submit"
							style={{ marginTop: 20 }}
						>
							Subscribe
            </Button>
					</NewsletterForm>

					<Snackbar
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						variant="success"
						open={this.state.newsletterEmailOpen}
						autoHideDuration={6000}
						onClose={this.handleNewsletterFormSnackbarClose.bind(this)}
						message={<span>Your email has been added to our newsletter list. Thank you!</span>}
					/>
				</div>
				<Copyright>
					<small>&copy; {new Date().getFullYear()} elliottro.com</small>
				</Copyright>
			</Footer>
		);
	}

	handleNewsletterFormSnackbarClose() {
		this.setState({ newsletterEmailOpen: false });
	}

	handleNewsletterFormChange(event) {
		this.setState({ newsletterEmail: event.target.value });
	}

	handleNewsletterFormSubmit(event) {
		event.preventDefault();

		this.setState({ newsletterEmailError: false })

		Meteor.call('newsletter/add', this.state.newsletterEmail, (err) => {
			if (err) {
				console.log(err)
				this.setState({ newsletterEmailError: err.reason })
			} else {
				this.setState({ newsletterEmailError: null, newsletterEmail: '', newsletterEmailOpen: true })
			}
		})
	}
}
