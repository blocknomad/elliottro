import React, { Component } from 'react';
import Styled from 'styled-components';
import { withRouter } from 'react-router';

import Spinner from '/imports/client/Components/Reusable/Spinner';

import Table from './Table';
import Grid from './Grid';

import config from '/imports/client/config';
import {
	IconButton,
} from '@material-ui/core';

import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ScreenSimplified from '../ScreenSimplified';

// Styled components

const View = Styled.section`
  width: 100%;
  min-height: 60vh;
  box-sizing: border-box;
  padding: ${config.padding.vertical} ${config.padding.horizontal};
`;

const Results = Styled.section`
  position: relative;
  min-height: 250px;
`;

const Controller = Styled.div`
  display: flex;
  align-items: center;
`;

const Stats = Styled.p`
  font-size: 1rem;
  color: #444;
  flex-grow: 100;
`;

const NoMatches = Styled.div`
	font-size: 2rem;
	color: #000000aa;
	text-align: center;
	margin-top: 150px;
`;

class ViewComponent extends Component {
	constructor(props) {
		super();

		const { search } = props.history.location;
		const params = new URLSearchParams(search);

		this.state = {
			viewType: 'grid',
			loading: true,
			matches: [],
			screen: {
				timeframe: params.get('timeframe'),
				exchanges: params.get('exchanges') && params.get('exchanges').split(','),
				quoteAssets: params.get('quoteAssets') && params.get('quoteAssets').split(','),
			},
		};

		Meteor.call('screen', this.state.screen, (error, response) => {
			this.setState({ loading: false, ...response });
		});
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	componentWillReceiveProps(nextProps) {
		const { search } = nextProps.history.location;
		const params = new URLSearchParams(search);

		if (
			params.get('timeframe') !== this.state.screen.timeframe ||
			params.get('exchanges') !== this.state.screen.exchanges ||
			params.get('quoteAssets') !== this.state.screen.quoteAssets
		) {
			this.setState({
				loading: true,
				screen: {
					timeframe: params.get('timeframe'),
					exchanges: params.get('exchanges') && params.get('exchanges').split(','),
					quoteAssets: params.get('quoteAssets') && params.get('quoteAssets').split(','),
				},
			})

			Meteor.call('screen', this.state.screen, (error, response) => {
				this.setState({ loading: false, ...response });
			});
		}
	}

	render() {
		const {
			viewType,
			loading,
			matches,
			screen,
		} = this.state;

		return (
			<>
				<div style={{ backgroundColor: config.colors.primary, borderTop: '1px solid #00000022', padding: `20px ${config.padding.horizontal}` }}>
					<ScreenSimplified />
				</div>
				<View>
					<Results>
						{loading ?
							<Spinner /> :
							matches.length > 0 ?
								<>
									<Controller>
										<Stats>
											<span>{matches.length} match{matches.length !== 1 && 'es'} found</span>
										</Stats>

										<IconButton
											tooltip={viewType === 'grid' ? 'Table view' : 'Grid view'}
											onClick={this.handleViewTypeChange}
										>
											{viewType === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
										</IconButton>
									</Controller>
									{viewType === 'grid' ?
										<Grid matches={matches} timeframe={screen.timeframe} /> :
										<Table matches={matches} timeframe={screen.timeframe} />}
								</> :
								<NoMatches>
									No matches found :(
								</NoMatches>
						}
					</Results>
				</View>
			</>
		);
	}

	handleViewTypeChange = () => {
		const viewType = this.state.viewType === 'grid' ? 'list' : 'grid';
		this.setState({ viewType });
	}
};

export default withRouter(ViewComponent);
