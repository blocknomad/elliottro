import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';
import config from '/imports/client/config';

// Styled components

const CandlestickPattern = Styled.div`
  width: 100%;
`;

export default class CandlestickPatternComponent extends Component {
  render() {
    return (
      <CandlestickPattern>
        <ColumnTitle>Candlestick pattern</ColumnTitle>

        <Text>Hold tight. Coming soon.</Text>
      </CandlestickPattern>
    );
  }
}
