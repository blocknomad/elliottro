import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';

import config from '/imports/client/config';

import Patterns from '/imports/both/fixtures/patterns';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import Illustrate from './Illustrate';

// Styled components

const ChartPattern = Styled.div`
  width: 100%;
`;

const Grid = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: .5em;
  justify-content: space-between;
  margin-top: 12px;

  button {
    height: 100% !important;

    & > div, & > div > div {
      height: 100% !important;
    }
  }
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

  drawGrid(title, patterns) {
    patterns = Lodash.filter(patterns, p => p.status !== 3);

    return (
      <div>
        <Text>
          {title} ({Object.keys(patterns).length})
        </Text>

        <Grid>
          {Lodash.map(patterns, pattern =>
            <RaisedButton
              key={pattern.acronym}
              disabled={pattern.status === 1}
              style={{
                height: 'auto',
                width: 150,
                marginBottom: 24,
              }}
            >
              <div style={{padding: '10%'}}>
                {Illustrate(pattern.acronym)}

                <Name>{pattern.name}</Name>
              </div>
            </RaisedButton>
          )}
        </Grid>
      </div>
    )
  }

  render() {
    const {
      pattern,
    } = this.state;

    return (
      <ChartPattern>
        <ColumnTitle>Chart pattern</ColumnTitle>

        {this.drawGrid('Reversal', Patterns.reversal)}
        {this.drawGrid('Continuation', Patterns.continuation)}
      </ChartPattern>
    );
  }
}
