import React, { Component } from 'react';
import Styled from 'styled-components';

import Spinner from './Spinner';
import Table from './Table';
import Grid from './Grid';

import config from '/imports/client/config';

// Styled components

const Results = Styled.section`
  background-color: #fafafa;
  position: relative;
  top: 55px;
  width: calc(100% - 250px);
  min-height: calc(100vh - 55px);
  box-sizing: border-box;
  padding: 0 ${config.padding.horizontal} 20px;
`;

const Header = Styled.section`
  display: flex;
  align-items: center;
  padding: 24px 15px 24px 16px;
`;

const Stats = Styled.p`
  font-size: 13px;
  color: #333;
  font-weight: 200;
  flex-grow: 100;
`;

const Icon = Styled.i`
  font-size: 24px;
  cursor: pointer;
  color: ${config.colors.icon};
  display: ${props => props.active ? 'none' : 'initial'};
`;


export default class ResultsComponent extends Component {
  state = {
    viewType: 'grid',
  }

  render() {
    const {
      loading,
      matches,
      timeframe,
      processingTime,
    } = this.props;

    const { viewType } = this.state;

    return (
      <Results>
        <Header>
          <Stats>
            {!loading && <span>{matches.length} match{matches.length !== 1 && 'es'} found in {processingTime}ms</span>}
          </Stats>

          <Icon
            className="material-icons"
            active={viewType === 'grid'}
            onClick={() => this.handleViewTypeChange('grid')}
            title="Grid view with charts"
          >
            view_module
          </Icon>
          <Icon
            className="material-icons"
            active={viewType === 'list'}
            onClick={() => this.handleViewTypeChange('list')}
            title="List view"
          >
            view_list
          </Icon>
        </Header>

        {loading ?
          <Spinner /> :

          viewType === 'grid' ?
            <Grid matches={matches} timeframe={timeframe} /> :
            <Table matches={matches} />
        }
      </Results>
    );
  }

  handleViewTypeChange = viewType => {
    this.setState({ viewType });
  }
}
