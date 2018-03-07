import React, { Component } from 'react';
import Styled from 'styled-components';

import Spinner from './Spinner';
import Table from './Table';

import config from '/imports/client/config';

// Styled components

const Results = Styled.section`
  width: 75%;
  box-sizing: border-box;
`

const Header = Styled.div`
  height: 53.31px;
  display: flex;
  align-items: center;
  padding: 0 1vw;
`

const Stats = Styled.p`
  font-size: 13px;
  color: ${config.colors.text};
`

export default class ResultsComponent extends Component {
  render() {
    const {
      loading,
      hasSearched,
      matches,
      downloadTime,
      processingTime,
    } = this.props;

    return (
      <Results>
        {loading && <Spinner />}

        {hasSearched && !loading && [

          <Header key={1}>
            <Stats>
              Viewing <b>{matches.length}</b> of {matches.length} matches ({processingTime}ms)
            </Stats>
          </Header>,

          <Table matches={matches} key={2} />

        ]}
      </Results>
    );
  }
}
