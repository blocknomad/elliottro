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
      timeframe: 'M1',
      pattern: 'HSB',
      exchanges: ['BINA'],
      quoteAssets: ['BTC', 'ETH', 'USD'],
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
        <Results
          loading={loading}
          matches={matches}
          timeframe={filters.timeframe}
          processingTime={processingTime}
        />

        <Filters
          handleChange={this.handleChange}
          filters={filters}
          loading={loading}
        />
      </Screener>
    );
  }

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ?
      Lodash.xor(this.state.filters[target.name], [target.value]) :
      target.value;

    const filters = this.state.filters;
    filters[target.name] = value

    this.setState({ filters }, this.handleSearch);
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
