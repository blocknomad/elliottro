import React, { Component } from 'react';
import Styled from 'styled-components';
import ScrollArea from 'react-scrollbar';
import Lodash from 'lodash';

import Tile from './Tile';

import config from '/imports/client/config';
import QuoteAssets from '/imports/both/fixtures/quoteAssets';
import Exchanges from '/imports/both/fixtures/exchanges';
import Patterns from '/imports/both/fixtures/patterns';
import Timeframes from '/imports/both/fixtures/timeframes';

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

const Tiles = Styled(ScrollArea).attrs({
  smoothScrolling: true,
})`
  max-height: 50vh;
`

const TimeframesList = Styled.section`
  padding: 3% 20% 0.5%;
  text-align: center;

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
  box-shadow: 2px 2px 2px #c3c3c3;

  &:hover {
    background-color: #c1cdd2;
    color: #546E7A;
  }

  &:active {
    background-color: #B0BEC5;
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

            <Tiles>
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
              </Tiles>
          </Filter>

          <Filter>
            <Title>Quote asset</Title>

            <Tiles>
              {Lodash.map(QuoteAssets, (quoteAsset, key) =>
                <Tile
                  key={key}
                  label={quoteAsset.name}
                  status={quoteAsset.status}
                  toggled={Lodash.indexOf(filters.quoteAssets, key) !== -1}
                  option="quoteAssets"
                  value={key}
                  handleToggle={handleFilterToggle}
                />)}
              </Tiles>
          </Filter>

          <Filter>
            <Title>Pattern</Title>

            <Tiles>
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
              </Tiles>
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
