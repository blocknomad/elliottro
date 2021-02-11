import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Styled from 'styled-components';
import Lodash from 'lodash';
import { withRouter } from 'react-router';
import { Tracker } from 'meteor/tracker';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';
import config from '/imports/client/config';

import QuoteAssets from '/imports/both/fixtures/quoteAssets';
import Exchanges from '/imports/both/fixtures/exchanges';
import Timeframes from '/imports/both/fixtures/timeframes';
import Screens from '/imports/both/collections/screens';

import {
	Checkbox,
	Button,
	InputLabel,
	IconButton,
	Paper,
	TextField,
	Radio,
	RadioGroup,
	Select,
	ListItemText,
	MenuItem,
	FormControl,
	FormControlLabel,
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
	// box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.12) 0px 3px 4px;
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
		margin-right: 10px;
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
				quoteAssets: params.get('quoteAssets') && params.get('quoteAssets').split(',') || ['BTC', 'ETH', 'USD'],
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
						autoWidth
						inputProps={{
							name: 'timeframe',
						}}
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
						// MenuProps={MenuProps}
						renderValue={(selected) => selected.map(exchange => Exchanges[exchange].name).join(', ')}
					>
						<MenuItem value="" disabled>
							Exchange
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
						// MenuProps={MenuProps}
						renderValue={(selected) => selected.map(quoteAsset => QuoteAssets[quoteAsset].name).join(', ')}
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
