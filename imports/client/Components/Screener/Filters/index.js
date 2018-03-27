import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';
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

import {
  Checkbox,
  Slider,
} from 'material-ui';

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
  state = {
    nKlines: 50,
  }

  render() {
    const {
      filters,
      loading,
      handleChange,
    } = this.props;

    const {
      nKlines,
    } = this.state;

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

            <ColumnTitle style={{marginTop: 36}}>
              Analysis range
            </ColumnTitle>

            <div>
              <Text>The algorithm is going to analyze the last <b>{nKlines}</b> candlesticks of each symbol.</Text>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginTop: 12,
              }}>
                <Text style={{marginRight: 10}}>30</Text>

                <Slider
                  value={nKlines}
                  min={30}
                  max={100}
                  step={1}
                  onChange={(a, v) => this.setState({ nKlines: v })}
                  sliderStyle={{margin: 0}}
                  style={{flexGrow: 100}}
                />

                <Text style={{marginLeft: 10}}>100</Text>
              </div>
            </div>
          </Column>
        </ColumnGroup>

        <Tabs />
      </Filters>
    );
  }
}
