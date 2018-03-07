import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

import Filters from './Filters';
import Results from './Results';

import Lodash from 'lodash';


// Styled components

const Copyright = Styled.p`
  color: ${config.colors.text};
  padding: 15px ${config.padding.horizontal} 0;
  font-size: 12px;
  text-align: center;
`

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
    processingTime: undefined,
  }

  render() {
    const {
      filters,
      timeframe,
      loading,
      hasSearched,
      matches,
      downloadTime,
      processingTime,
    } = this.state;

    return (
      <section>
        <div style={{width: '25%'}}>
          <Filters
            handleFilterToggle={this.handleFilterToggle}
            handleSearch={this.handleSearch}
            handleTimeframeChange={this.handleTimeframeChange}
            filters={filters}
            timeframe={timeframe}
          />

          <Copyright>
            &copy; {new Date().getFullYear()} Elliottro. All rights reserved.
          </Copyright>
        </div>

        <Results
          loading={loading}
          hasSearched={hasSearched}
          matches={matches}
          downloadTime={downloadTime}
          processingTime={processingTime}
        />
      </section>
    );
  }

  handleFilterToggle = (option, value) => {
    Meteor.setTimeout(() => {
      const filters = { ...this.state.filters };

      filters[option] = Lodash.xor(filters[option], [value]);
      this.setState({ filters });
    }, 0);
  }

  handleTimeframeChange = (timeframe) => {
    this.setState({ timeframe });
  }

  handleSearch = () => {
    this.setState({
      loading: true,
      hasSearched: true,
    });

    Meteor.call('searchPattern', {
      filters: this.state.filters,
      timeframe: this.state.timeframe,
    }, (error, response) => {
      this.setState({
        loading: false,
        ...response,
      });
    });
  }
}
