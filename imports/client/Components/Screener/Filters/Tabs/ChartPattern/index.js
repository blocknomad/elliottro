import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';

import config from '/imports/client/config';

import Patterns from '/imports/both/fixtures/patterns';

import {
  RaisedButton,
} from 'material-ui';

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

const GridItem = Styled.div`
  padding: 10%;
  position: relative;
  color: ${config.colors.text};

  ${props => props.selected && `

  `}
`;

const Checkbox = Styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 26px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 1;
  color: #FFF;
  visibility: hidden;
  background-color: ${config.colors.primary};

  ${props => props.checked && `
    visibility: visible;
  `}
`;

const Name = Styled.p`
  text-transform: uppercase;
  font-size: 10px;
  margin-top: 10%;
  text-align: center;
`;

export default class ChartPatternComponent extends Component {
  constructor(props) {
    super(props);
  }

  drawGrid(title, type, patterns) {
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
              onClick={() => this.props.handleChange('chart', { type, pattern: pattern.acronym})}
              title={pattern.status === 1 ? 'Not yet available.' : ''}
            >
              <GridItem>
                <Checkbox
                  checked={this.props.selected === pattern.acronym}
                >
                  selected
                </Checkbox>

                {Illustrate(pattern.acronym)}

                <Name>{pattern.name}</Name>
              </GridItem>
            </RaisedButton>
          )}
        </Grid>
      </div>
    )
  }

  render() {
    return (
      <ChartPattern>
        <ColumnTitle>Chart pattern</ColumnTitle>

        {this.drawGrid('Reversal', 'reversal', Patterns.reversal)}
        {this.drawGrid('Continuation', 'continuation', Patterns.continuation)}
      </ChartPattern>
    );
  }
}
