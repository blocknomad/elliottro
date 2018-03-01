import React, { Component } from 'react';
import Styled from 'styled-components';
import smoothScroll from 'smoothscroll';

import config from '/imports/client/config';

import Filters from './Filters';
import Results from './Results';

import Lodash from 'lodash';


export default class BodyComponent extends Component {
  state = {
    filters: {
      exchanges: [],
      baseCurrencies: [],
      patterns: [],
    },
    timeframe: 'H1',
    loading: true,
    hasSearched: true,
    results: [],
  }

  render() {
    const {
      filters,
      timeframe,
      loading,
      hasSearched,
      results,
    } = this.state;

    return (
      <section>
        <Filters
          handleFilterToggle={this.handleFilterToggle}
          handleSearch={this.handleSearch}
          handleTimeframeChange={this.handleTimeframeChange}
          filters={filters}
          timeframe={timeframe}
        />

        <Results
          loading={loading}
          hasSearched={hasSearched}
          results={results}
        />
      </section>
    );
  }

  handleFilterToggle = (option, value) => {
    setTimeout(() => {
      const filters = { ...this.state.filters };

      filters[option] = Lodash.xor(filters[option], [value]);
      filters[option].length > 0 && this.setState({ filters });
    }, 0);
  }

  handleTimeframeChange = (timeframe) => {
    this.setState({ timeframe });
  }

  handleSearch = () => {
    smoothScroll(document.getElementById('results'));
    this.setState({
      loading: true,
      hasSearched: true,
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        results: [
          { symbol: 'EOS', baseCurrency: 'BTC', exchange: 'Binance', pattern: 'Head and Shoulders Bottom' },
          { symbol: 'VIB', baseCurrency: 'BTC', exchange: 'Binance', pattern: 'Head and Shoulders Bottom' },
        ],
      });
    }, 2000)
  }
}
