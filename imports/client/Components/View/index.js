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
  RaisedButton,
  IconMenu,
  MenuItem,
  IconButton,
  Paper,
} from 'material-ui';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SaveIcon from 'material-ui/svg-icons/av/playlist-add';
import AddAlertIcon from 'material-ui/svg-icons/alert/add-alert';

// Styled components

const Results = Styled.section`
  width: 100%;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  padding: 30px ${config.padding.horizontal};
`;

const Screen = Styled(Paper)`
  width: 100%;
  padding: 20px 20px 10px;
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
  margin-bottom: 15px;
`;

const Header = Styled.div`
  display: flex;
  align-items: center;

  & > * {
    flex-shrink: 0;
  }
`;

const ScreenName = Styled.div`
  font-size: 22px;
  flex-grow: 100;
  padding: 8px;
  color: ${config.colors.text};

  span {
    color: #aaa;
    font-weight: 300;
  }
`;

const EditIcon = Styled.i.attrs({
  className: 'material-icons',
})`
  color: #FFF;
  vertical-align: text-top !important;
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
      <Results>
        <Screen>
          <Header>
            <svg height="36" width="50" style={{marginRight: 20}}>
              <rect
                width="50"
                height="35"
                strokeWidth="2"
                stroke="#888"
                fill="#f8f8f8"
              />

              <path
                d="M 10 30 L 15.5 22 L 21 26 L 26.5 14 L 32.5 19 L 40 8"
                stroke={config.colors.secondary}
                strokeWidth="2"
                fill="none"
              />
            </svg>

            <ScreenName>
              {screen.name ? screen.name : <span>Unnamed screen</span>}
            </ScreenName>

            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              style={{padding: '0 10px'}}
            >
              <MenuItem
                primaryText="Save screen"
                style={{fontSize: 14}}
                leftIcon={<SaveIcon />}
              />
              <MenuItem
                primaryText="Create alert"
                style={{fontSize: 14}}
                leftIcon={<AddAlertIcon />}
              />
            </IconMenu>

            <RaisedButton
              label="Edit Screen"
              primary={true}
              onClick={this.handleEditScreen}
              style={{lineHeight: '24px'}}
              icon={<EditIcon>mode_edit</EditIcon>}
            />
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
              iconClassName="material-icons"
              tooltip={viewType === 'grid' ? 'Table view' : 'Grid view'}
              onClick={this.handleViewTypeChange}
            >
              {viewType === 'grid' ? 'view_list' : 'view_module'}
            </IconButton>
          </Controller>
        </Screen>

        {loading ?
          <Spinner /> :

          viewType === 'grid' ?
            <Grid matches={matches} timeframe={screen.timeframe} /> :
            <Table matches={matches} timeframe={screen.timeframe} />
        }
      </Results>
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
