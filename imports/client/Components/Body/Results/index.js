import React, { Component } from 'react';
import Styled from 'styled-components';

import Spinner from './Spinner';
import Table from './Table';

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
  render() {
    const {
      loading,
      matches,
      processingTime,
    } = this.props;

    return (
      <Results>
        <Header>
          <Stats>
            Viewing <b>{matches.length}</b> of {matches.length} matches {!loading && `(${processingTime}ms)`}
          </Stats>

          <Icon
            className="material-icons"
            active={true}
            title="List view"
          >
            view_list
          </Icon>
          <Icon
            className="material-icons"
            active={false}
            title="Grid view with charts"
          >
            view_module
          </Icon>
        </Header>

        {loading ?
          <Spinner /> : <Table matches={matches} />
        }
      </Results>
    );
  }
}
