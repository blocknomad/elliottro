import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import config from '/imports/client/config';

import Patterns from '/imports/both/fixtures/patterns';

import Paper from 'material-ui/Paper';

import Illustrations from './illustrations';

// Styled components

const ChartPattern = Styled.div`
  width: 100%;
`;

const Grid = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: .5em;
  justify-content: space-between;
`;

const Name = Styled.p`
  text-transform: uppercase;
  font-size: 10px;
  color: ${config.colors.text};
  padding: 5% 10% 10%;
  text-align: center;
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

    const style = {
      width: 150,
      marginBottom: 24,
    }

    return (
      <ChartPattern>
        <ColumnTitle>Chart pattern</ColumnTitle>

        <Grid>
          {Lodash.map(Patterns, (pattern, key) =>
            <Paper
              style={style}
              zDepth={1}
            >
              {Illustrations('HSB')}

              <Name>{pattern.name}</Name>
            </Paper>
          )}
        </Grid>
      </ChartPattern>
    );
  }
}
