import React, { Component } from 'react';
import Styled from 'styled-components';

import Spinner from './Spinner';
import Table from './Table';
import Grid from './Grid';

import config from '/imports/client/config';

// Styled components

const Results = Styled.section`
  position: relative;
  top: 55px;
  width: 75%;
  box-sizing: border-box;
  padding: 0 ${config.padding.horizontal} 20px;
`;

const Header = Styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0;
`;

const Stats = Styled.p`
  font-size: 12px;
  color: ${config.colors.text};
  opacity: .7;
  flex-grow: 100;
`;

const Icon = Styled.i`
  font-size: 24px;
  cursor: pointer;
  color: ${config.colors.text};
  opacity: ${props => props.active ? .85 : .2};

  &:not(:last-child) {
    margin-right: 6px;
  }
`;


export default class ResultsComponent extends Component {
  state = {
    viewType: 'grid',
  }

  render() {
    const {
      loading,
      matches,
      processingTime,
    } = this.props;

    const { viewType } = this.state;

    return (
      <Results>
        <Header>
          <Stats>
            {!loading && <span><b>{matches.length}</b> matches found in {processingTime}ms</span>}
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

          viewType === 'grid' ? <Grid matches={matches} /> : <Table matches={matches} />
        }
      </Results>
    );
  }

  handleViewTypeChange = viewType => {
    this.setState({ viewType });
  }
}
