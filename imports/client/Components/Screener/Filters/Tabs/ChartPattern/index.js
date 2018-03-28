import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';

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
  margin-top: 10%;
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
      padding: '10%',
      marginBottom: 24,
      cursor: 'pointer',
    }

    const count = obj => Object.keys(Lodash.filter(obj, p => p.status !== 3)).length

    return (
      <ChartPattern>
        <ColumnTitle>Chart pattern</ColumnTitle>

        <Text style={{marginBottom: 12}}>
          Reversal ({count(Patterns.reversal)})
        </Text>

        <Grid>
          {Lodash.map(Patterns.reversal, (pattern, key) =>
            pattern.status !== 3 && <Paper
              key={key}
              style={style}
              zDepth={1}
            >
              {Illustrations(key)}

              <Name>{pattern.name}</Name>
            </Paper>
          )}
        </Grid>

        <Text style={{marginBottom: 12}}>
          Continuation ({count(Patterns.continuation)})
        </Text>

        <Grid>
          {Lodash.map(Patterns.continuation, (pattern, key) =>
            pattern.status !== 3 && <Paper
              key={key}
              style={style}
              zDepth={1}
            >
              {Illustrations(key)}

              <Name>{pattern.name}</Name>
            </Paper>
          )}
        </Grid>
      </ChartPattern>
    );
  }
}
