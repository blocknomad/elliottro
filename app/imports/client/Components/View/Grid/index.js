import React, { Component } from "react";
import Styled from "styled-components";
import Lodash from "lodash";

import Tile from "./Tile";

import config from "/imports/client/config";

// Styled components

const Grid = Styled.section`
  animation: ${config.animations.fadeIn};
`;

export default class GridComponent extends Component {
  render() {
    const { matches, timeframe } = this.props;

    return (
      <Grid>
        {Lodash.map(matches, (match, key) => (
          <Tile key={key} match={match} timeframe={timeframe} />
        ))}
      </Grid>
    );
  }
}
