import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

import Filters from './Filters';
import Results from './Results';

import Lodash from 'lodash';


// Styled components

const Screener = Styled.section`
`;

export default class BodyComponent extends Component {
  state = {
    filters: {
      timeframe: 'H1',
      exchanges: ['BINA'],
      quoteAssets: ['BTC', 'ETH', 'USD'],
      range: 50,
      chart: {
        type: 'reversal',
        pattern: 'HSB',
      },
      candlestick: undefined,
      indicators: [],
      price: {},
    },
    loading: false,
    hasSearched: false,
    matches: [],
    processingTime: 0,
  }

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    const {
      filters,
      timeframe,
      loading,
      matches,
      processingTime,
    } = this.state;

    return (
      <Screener>
        <Filters
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
          filters={filters}
          loading={loading}
        />

        <Results
          loading={loading}
          matches={matches}
          timeframe={filters.timeframe}
          processingTime={processingTime}
        />
      </Screener>
    );
  }

  handleChange = (name, value) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [name]: value
      }
    });
  }

  handleSearch = () => {
    this.setState({ loading: true });

    Meteor.call('searchPattern', { ...this.state.filters }, (error, response) => {
      this.setState({
        loading: false,
        ...response,
      });
    });
  }
}
