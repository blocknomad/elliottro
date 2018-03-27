import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import config from '/imports/client/config';

import Patterns from '/imports/both/fixtures/patterns';

// Styled components

const ChartPattern = Styled.div`
  width: 100%;
`;

export default class ChartPatternComponent extends Component {
  state = {
    pattern: 'HSB',
  }

  render() {
    const {

    } = this.props;

    const {
      pattern,
    } = this.state;

    return (
      <ChartPattern>
        <ColumnTitle>Chart pattern</ColumnTitle>


      </ChartPattern>
    );
  }
}
