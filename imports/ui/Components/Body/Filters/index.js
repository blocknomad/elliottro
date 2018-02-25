import React, { Component } from 'react';
import Styled from 'styled-components';

import Tile from './Tile';

import config from '/imports/ui/config';

// Styled components

const Container = Styled.section`
  padding: 4% ${config.padding.horizontal};
  box-shadow: inset 2px 1px 5px #CFD8DC;
  background-color: ${config.colors.secondary};
`;

const Filters = Styled.section`
  display: flex;
  width: 100%;
  box-sizing: border-box;
`

const Filter = Styled.article`
  width: 100%;
  box-sizing: border-box;
  margin-right: 2%;

  &:last-child {
    margin-right: 0%;
  }
`

const Title = Styled.h2`
  color: ${config.colors.secondaryContrast};
  text-transform: uppercase;
  font-size: 16px;
  margin: 0 0 14px 14px;
`

const SearchButton = Styled.div`
  background-color: #CFD8DC;
  color: #607D8B;
  margin-top: 2.5%;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  padding: 1% 0;
  cursor: pointer;
  box-shadow: 1px 1px 3px rgba(0,0,0,.2);

  &:hover {
    background-color: #B0BEC5;
    color: #455A64;
  }
`

export default class FiltersComponent extends Component {
  render() {
    return (
      <Container>
        <Filters>
          <Filter>
            <Title>Exchange</Title>

            <Tile label="Bittrex" checked={false} />
            <Tile label="Binance" checked={false} />
            <Tile label="Bitfinex" checked={false} />
          </Filter>

          <Filter>
            <Title>Base currency</Title>

            <Tile label="BTC" checked={false} />
            <Tile label="ETH" checked={false} />
            <Tile label="USD/USDT" checked={false} />
          </Filter>

          <Filter>
            <Title>Pattern</Title>

            <Tile label="Head & Shoulders" checked={false} />
            <Tile label="Inversed Head & Shoulders" checked={false} />
            <Tile label="Falling Wedge" checked={false} />
            <Tile label="Ascending Triangle" checked={false} />
            <Tile label="Cup & Handle" checked={false} />
          </Filter>
        </Filters>

        <SearchButton>
          Search
        </SearchButton>
      </Container>
    );
  }
}
