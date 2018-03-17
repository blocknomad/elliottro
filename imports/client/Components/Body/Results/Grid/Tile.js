import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

import Exchanges from '/imports/both/fixtures/exchanges';

// Styled components

const tileHorizontalPadding = 15;

const Tile = Styled.article`
  box-sizing: border-box;
  background-color: #fff;
  padding: ${tileHorizontalPadding}px;
  border: 1px solid ${config.colors.border};
  box-shadow: 2px 2px 2px ${config.colors.border};
  display: inline-block;
  width: calc(50% - 10px);

  &:nth-child(odd) {
    margin-right: 20px;
  }

  &:nth-child(odd), &:nth-child(even) {
    margin-bottom: 20px;
  }
`;

const Chart = Styled.canvas`
  border: 1px solid ${config.colors.border};
  box-sizing: border-box;
`;

const Header = Styled.div`
  margin-bottom: 15px;

  p {
    margin-top: 3px;
    color: #777;
    font-size: 12px;
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
    const { match } = this.props;

    this.drawChart(match);

    window.addEventListener('resize', () => this.drawChart(match));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.drawChart);
  }

  drawChart(match) {
    const maxInWindow = Lodash.maxBy(match.klines, 'high');
    const minInWindow = Lodash.minBy(match.klines, 'low');

    const stepper = Number(((maxInWindow.high - minInWindow.low) / 5).toPrecision(1));

    const windowTop = maxInWindow.high * 1.007;
    const windowBottom = minInWindow.low - (minInWindow.low % stepper);

    this.chart.width = this.chart.parentElement.scrollWidth - 2 - tileHorizontalPadding * 2;
    this.chart.height = this.chart.width / 2;

    const context = this.chart.getContext('2d');

    const canvasWidth = this.chart.width - 70;
    const canvasHeight = this.chart.height - 20;

    this.drawGridLines(
      context,
      stepper,
      canvasWidth,
      canvasHeight,
      windowTop,
      windowBottom
    );

    this.drawKlines(
      context,
      canvasWidth,
      canvasHeight,
      match,
      windowTop,
      windowBottom
    );
  }

  drawKlines(
    context,
    canvasWidth,
    canvasHeight,
    match,
    windowTop,
    windowBottom
  ) {
    // x * numberOfCandlesticks + x / 2 * (numberOfCandlesticks + 1) = canvasWidth
    // y

    const { klines } = match;

    const x = canvasWidth / (klines.length + (klines.length + 1) / 2);
    const ratio = canvasHeight / (windowTop - windowBottom);

    Lodash.forEach(klines, (kline, index) => {
      /*const color = kline.closeTime > match.start && kline.closeTime < match.end ?
        (kline.close < kline.open ? '#C2185B': '#689F38') :
        (kline.close < kline.open ? '#E91E63' : '#8BC34A');*/

      const color = kline.close < kline.open ? '#E91E63' : '#8BC34A';

      const bodyLeftOffset = x / 2 + x * index + x / 2 * index;
      const wickLeftOffset = bodyLeftOffset + x / 2;

      this.drawKline({
        context,
        body: {
          startX: bodyLeftOffset,
          startY: (windowTop - Math.max(kline.open, kline.close)) * ratio,
          width: x,
          height: Math.abs(kline.open - kline.close) * ratio,
        },
        wick: {
          startX: wickLeftOffset,
          startY: (windowTop - kline.high) * ratio,
          endX: wickLeftOffset,
          endY: (windowTop - kline.low) * ratio,
        },
        color,
      });
    });
  }

  drawKline({ context, body, wick, color}) {
    context.save();

    // kline body
    context.fillStyle = color;
    context.fillRect(body.startX, body.startY, body.width, body.height);

    // kline wick
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(wick.startX, wick.startY);
    context.lineTo(wick.endX, wick.endY);
    context.stroke();

    context.restore();
  }

  drawGridLines(
    context,
    stepper,
    canvasWidth,
    canvasHeight,
    windowTop,
    windowBottom
  ) {
    const color = config.colors.border;

    context.font = '10px Arial';
    context.fillStyle = '#37474F';

    // vertical border
    this.drawLine(context, canvasWidth, 0, canvasWidth, canvasHeight, color);

    // horizontal border
    this.drawLine(context, 0, canvasHeight, canvasWidth, canvasHeight, color);

    const ratio = canvasHeight / (windowTop - windowBottom);

    for (
      let step = windowBottom + stepper;
      step <= windowTop;
      step += stepper
    ) {
      const y = (windowTop - step) * ratio;

      this.drawLine(context, 0, y, canvasWidth + 5, y, color);
      context.fillText(step.toFixed(8), canvasWidth + 10, y + 4);
    }
  }

  drawLine(context, startX, startY, endX, endY, color) {
    context.save();
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    context.restore();
  }

  render() {
    const { match } = this.props;

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
            Starts at: {new Date(match.start + 1000).toLocaleString()}
            &nbsp;&nbsp;&nbsp;&nbsp;Ends at: {new Date(match.end + 1000).toLocaleString()}
          </p>
        </Header>


        <Chart innerRef={ref => this.chart = ref} />
      </Tile>
    );
  }
}
