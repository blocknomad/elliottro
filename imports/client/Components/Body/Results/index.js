import React, { Component } from 'react';
import Styled from 'styled-components';

import Spinner from './Spinner';
import Table from './Table';

import config from '/imports/client/config';

// Styled components

const Results = Styled.section`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
  padding: ${props => props.hasSearched ? '4%' : 0} ${config.padding.horizontal};
  transition: .3s;
`

export default class ResultsComponent extends Component {
  render() {
    const {
      loading,
      hasSearched,
      results,
    } = this.props;

    return (
      <Results
        id="results"
        hasSearched={hasSearched}
      >
        {loading && <Spinner />}
        {hasSearched && !loading && <Table results={results} />}
      </Results>
    );
  }
}
