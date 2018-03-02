import React, { Component } from 'react';
import Styled from 'styled-components';

import Spinner from './Spinner';
import Table from './Table';

import config from '/imports/client/config';

// Styled components

const Results = Styled.section`
  width: 100%;
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
  padding: ${props => props.hasSearched ? '4%' : 0} ${config.padding.horizontal};
  transition: .3s;
`

const Stats = Styled.p`
  font-size: 13px;
  margin: 20px 0 0 21px;
  color: #37474F;
  font-weight: 300;
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
      <Results
        id="results"
        hasSearched={hasSearched}
      >
        {loading && <Spinner />}

        {hasSearched && !loading && [

          <Table matches={matches} key={0} />,

          <Stats key={1}>
            Download time: {downloadTime}ms &nbsp;-&nbsp; Processing time: {processingTime}ms &nbsp;-&nbsp; Matches: {matches.length}
          </Stats>

        ]}
      </Results>
    );
  }
}
