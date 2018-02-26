import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

import Filters from './Filters';
import Results from './Results';

import Lodash from 'lodash';


export default class BodyComponent extends Component {
  filters = {
    exchanges: [],
    baseCurrencies: [],
    patterns: [],
  }

  render() {
    return (
      <section>
        <Filters handleFilterToggle={this.handleFilterToggle} />
        <Results />
      </section>
    );
  }

  handleFilterToggle = (option, value) => {
    this.filters[option] = Lodash.xor(this.filters[option], [value]);
  }
}
