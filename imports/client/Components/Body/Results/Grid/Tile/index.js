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

// Styled components

const Tile = Styled.article`
  box-sizing: border-box;
  background-color: #fff;
  padding: 15px;
  border: 1px solid ${config.colors.border};
  box-shadow: 1px 1px 1px ${config.colors.border};
  display: inline-block;
  width: calc(50% - 10px);

  &:nth-child(odd) {
    margin-right: 20px;
  }

  &:nth-child(odd), &:nth-child(even) {
    margin-bottom: 20px;
  }
`;

const Chart = Styled.div`
  position: relative;
  width: 100%;
  border: 1px solid ${config.colors.border};
`;

const Canvas = Styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

const Header = Styled.div`
  margin-bottom: 18px;

  p {
    margin-top: 4px;
    color: #888;
    font-size: 11px;
  }
`;

const Title = Styled.div`
  display: flex;
  align-items: center;

  h3 {
    color: ${config.colors.text};
    font-size: 14px;
    flex-grow: 100;
    text-transform: uppercase;
  }
`;

const Visit = Styled.a`
  i {
    color: ${config.colors.icon};
    font-size: 17px;
  }
`


export default class GridTileComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      match,
      timeframe,
    } = this.props;

    this.drawChart(match, timeframe);
    window.addEventListener('resize',
      () => this.drawChart(match, timeframe));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.drawChart);
  }

  drawChart(match, timeframe) {
    const maxInWindow = Lodash.maxBy(match.klines, 'high');
    const minInWindow = Lodash.minBy(match.klines, 'low');

    const verticalStepper = Number(((maxInWindow.high - minInWindow.low) / 5).toPrecision(1));

    const windowTop = maxInWindow.high * 1.007;
    const windowBottom = minInWindow.low - (minInWindow.low % verticalStepper);

    const labelsWidth = 67;
    const labelsHeight = 20;

    const chartWidth = this.gridLines.parentElement.scrollWidth;
    const chartHeight = chartWidth / 2;

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

    this.pointerLines.addEventListener('mousemove', event =>
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
      )
    );

    this.pointerLines.addEventListener('mouseout', event =>
      removePointerLines(this.pointerLines)
    );
  }

  render() {
    const {
      match,
      timeframe,
    } = this.props;

    return (
      <Tile>
        <Header>
          <Title>
            <h3>{Exchanges[match.exchange].name}:{match.baseAsset}{match.quoteAsset}</h3>

            <Visit
              title="Access this symbol on exchange"
              href={`https://www.binance.com/trade.html?symbol=${match.baseAsset}_${match.quoteAsset}`}
              target="_blank"
            >
              <i className="material-icons">launch</i>
            </Visit>
          </Title>

          <p>
            {formatDate(match.start, timeframe)} - {formatDate(match.end, timeframe)}
          </p>
        </Header>


        <Chart>
          <Canvas innerRef={ref => this.gridLines = ref} />
          <Canvas innerRef={ref => this.klines = ref} />
          <Canvas innerRef={ref => this.pointerLines = ref} />
        </Chart>
      </Tile>
    );
  }
}
