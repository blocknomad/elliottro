import React, { Component } from 'react';
import Styled from 'styled-components';

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
  }

  render() {
    return (
      <section>
        <Filters
          handleFilterToggle={this.handleFilterToggle}
          handleSearch={this.handleSearch}
          handleTimeframeChange={this.handleTimeframeChange}
          filters={this.state.filters}
          timeframe={this.state.timeframe}
        />
        <Results />
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

  }
}
