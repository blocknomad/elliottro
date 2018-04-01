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
  IconMenu,
  MenuItem,
  IconButton,
  Paper,
} from 'material-ui';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SaveIcon from 'material-ui/svg-icons/content/save';
import AddAlertIcon from 'material-ui/svg-icons/alert/add-alert';

// Styled components

const Filters = Styled.section`
  padding: 30px calc(${config.padding.horizontal} - 0px);
`;

const Header = Styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
  margin-bottom: 15px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;

  & > * {
    flex-shrink: 0;
  }
`;

const ScreenName = Styled.input`
  font-size: 22px;
  flex-grow: 100;
  padding: 8px 5px;
  color: ${config.colors.text};
  border: 1px solid transparent;

  &:hover {
    border-color: #ddd;
  }

  &:focus {
    border-color: #bbb;
    outline: none;
  }

  &::placeholder {
    font-style: italic;
    font-weight: 300;
  }
`;

const Form = Styled.form`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
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
  display: flex;

  & > *:not(:last-child) {
    margin-right: 15px;
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
        <Header>
          <svg height="39" width="50" style={{marginRight: 20}}>
            <rect
              width="50"
              height="35"
              strokeWidth="1"
              stroke="#333"
              fill="none"
            />

            <rect
              x="12"
              y="36"
              width="26"
              height="3"
              fill="#777"
            />

            <rect x="14" y="20" width="6" height="10" fill={config.colors.secondary} />
            <rect x="22" y="15" width="6" height="15" fill={config.colors.secondary} />
            <rect x="30" y="10" width="6" height="20" fill={config.colors.secondary} />
          </svg>

          <ScreenName placeholder="Unnamed screen" />

          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            style={{padding: '0 10px'}}
          >
            <MenuItem
              primaryText="Save screen"
              style={{fontSize: 14}}
              leftIcon={<SaveIcon />}
            />
            <MenuItem
              primaryText="Create alert"
              style={{fontSize: 14}}
              leftIcon={<AddAlertIcon />}
            />
          </IconMenu>

          <RaisedButton
            label="Screen"
            primary={true}
            onClick={handleSearch}
          />
        </Header>

        <Form>
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
        </Form>
      </Filters>
    );
  }
}
