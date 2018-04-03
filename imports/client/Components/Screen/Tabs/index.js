import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

import CandlestickPattern from './CandlestickPattern';
import ChartPattern from './ChartPattern';
import Indicators from './Indicators';
import Price from './Price';
import Volume from './Volume';

// Styled components

const Tabs = Styled.div`
  display: flex;
  margin-top: 46px;
`;

const TabsColumn = Styled.div`
  width: 200px;
  flex-shrink: 0;
`;

const Tab = Styled.div`
  padding: 10px 15px;
  border-left: 4px solid transparent;
  font-size: 13px;
  width: 100%;
  box-sizing: border-box;
  color: ${config.colors.text};
  background-color: #fafafa;
  cursor: pointer;
  margin-bottom: 3px;

  ${props => props.active && `
    border-color: ${config.colors.primary};
    font-weight: 700;
  `}
`;

const TabBody = Styled.div`
  padding-left: 30px;
  width: 100%;
`;

export default class ScreenTabsComponent extends Component {
  state = {
    tab: 'chart',
  }

  render() {
    const {
      screen,
      handleChange,
    } = this.props;

    const { tab } = this.state;

    const TabsList = {
      candlestick: 'Candlestick pattern',
      chart: 'Chart pattern',
      indicators: 'Indicators',
      price: 'Price performance',
      volume: 'Volume',
    };

    return (
      <Tabs>
        <TabsColumn>
          {Lodash.map(TabsList, (name, key) =>
            <Tab
              key={key}
              active={tab === key}
              onClick={() => this.setState({ tab: key })}
            >
              {name}
            </Tab>
          )}
        </TabsColumn>

        <TabBody>
          {tab === 'candlestick' && <CandlestickPattern />}
          {tab === 'chart' &&
            <ChartPattern
              selected={screen.chart.pattern}
              handleChange={handleChange}
            />
          }
          {tab === 'indicators' && <Indicators />}
          {tab === 'price' && <Price />}
          {tab === 'volume' && <Volume />}
        </TabBody>
      </Tabs>
    );
  }
}
