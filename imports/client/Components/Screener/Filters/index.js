import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import Title from '/imports/client/Components/Reusable/Title';

import config from '/imports/client/config';
import QuoteAssets from '/imports/both/fixtures/quoteAssets';
import Exchanges from '/imports/both/fixtures/exchanges';
import Patterns from '/imports/both/fixtures/patterns';
import Timeframes from '/imports/both/fixtures/timeframes';


// Styled components

const Container = Styled.section`
  width: 100%;
  padding: 24px ${config.padding.horizontal};
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
`;

const Form = Styled.form`
  margin-top: 32px;
`;

const Section = Styled.section`
  width: 50%;
  box-sizing: border-box;

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
`;

const Row = Styled.div`
  display: flex;

  &:not(:first-child) {
    margin-top: 16px;
  }

  p {
    font-size: 13px;
    color: ${config.colors.textLighter};
    width: 230px;
    flex-shrink: 0;
  }

  div {
  }

  label {
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    padding: 3px 0;
    color: ${config.colors.textLighter};

    span {
      margin-left: 5px;
    }

    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`;

const Tabs = Styled.div`
  margin-top: 32px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${config.colors.border};
`;

const Tab = Styled.div`
  border: 1px solid transparent;
  border-bottom: none;
  margin-bottom: -1px;
  padding: 10px 15px;
  font-size: 13px;
  color: ${config.colors.textLighter};
  cursor: pointer;

  ${props => props.active && `
    color: ${config.colors.text};
    border-color: ${config.colors.border};
    background-color: ${config.colors.primaryContrast};
  `}
`;

const TabBody = Styled.div`
  display: ${props => props.active ? 'initial' : 'none'};
`;

export default class FiltersComponent extends Component {
  state = {
    tab: 'price',
  }

  render() {
    const {
      handleSearch,
      filters,
      loading,
      handleChange,
    } = this.props;

    const { tab } = this.state;

    return (
      <Container>
        <Title>Search</Title>

        <Form>
          <Row>
            <p>Timeframe</p>

            <div>
              {Lodash.map(Timeframes, (timeframe, key) =>
                <label key={key} htmlFor={key}>
                  <input
                    type="radio"
                    name="timeframe"
                    value={key}
                    id={key}
                    defaultChecked={Lodash.includes(filters.timeframe, key)}
                    disabled={timeframe.status === 1}
                    onChange={handleChange}
                  />
                  <span>{timeframe.name}</span>
                </label>
              )}
            </div>
          </Row>

          <Row>
            <p>Exchanges</p>

            <div>
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
            </div>
          </Row>

          <Row>
            <p>Quote assets</p>

            <div>
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
            </div>
          </Row>

          <Tabs>
            <Tab
              active={tab === 'price'}
              onClick={() => this.setState({ tab: 'price' })}
            >
              Price
            </Tab>

            <Tab
              active={tab === 'indicators'}
              onClick={() => this.setState({ tab: 'indicators' })}
            >
              Indicators
            </Tab>
          </Tabs>

          <TabBody active={tab === 'price'}>
            <Row>
              <p>Pattern</p>

              <select
                name="pattern"
                defaultValue={filters.pattern}
                onChange={handleChange}
              >
                <optgroup label="Reversal">
                  {(Lodash.filter(Patterns, ['type', 'reversal'])).map((pattern, key) =>
                    <option value={key} key={key} disabled={pattern.status === 1}>
                      {pattern.name}
                    </option>
                  )}
                </optgroup>

                <optgroup label="Continuation">
                  {(Lodash.filter(Patterns, ['type', 'continuation'])).map((pattern, key) =>
                    <option value={key} key={key} disabled={pattern.status === 1}>
                      {pattern.name}
                    </option>
                  )}
                </optgroup>
              </select>
            </Row>
          </TabBody>
        </Form>
      </Container>
    );
  }
}
