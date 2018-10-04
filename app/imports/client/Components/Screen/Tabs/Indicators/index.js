import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';
import config from '/imports/client/config';

// Styled components

const Indicators = Styled.div`
  width: 100%;
`;

export default class IndicatorsComponent extends Component {
  render() {
    return (
      <Indicators>
        <ColumnTitle>Indicators</ColumnTitle>

        <Text>Hold tight. Coming soon.</Text>
      </Indicators>
    );
  }
}
