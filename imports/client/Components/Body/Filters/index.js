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
  width: 25%;
  flex-shrink: 0;
  border-right: 1px solid ${config.colors.border};
`;

const TimeframesMenu = Styled.article`
  border-top: 1px solid ${config.colors.border};
  color: ${config.colors.secondaryContrast};
  padding: 12px ${config.padding.horizontal};

  p {
    font-size: 13px;
    margin-bottom: 18px;
  }

  div {
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
  }

  label {
    color: ${config.colors.text};
    font-size: 13px;
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

const SearchButton = Styled.button`
  background-color: ${config.colors.primary};
  border: none;
  color: ${config.colors.primaryContrast};
  text-transform: uppercase;
  font-size: 12px;
  padding: 6px 24px;
  cursor: pointer;

  &:hover {
    background-color: #008274;
  }

  &:active {
    background-color: #007b6e;
  }

  &:disabled {
    background-color: #B0BEC5;
    cursor: initial;
  }
`;

const Copyright = Styled.div`
  color: ${config.colors.text};
  padding: 35px ${config.padding.horizontal};
  border-top: 1px solid ${config.colors.border};
  font-size: 12px;
  text-align: center;
`


export default class FiltersComponent extends Component {
  render() {
    const {
      handleFilterToggle,
      handleSearch,
      handleTimeframeChange,
      filters,
      timeframe,
      loading,
    } = this.props;

    return (
      <Container>
        <Header>
          <Title>Search</Title>

          <SearchButton
            onClick={handleSearch}
            disabled={loading}
          >
            Submit
          </SearchButton>
        </Header>

        <TimeframesMenu>
          <p>Timeframe</p>

          {Lodash.map(Timeframes, (timeframe, key) =>
            <div key={key}>
              <input
                type="radio"
                name="timeframe"
                onClick={() => handleTimeframeChange(key)}
                value={key}
                id={key}
                defaultChecked={key === 'H1'}
              /> <label htmlFor={key}>{timeframe.name}</label>
            </div>
          )}
        </TimeframesMenu>

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

        <Copyright>
          &copy; {new Date().getFullYear()} Elliottro. All rights reserved.
        </Copyright>
      </Container>
    );
  }
}
