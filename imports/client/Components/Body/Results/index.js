import React, { Component } from 'react';
import Styled from 'styled-components';

import Tile from './Tile';

import config from '/imports/client/config';

// Styled components

const Results = Styled.section`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 4% ${config.padding.horizontal};
`

const Tabs = Styled.section`
  width: 18%;
  flex-shrink: 0;
  padding-right: 4%;
`

const Tab = Styled.article`
  padding: 4% 14px;
  color: ${props => props.selected ? config.colors.primaryContrast : '#37474F'};
  font-size: 14px;
  background-color: ${props => props.selected ? config.colors.primary : 'transparent'};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.selected ? config.colors.primary : '#ECEFF1'};
    color: ${props => props.selected ? config.colors.primaryContrast : '#263238'};
  }
`

export default class ResultsComponent extends Component {
  render() {
    return (
      <Results>
        <Tabs>
          <Tab selected={true}>Head & Shoulders (1)</Tab>
          <Tab>Inversed Head & Shoulders (3)</Tab>
          <Tab>Cup & Handle (0)</Tab>
        </Tabs>


        <Tile title="EOSBTC" />
      </Results>
    );
  }
}
