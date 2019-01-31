import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';
import { withRouter } from 'react-router';

import Spinner from '/imports/client/Components/Reusable/Spinner';
import IllustrateChartPattern from '/imports/client/Components/Reusable/IllustrateChartPattern';

import Table from './Table';
import Grid from './Grid';

import config from '/imports/client/config';

import QuoteAssets from '/imports/both/fixtures/quoteAssets';
import Exchanges from '/imports/both/fixtures/exchanges';
import Patterns from '/imports/both/fixtures/patterns';
import Timeframes from '/imports/both/fixtures/timeframes';

import {
  Button,
  IconButton,
  Paper,
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/PlaylistAdd';
import AddAlertIcon from '@material-ui/icons/AddAlarm';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

// Styled components

const View = Styled.section`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: ${config.padding.vertical} ${props => props.sidebar ? config.padding.horizontalMin : config.padding.horizontal};
`;

const Results = Styled.section`
  position: relative;
  min-height: 250px;
`;

const Screen = Styled.div`
  width: 100%;
  padding: 20px 20px 10px;
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
  margin-bottom: 15px;
  border: 1px solid ${config.colors.border};
  overflow: hidden;
`;

const Header = Styled.div`
  display: flex;
  align-items: center;

  & > * {
    flex-shrink: 0;
  }
`;

const HeaderTitle = Styled.div`
  font-size: 22px;
  flex-grow: 100;
  padding: 8px 0;
  color: ${config.colors.text};
`;

const ScreenName = Styled.span`
  color: #aaa;
  font-weight: 300;

  span {
    font-style: italic;
  }
`;

const Criterias = Styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  margin: 10px 0 0;
`;

const Criteria = Styled.div`
  display: flex;
  padding: 6px 0;
  font-size: 13px;

  div:first-child {
    color: ${config.colors.textLighter};
    width: 200px;
  }

  div:last-child {
    color: ${config.colors.text};
  }
`;

const Controller = Styled.div`
  display: flex;
  align-items: center;
`;

const Stats = Styled.p`
  font-size: 13px;
  color: ${config.colors.text};
  flex-grow: 100;
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
        name: decodeURIComponent(params.get('name')),
        timeframe: params.get('timeframe'),
        exchanges: params.get('exchanges') && params.get('exchanges').split(','),
        quoteAssets: params.get('quoteAssets') && params.get('quoteAssets').split(','),
        range: params.get('range') && Number(params.get('range')),
        chart: {
          type: params.get('chartType'),
          pattern: params.get('chartPattern'),
        },
      },
    };

    Meteor.call('screen', this.state.screen, (error, response) => {
      this.setState({ loading: false, ...response });
    });
  }


  render() {
    const {
      viewType,
      loading,
      matches,
      screen,
    } = this.state;

    return (
      <View sidebar={this.props.sidebar}>
        <Screen>
          <Header>
            <HeaderTitle>
              Screen: &nbsp;
              <ScreenName>
                {screen.name ? screen.name : <span>Unnamed screen</span>}
              </ScreenName>
            </HeaderTitle>

            <IconButton
              tooltip="Create alert"
            >
              <AddAlertIcon />
            </IconButton>

            <IconButton
              tooltip="Save screen"
            >
              <SaveIcon />
            </IconButton>

            <Button
              color="primary"
              variant="contained"
              onClick={this.handleEditScreen}
            >
              <EditIcon/> Edit screen
            </Button>
          </Header>

          <Criterias>
            <Criteria>
              <div>Timeframe</div>
              <div>{Timeframes[screen.timeframe].name}</div>
            </Criteria>

            <Criteria>
              <div>Exchanges</div>
              <div>{(Lodash.map(screen.exchanges, e => Exchanges[e].name)).join(', ')}</div>
            </Criteria>

            <Criteria>
              <div>Quote assets</div>
              <div>{(Lodash.map(screen.quoteAssets, q => QuoteAssets[q].name)).join(', ')}</div>
            </Criteria>

            <Criteria>
              <div>Range</div>
              <div>Last {screen.range} candlesticks</div>
            </Criteria>

            {
              screen.chart.pattern && <Criteria>
                <div>Chart pattern</div>
                <div title={Patterns[screen.chart.type][screen.chart.pattern].name}>
                  {IllustrateChartPattern(screen.chart.pattern)}
                </div>
              </Criteria>
            }
          </Criterias>

          <Controller>
            <Stats>
              {!loading && <span>{matches.length} match{matches.length !== 1 && 'es'} found</span>}
            </Stats>

            <IconButton
              tooltip={viewType === 'grid' ? 'Table view' : 'Grid view'}
              onClick={this.handleViewTypeChange}
            >
              {viewType === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
            </IconButton>
          </Controller>
        </Screen>

        <Results>
          {loading ?
            <Spinner /> :

            viewType === 'grid' ?
              <Grid matches={matches} timeframe={screen.timeframe} /> :
              <Table matches={matches} timeframe={screen.timeframe} />
          }
        </Results>
      </View>
    );
  }

  handleViewTypeChange = () => {
    const viewType = this.state.viewType === 'grid' ? 'list' : 'grid';
    this.setState({ viewType });
  }

  handleEditScreen = () => {
    this.props.history.push(`/screen/${this.props.history.location.search}`);
  }
};

export default withRouter(ViewComponent);
