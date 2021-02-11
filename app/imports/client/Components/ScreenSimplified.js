import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';
import { withRouter } from 'react-router';
import QueryBuilder from '@material-ui/icons/QueryBuilder';
import AccountBalance from '@material-ui/icons/AccountBalance';
import CompareArrows from '@material-ui/icons/CompareArrows';

import config from '/imports/client/config';

import QuoteAssets from '/imports/both/fixtures/quoteAssets';
import Exchanges from '/imports/both/fixtures/exchanges';
import Timeframes from '/imports/both/fixtures/timeframes';

import {
	Checkbox,
	Button,
	Select,
	ListItemText,
	MenuItem,
} from '@material-ui/core';

// Styled components

const Screen = Styled.section`
  width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
  // padding: ${config.padding.vertical} ${config.padding.horizontal};
`;

const Form = Styled.form`
	width: 100%;
	background-color: ${config.colors.primaryLighter};
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr auto;

	label {
		color: white;
	}

	div[class^="MuiSelect-select"] {
		padding: 20px 20px;
		color: white;
	}

	[class*="MuiSelect-icon"] {
		fill: white !important;
		margin-right: 20px;
	}

	[class*="MuiInput-underline"]:before {
		border-color: rgba(0, 0, 0, .25) !important;
	}
`;

class ScreenComponent extends Component {
	constructor(props) {
		super(props);

		const { search } = props.history.location;
		const params = new URLSearchParams(search);

		this.state = {
			screen: {
				timeframe: params.get('timeframe') || 'H1',
				exchanges: params.get('exchanges') && params.get('exchanges').split(',') || ['BINA'],
				quoteAssets: params.get('quoteAssets') && params.get('quoteAssets').split(',') || ['BTC'],
			},
		};
	}

	render() {
		const { screen } = this.state;

		const labelStyle = {
			fontSize: 13,
		};

		return (
			<Screen>
				<Form>
					<Select
						onChange={event => this.handleChange('timeframe', event.target.value)}
						value={screen.timeframe}
						inputProps={{
							name: 'timeframe',
						}}
						IconComponent={QueryBuilder}
					>
						<MenuItem value="" disabled>
							Timeframe
						</MenuItem>
						{Lodash.map(Timeframes, ({ name }, key) => <MenuItem key={key} value={key}>{name}</MenuItem>)}
					</Select>
					<Select
						multiple
						value={screen.exchanges}
						onChange={event => this.handleChange('exchanges', event.target.value)}
						renderValue={(selected) => selected.map(exchange => Exchanges[exchange].name).join(', ')}
						IconComponent={AccountBalance}
					>
						<MenuItem value="" disabled>
							Exchanges
							</MenuItem>
						{Lodash.map(Exchanges, ({ name, status }, key) => (
							<MenuItem key={key} value={key} disabled={status === 1}>
								<Checkbox color="primary" checked={Lodash.includes(screen.exchanges, key)} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
					<Select
						multiple
						value={screen.quoteAssets}
						onChange={event => this.handleChange('quoteAssets', event.target.value)}
						renderValue={(selected) => selected.map(quoteAsset => QuoteAssets[quoteAsset].name).join(', ')}
						IconComponent={CompareArrows}
					>
						<MenuItem value="" disabled>
							Quote assets
						</MenuItem>
						{Lodash.map(QuoteAssets, ({ name, status }, key) => (
							<MenuItem key={key} value={key} disabled={status === 1}>
								<Checkbox color="primary" checked={Lodash.includes(screen.quoteAssets, key)} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>

					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={this.handleRun}
						style={{ lineHeight: '24px' }}
					>
						Search
					</Button>
				</Form>
			</Screen>
		);
	}

	handleChange = (name, value) => {
		if (name) {
			this.setState({
				screen: {
					...this.state.screen,
					[name]: value
				}
			});
		}
	}

	handleRun = () => {
		const { screen } = this.state;
		const query = `timeframe=${screen.timeframe}&exchanges=${screen.exchanges}&quoteAssets=${screen.quoteAssets}`;

		this.props.history.push(`/view/?${query}`);
	}
};

export default withRouter(ScreenComponent);
