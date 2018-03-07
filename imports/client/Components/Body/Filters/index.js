import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import Collapsible from './Collapsible';

import config from '/imports/client/config';
import QuoteAssets from '/imports/both/fixtures/quoteAssets';
import Exchanges from '/imports/both/fixtures/exchanges';
import Patterns from '/imports/both/fixtures/patterns';
import Timeframes from '/imports/both/fixtures/timeframes';

// Styled components

const Container = Styled.section`
  width: 100%;
  border-right: 1px solid ${config.colors.border};
  border-bottom: 1px solid ${config.colors.border};
  margin-bottom: 20px;
`;

const Filters = Styled.section`
  display: flex;
  width: 20%;
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

const TimeframesList = Styled.section`
  padding: 3% 20% 0.5%;
  text-align: center;

  label {
    font-size: 14px;
    color: ${config.colors.secondaryContrast};
    font-weight: normal;
  }
`

const Header = Styled.div`
  padding: ${config.padding.horizontal};
  display: flex;
  align-items: center;
`;

const Title = Styled.h2`
  text-transform: uppercase;
  color: ${config.colors.text};
  font-size: 14px;
  flex-grow: 100;
`;

const SearchButton = Styled.div`
  background-color: ${config.colors.primary};
  color: ${config.colors.primaryContrast};
  text-transform: uppercase;
  font-size: 12px;
  padding: 6px 24px;
  cursor: pointer;

  &:disabled {
    background-color: #c1cdd2;
    color: #546E7A;
  }

  &:active {
    background-color: #B0BEC5;
  }
`;

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
        <Header>
          <Title>Search</Title>

          <SearchButton onClick={handleSearch}>
            Submit
          </SearchButton>
        </Header>

        <Collapsible
          label={`Exchanges (${filters.exchanges.length})`}
          name="exchanges"
          items={Exchanges}
          toggled={true}
          handleToggle={handleFilterToggle}
        />
        <Collapsible
          label={`Quote assets (${filters.quoteAssets.length})`}
          name="quoteAssets"
          items={QuoteAssets}
          handleToggle={handleFilterToggle}
        />
        <Collapsible
          label={`Patterns (${filters.patterns.length})`}
          name="patterns"
          items={Patterns}
          handleToggle={handleFilterToggle}
        />
      </Container>
    );
  }
}
