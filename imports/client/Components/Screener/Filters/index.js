import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import config from '/imports/client/config';

import Tabs from './Tabs';

import QuoteAssets from '/imports/both/fixtures/quoteAssets';
import Exchanges from '/imports/both/fixtures/exchanges';
import Patterns from '/imports/both/fixtures/patterns';
import Timeframes from '/imports/both/fixtures/timeframes';

import {
  RadioButton,
  RadioButtonGroup
} from 'material-ui/RadioButton';

import Checkbox from 'material-ui/Checkbox';

// Styled components

const Filters = Styled.form`
  width: 100%;
  padding: 36px ${config.padding.horizontal} 24px;
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
`;

const ColumnGroup = Styled.div`
  display: flex;
`;

const Column = Styled.div`
  width: 100%;

  &:not(:last-child) {
    padding-right: 30px;
  }
`;

export default class FiltersComponent extends Component {
  render() {
    const {
      filters,
      loading,
      handleChange,
    } = this.props;

    const labelStyle = {
      fontSize: 13,
    };

    return (
      <Filters>
        <ColumnGroup>
          <Column>
            <ColumnTitle>Timeframe</ColumnTitle>

            <RadioButtonGroup
              name="timeframe"
              defaultSelected={filters.timeframe}
            >
              {Lodash.map(Timeframes, (timeframe, key) =>
                <RadioButton
                  key={key}
                  value={key}
                  label={timeframe.name}
                  labelStyle={labelStyle}
                />
              )}
            </RadioButtonGroup>
          </Column>

          <Column>
            <ColumnTitle>Exchanges</ColumnTitle>

            <div>
              {Lodash.map(Exchanges, (exchange, key) =>
                <Checkbox
                  key={key}
                  label={exchange.name}
                  checked={Lodash.includes(filters.exchanges, key)}
                  disabled={exchange.status === 1}
                  labelStyle={labelStyle}
                />
              )}
            </div>
          </Column>

          <Column>
            <ColumnTitle>Quote assets</ColumnTitle>

            <div>
              {Lodash.map(QuoteAssets, (quoteAsset, key) =>
                <Checkbox
                  key={key}
                  label={quoteAsset.name}
                  checked={Lodash.includes(filters.quoteAssets, key)}
                  disabled={quoteAsset.status === 1}
                  labelStyle={labelStyle}
                />
              )}
            </div>
          </Column>
        </ColumnGroup>

        <Tabs />
      </Filters>
    );
  }
}
