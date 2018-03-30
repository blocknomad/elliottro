import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';
import config from '/imports/client/config';

import Tabs from './Tabs';

import QuoteAssets from '/imports/both/fixtures/quoteAssets';
import Exchanges from '/imports/both/fixtures/exchanges';
import Timeframes from '/imports/both/fixtures/timeframes';

import {
  RadioButton,
  RadioButtonGroup
} from 'material-ui/RadioButton';

import {
  Checkbox,
  Slider,
  RaisedButton,
} from 'material-ui';

// Styled components

const Filters = Styled.form`
  width: calc(100% - ${config.padding.horizontal} * 2 + 50px);
  margin: 50px calc(${config.padding.horizontal} - 25px);
  padding: 25px;
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

const Buttons = Styled.div`
  width: calc(100% - 230px);
  display: flex;
  flex-direction: row-reverse;
  margin: 30px 0 0 230px;

  & > *:not(:last-child) {
    padding-right: 15px;
  }
`;

const SliderContainer = Styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
`;

export default class FiltersComponent extends Component {
  render() {
    const {
      filters,
      loading,
      handleChange,
      handleSearch,
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
              onChange={(t, v) => handleChange('timeframe', v)}
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
                  disabled={exchange.status === 1}
                  checked={Lodash.includes(filters.exchanges, key)}
                  onCheck={(t, checked) => handleChange('exchanges',
                    Lodash.uniq(
                      checked ?
                        Lodash.concat(filters.exchanges, key) :
                        Lodash.without(filters.exchanges, key)
                    )
                  )}
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
                  disabled={quoteAsset.status === 1}
                  checked={Lodash.includes(filters.quoteAssets, key)}
                  onCheck={(t, checked) => handleChange('quoteAssets',
                    Lodash.uniq(
                      checked ?
                        Lodash.concat(filters.quoteAssets, key) :
                        Lodash.without(filters.quoteAssets, key)
                    )
                  )}
                  labelStyle={labelStyle}
                />
              )}
            </div>

            <ColumnTitle style={{marginTop: 36}}>
              Analysis range
            </ColumnTitle>

            <div>
              <Text>The algorithm will analyze the last <b>{filters.range}</b> candlesticks of each symbol.</Text>

              <SliderContainer>
                <Text style={{marginRight: 10}}>30</Text>

                <Slider
                  value={filters.range}
                  min={30}
                  max={100}
                  step={1}
                  onChange={(a, v) => handleChange('range', v)}
                  sliderStyle={{margin: 0}}
                  style={{flexGrow: 100}}
                />

                <Text style={{marginLeft: 10}}>100</Text>
              </SliderContainer>
            </div>
          </Column>
        </ColumnGroup>

        <Tabs
          filters={filters}
          handleChange={handleChange}
        />

        <Buttons>
          <RaisedButton
            label="Screen"
            fullWidth={true}
            primary={true}
            onClick={handleSearch}
          />
        </Buttons>
      </Filters>
    );
  }
}
