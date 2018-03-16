import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import Tile from './Tile';

import config from '/imports/client/config';

// Styled components

/*
display: grid;
grid-template-columns: calc(50% - 21px) calc(50% - 21px);
grid-auto-rows: min-content;
grid-column-gap: 20px;
grid-row-gap: 20px;*/

const Grid = Styled.section`
  animation: ${config.animations.fadeIn};
`;


export default class GridComponent extends Component {
  render() {
    const { matches } = this.props;

    return (
      <Grid>
        {Lodash.map(matches, (match, key) =>
          <Tile key={key} match={match} />
        )}
      </Grid>
    );
  }
}
