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
    }
  }

  render() {
    return (
      <section>
        <Filters handleFilterToggle={this.handleFilterToggle} filters={this.state.filters} />
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
}
