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
  height: calc(100vh - 55px);
  padding: 20px 24px;
  box-sizing: border-box;
  flex-shrink: 0;
  border-left: 1px solid ${config.colors.border};
  background-color: ${config.colors.primaryContrast};
  z-index: 99;
  position: fixed;
  top: 55px;
  right: 0;
  overflow-y: auto;
`;

const Section = Styled.section`
  color: ${config.colors.text};

  &:not(:last-child) {
    padding: 0 0 24px;
  }

  p {
    font-size: 13px;
    margin-bottom: 12px;
    font-weight: 600;
  }

  label {
    font-size: 13px;
    display: flex;
    align-items: center;
    padding: 3px 0;
    color: ${config.colors.textLighter};

    span {
      margin-left: 10px;
    }
  }
`


export default class FiltersComponent extends Component {
  render() {
    const {
      handleSearch,
      filters,
      loading,
      handleChange,
    } = this.props;

    return (
      <Container>
        <form>
          <Section>
            <p>Timeframe</p>

            <select
              name="timeframe"
              defaultValue={filters.timeframe}
              onChange={handleChange}
            >
              {Lodash.map(Timeframes, (timeframe, key) =>
                <option value={key} key={key}>
                  {timeframe.name}
                </option>
              )}
            </select>
          </Section>

          <Section>
            <p>Pattern</p>

            <select
              name="pattern"
              defaultValue={filters.pattern}
              onChange={handleChange}
            >
              {Lodash.map(Patterns, (pattern, key) =>
                <option value={key} key={key} disabled={pattern.status === 1}>
                  {pattern.name}
                </option>
              )}
            </select>
          </Section>

          <Section>
            <p>Exchanges</p>

            {Lodash.map(Exchanges, (exchange, key) =>
              <label key={key} htmlFor={key}>
                <input
                  type="checkbox"
                  name="exchanges"
                  value={key}
                  id={key}
                  defaultChecked={Lodash.includes(filters.exchanges, key)}
                  disabled={exchange.status === 1}
                  onChange={handleChange}
                />
                <span>{exchange.name}</span>
              </label>
            )}
          </Section>

          <Section>
            <p>Quote assets</p>

            {Lodash.map(QuoteAssets, (quoteAsset, key) =>
              <label key={key} htmlFor={key}>
                <input
                  type="checkbox"
                  name="quoteAssets"
                  value={key}
                  id={key}
                  defaultChecked={Lodash.includes(filters.quoteAssets, key)}
                  disabled={quoteAsset.status === 1}
                  onChange={handleChange}
                />
                <span>{quoteAsset.name}</span>
              </label>
            )}
          </Section>
        </form>
      </Container>
    );
  }
}
