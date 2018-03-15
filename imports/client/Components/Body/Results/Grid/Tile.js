import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

// Styled components

const Tile = Styled.article`
  box-sizing: border-box;
  background-color: #fff;

  h3 {
    color: ${config.colors.text};
  }
`;

const Chart = Styled.canvas`
  border: 1px solid #ECEFF1;
`;

const Title = Styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;

  h3 {
    font-size: 15px;
    flex-grow: 100;
  }
`;

const Visit = Styled.a`
  i {
    color: ${config.colors.primary};
    font-size: 18px;
    vertical-align: top;
  }
`


export default class GridTileComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match } = this.props;

    const maxInWindow = Lodash.maxBy(match.klines, 'high');
    const minInWindow = Lodash.minBy(match.klines, 'low');

    const stepper = Number(((maxInWindow.high - minInWindow.low) / 5).toPrecision(1));

    const windowTop = maxInWindow.high * 1.007;
    const windowBottom = minInWindow.low - (minInWindow.low % stepper);

    this.chart.width = this.chart.parentElement.clientWidth;
    this.chart.height = 250;

    const context = this.chart.getContext('2d');

    const canvasWidth = this.chart.width - 75;
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
    const color = '#ECEFF1';

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
        <Title>
          <h3>{match.exchange}:{match.baseAsset}{match.quoteAsset}</h3>

          <Visit
            title="Access this symbol on exchange"
            href={`https://www.binance.com/trade.html?symbol=${match.baseAsset}_${match.quoteAsset}`}
            target="_blank"
          >
            <i className="material-icons">launch</i>
          </Visit>
        </Title>

        <Chart innerRef={ref => this.chart = ref} />
      </Tile>
    );
  }
}
