import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';
import config from '/imports/client/config';

// Styled components

const Price = Styled.div`
  width: 100%;
`;

export default class PriceComponent extends Component {
  render() {
    return (
      <Price>
        <ColumnTitle>Price</ColumnTitle>

        <Text>Hold tight. Coming soon.</Text>
      </Price>
    );
  }
}
