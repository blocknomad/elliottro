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
      quoteAssets: [],
      patterns: [],
    },
    timeframe: 'H1',
    loading: false,
    hasSearched: false,
    matches: [],
  }

  render() {
    const {
      filters,
      timeframe,
      loading,
      hasSearched,
      matches,
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
          matches={matches}
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

    Meteor.call('searchPattern', {
      filters: this.state.filters,
      timeframe: this.state.timeframe,
    }, (err, matches) => {
      this.setState({
        loading: false,
        matches,
      });
    });
  }
}
