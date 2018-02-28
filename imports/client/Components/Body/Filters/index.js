import React, { Component } from 'react';
import Styled from 'styled-components';

import Tile from './Tile';

import config from '/imports/client/config';
import BaseCurrencies from '/imports/both/fixtures/baseCurrencies';
import Exchanges from '/imports/both/fixtures/exchanges';
import Patterns from '/imports/both/fixtures/patterns';
import Timeframes from '/imports/both/fixtures/timeframes';

import Lodash from 'lodash';

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
  font-size: 15px;
  margin: 0 0 14px 14px;
`

const TimeframesList = Styled.section`
  padding: 3% 20% 0.5%;

  label {
    font-size: 14px;
    color: ${config.colors.secondaryContrast};
    font-weight: normal;
  }
`

const Timeframe = Styled.span`
  padding: 4px 6px;
  margin-right: 5px;
  font-size: 14px;
  color: #607D8B;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #e2e2e2;
  }

  ${props => props.selected && `
    color: ${config.colors.primary};
    text-decoration: underline;
    font-weight: 600;
  `}
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

  &:hover {
    background-color: #c1cdd2;
    color: #546E7A;
  }
`

export default class FiltersComponent extends Component {
  render() {
    const {
      handleFilterToggle,
      handleSearch,
      handleTimeframeChange,
      filters,
      timeframe,
    } = this.props;

    return (
      <Container>
        <Filters>
          <Filter>
            <Title>Exchange</Title>

            {Lodash.map(Exchanges, (exchange, key) =>
              <Tile
                key={key}
                label={exchange.name}
                status={exchange.status}
                toggled={Lodash.indexOf(filters.exchanges, key) !== -1}
                option="exchanges"
                value={key}
                handleToggle={handleFilterToggle}
              />)}
          </Filter>

          <Filter>
            <Title>Base currency</Title>

            {Lodash.map(BaseCurrencies, (currency, key) =>
              <Tile
                key={key}
                label={currency.name}
                status={currency.status}
                toggled={Lodash.indexOf(filters.baseCurrencies, key) !== -1}
                option="baseCurrencies"
                value={key}
                handleToggle={handleFilterToggle}
              />)}
          </Filter>

          <Filter>
            <Title>Pattern</Title>

            {Lodash.map(Patterns, (pattern, key) =>
              <Tile
                key={key}
                label={pattern.name}
                status={pattern.status}
                toggled={Lodash.indexOf(filters.patterns, key) !== -1}
                option="patterns"
                value={key}
                handleToggle={handleFilterToggle}
              />)}
          </Filter>
        </Filters>

        <TimeframesList>
          <label>Timeframe: </label>

          {Lodash.map(Timeframes, ({ name }, key) =>
            <Timeframe
              key={key}
              selected={timeframe === key}
              onClick={() => handleTimeframeChange(key)}
            >
              {name}
            </Timeframe>
          )}
        </TimeframesList>

        <SearchButton onClick={handleSearch}>
          Search
        </SearchButton>
      </Container>
    );
  }
}
