import React, { Component } from "react";
import Styled from "styled-components";
import Lodash from "lodash";

import ColumnTitle from "/imports/client/Components/Reusable/ColumnTitle";
import Text from "/imports/client/Components/Reusable/Text";
import config from "/imports/client/config";

// Styled components

const Volume = Styled.div`
  width: 100%;
`;

export default class VolumeComponent extends Component {
  render() {
    return (
      <Volume>
        <ColumnTitle>Volume</ColumnTitle>

        <Text>Hold tight. Coming soon.</Text>
      </Volume>
    );
  }
}
