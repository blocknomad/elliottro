import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

import Exchanges from '/imports/both/fixtures/exchanges';
import drawKlines from './functions/drawKlines';
import drawGridLines from './functions/drawGridLines';
import drawPointerLines from './functions/drawPointerLines';
import removePointerLines from './functions/removePointerLines';
import formatDate from './../../functions/formatDate';

import {
  Paper,
  IconButton,
} from 'material-ui';

// Styled components

const Tile = Styled(Paper)`
  box-sizing: border-box;
  background-color: #fff;
  display: inline-block;
  width: calc(50% - 5px);
  margin-bottom: 10px;
  padding: 20px;

  &:nth-child(odd) {
    margin-right: 10px;
  }
`;

const Chart = Styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
`;

const Canvas = Styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

const Information = Styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

const Title = Styled.div`
  flex-grow: 100;

  h3 {
    color: ${config.colors.text};
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
  }

  p {
    margin-top: 4px;
    color: #888;
    font-size: 11px;
  }
`;


export default class GridTileComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.drawChart();
    //window.addEventListener('resize', () => this.drawChart(match, timeframe));
  }

  componentWillUnmount() {
    //window.removeEventListener('resize', this.drawChart);
    this.pointerLines.removeEventListener('mousemove', this.handleMouseMove);
    this.pointerLines.removeEventListener('mouseout', this.handleMouseOut);
  }

  drawChart() {
    const { match, timeframe } = this.props;

    const maxInWindow = Lodash.maxBy(match.klines, 'high');
    const minInWindow = Lodash.minBy(match.klines, 'low');

    const verticalStepper = Number(((maxInWindow.high - minInWindow.low) / 5).toPrecision(1));

    const windowTop = maxInWindow.high * 1.007;
    const windowBottom = minInWindow.low - (minInWindow.low % verticalStepper);

    const labelsWidth = 65;
    const labelsHeight = 24;

    const chartWidth = this.gridLines.parentElement.scrollWidth;
    const chartHeight = chartWidth * .45;

    this.gridLines.parentElement.style.height = `${chartHeight}px`;

    this.gridLines.width = chartWidth;
    this.gridLines.height = chartHeight;

    this.klines.width = chartWidth - labelsWidth;
    this.klines.height = chartHeight - labelsHeight;

    this.pointerLines.width = chartWidth;
    this.pointerLines.height = chartHeight;

    const klineWidth = this.klines.width / (match.klines.length + (match.klines.length + 1) / 2);
    const vRatio = this.klines.height / (windowTop - windowBottom);

    drawGridLines(
      this.gridLines,
      match,
      verticalStepper,
      vRatio,
      klineWidth,
      timeframe,
      this.klines.width,
      this.klines.height,
      windowTop,
      windowBottom
    );

    drawKlines(
      this.klines,
      match,
      vRatio,
      klineWidth,
      this.klines.width,
      this.klines.height,
      windowTop,
      windowBottom
    );

    this.handleMouseMove = event => {
      drawPointerLines(
        this.pointerLines,
        event,
        match,
        vRatio,
        timeframe,
        klineWidth,
        this.klines.width,
        this.klines.height,
        windowTop
      );
    };

    this.handleMouseOut = event => {
      removePointerLines(this.pointerLines);
    };

    this.pointerLines.addEventListener('mousemove', this.handleMouseMove);
    this.pointerLines.addEventListener('mouseout', this.handleMouseOut);
  }

  render() {
    const {
      match,
      timeframe,
    } = this.props;

    return (
      <Tile>
        <Chart>
          <Canvas innerRef={ref => this.gridLines = ref} />
          <Canvas innerRef={ref => this.klines = ref} />
          <Canvas innerRef={ref => this.pointerLines = ref} />
        </Chart>

        <Information>
          <Title>
            <h3>{Exchanges[match.exchange].name}:{match.baseAsset}{match.quoteAsset}</h3>

            <p>
              {formatDate(match.start, timeframe)} - {formatDate(match.end, timeframe)}
            </p>
          </Title>

          <IconButton
            tooltip="Access this symbol on exchange"
            href={`https://www.binance.com/trade.html?symbol=${match.baseAsset}_${match.quoteAsset}`}
            target="_blank"
            iconClassName="material-icons"
          >
            launch
          </IconButton>
        </Information>
      </Tile>
    );
  }
}
