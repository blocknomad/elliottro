import Lodash from 'lodash';
import drawKline from './drawKline';
import drawPatternWindow from './drawPatternWindow';


export default function drawKlines(
  context,
  canvasWidth,
  canvasHeight,
  match,
  windowTop,
  windowBottom
) {
  const { klines } = match;

  // x * numberOfCandlesticks + x / 2 * (numberOfCandlesticks + 1) = canvasWidth
  const x = canvasWidth / (klines.length + (klines.length + 1) / 2);
  const ratio = canvasHeight / (windowTop - windowBottom);

  drawPatternWindow(context, x, ratio, match, windowTop, canvasHeight);

  Lodash.forEach(klines, (kline, index) => {
    /*const color = kline.closeTime > match.start && kline.closeTime < match.end ?
      (kline.close < kline.open ? '#C2185B': '#689F38') :
      (kline.close < kline.open ? '#E91E63' : '#8BC34A');*/

    const color = kline.close < kline.open ? '#E91E63' : '#8BC34A';

    const bodyLeftOffset = x / 2 + x * index + x / 2 * index;
    const wickLeftOffset = bodyLeftOffset + x / 2;

    drawKline({
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
};
