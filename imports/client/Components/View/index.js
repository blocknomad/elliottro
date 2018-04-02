import React, { Component } from 'react';
import Styled from 'styled-components';
import { withRouter } from 'react-router';

import Spinner from '/imports/client/Components/Reusable/Spinner';
import Table from './Table';
import Grid from './Grid';

import config from '/imports/client/config';


// Styled components

const Results = Styled.section`
  width: 100%;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  padding: 30px ${config.padding.horizontal};
`;

const Header = Styled.section`
  display: flex;
  align-items: center;
  padding: 2vw 25px;
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


class ViewComponent extends Component {
  state = {
    viewType: 'grid',
    loading: true,
    matches: [],
  }

  render() {
    const {
      viewType,
      loading,
      matches,
    } = this.state;

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
            <Table matches={matches} timeframe={timeframe} />
        }
      </Results>
    );
  }

  handleViewTypeChange = viewType => {
    this.setState({ viewType });
  }
};

export default withRouter(ViewComponent);
