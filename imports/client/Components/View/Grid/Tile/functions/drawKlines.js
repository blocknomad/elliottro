import Lodash from 'lodash';
import drawKline from './drawKline';
import drawPatternWindow from './drawPatternWindow';

import config from '/imports/client/config';

export default function drawKlines(
  canvas,
  match,
  ratio,
  klineWidth,
  canvasWidth,
  canvasHeight,
  windowTop,
  windowBottom
) {
  const context = canvas.getContext('2d');
  const { klines } = match;

  drawPatternWindow(context, klineWidth, ratio, match, windowTop, canvasHeight);

  Lodash.forEach(klines, (kline, index) => {
    const color = kline.close < kline.open ? '#E91E63' : '#8BC34A';
    const stroke = false;
    
    //const color = '#E91E63';
    //const stroke = kline.close > kline.open;

    const bodyLeftOffset = klineWidth / 2 + klineWidth * index + klineWidth / 2 * index;
    const wickLeftOffset = bodyLeftOffset + klineWidth / 2;

    drawKline({
      context,
      body: {
        startX: bodyLeftOffset,
        startY: (windowTop - Math.max(kline.open, kline.close)) * ratio,
        width: klineWidth,
        height: Math.abs(kline.open - kline.close) * ratio,
      },
      wick: {
        startX: wickLeftOffset,
        startY: (windowTop - kline.high) * ratio,
        endX: wickLeftOffset,
        endY: (windowTop - kline.low) * ratio,
      },
      color,
      stroke,
    });
  });
};
