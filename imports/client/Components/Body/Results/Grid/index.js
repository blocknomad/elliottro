import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import Tile from './Tile';

import config from '/imports/client/config';

// Styled components

const Grid = Styled.section`
  display: grid;
  grid-template-columns: calc(50% - 1px) calc(50% - 1px);
  grid-auto-rows: min-content;
  grid-column-gap: 0;
  grid-row-gap: 0;
  box-sizing: border-box;
  border-top: 1px solid ${config.colors.border};
  border-left: 1px solid ${config.colors.border};
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
