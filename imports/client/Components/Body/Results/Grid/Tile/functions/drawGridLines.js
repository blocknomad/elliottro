import config from '/imports/client/config';
import drawGridLine from './drawGridLine';

import Lodash from 'lodash';

const getMonthsDiff = (s, e) => {
  let diff;
  const yDiff = e.getFullYear() - s.getFullYear();

  if (yDiff > 0) {
    const a = 11 - s.getMonth();
    const b = 12 * (yDiff > 1 ? yDiff - 1 : 0);
    const c = e.getMonth();

    diff = a + b + c;
  } else {
    const a = s.getMonth();
    const b = e.getMonth();

    diff = b - a;
  }

  return diff;
};

export default function drawGridLines(
  canvas,
  match,
  vStepper,
  vRatio,
  klineWidth,
  timeframe,
  canvasWidth,
  canvasHeight,
  windowTop,
  windowBottom
) {
  const context = canvas.getContext('2d');
  const color = config.colors.border;

  context.font = '10px Arial';
  context.fillStyle = config.colors.text;

  // vertical border
  drawGridLine(context, canvasWidth, 0, canvasWidth, canvasHeight, color);

  // horizontal border
  drawGridLine(context, 0, canvasHeight, canvasWidth, canvasHeight, color);

  // draw vertical gridlines
  for (
    let step = windowBottom + vStepper;
    step <= windowTop;
    step += vStepper
  ) {
    const y = (windowTop - step) * vRatio;

    drawGridLine(context, 0, y, canvasWidth + 5, y, color);
    context.fillText(step.toFixed(8), canvasWidth + 10, y + 4);
  }

  // draw horizontal gridlines

  const { klines } = match;

  const start = new Date(klines[0].openTime);
  const end = new Date(klines[klines.length - 1].openTime);
  const yDiff = end.getFullYear() - start.getFullYear();

  const limit = 4;
  const hRatio = (canvasWidth - klineWidth * 2) / (end.getTime() - start.getTime());

  let used = 0;
  let primary = true;

  const drawAtTime = (text, time) => {
    const textWidth = context.measureText(text.toString()).width;
    let xOffset;

    if (timeframe === 'M1') {
      const index = Lodash.findIndex(klines, ['openTime', time]);
      xOffset = klineWidth * (index + 1) + klineWidth / 2 * index;
    } else {
      xOffset = (time - start.getTime()) * hRatio + klineWidth;
    }

    const xPos = xOffset - textWidth / 2;

    if (primary) {
      context.font = 'bold 11px Arial';
    } else {
      context.font = '10px Arial';
    }

    if (xPos >= 5 && xPos + textWidth <= canvasWidth - 5) {
      const grid = canvasHeight + 5;

      context.fillText(text, xPos,  grid + (canvas.height - grid) / 2);
      drawGridLine(context, xOffset, canvasHeight + 5, xOffset, 0, color);
      used++;
    }
  };

  context.textBaseline = 'middle';

  if (yDiff >= limit) {
    /*const step = Math.round(yDiff / limit);
    console.log(yDiff, step);*/
  } else if (yDiff > 0) {
    for (
      let i = start.getFullYear() + 1;
      i <= end.getFullYear();
      i++
    ) {
      drawAtTime(i, Date.UTC(i, 0, 1));
    }

    primary = false;
  }
  /*if (yDiff >= limit) {
    const step = Math.round(yDiff / limit);

  } else {
    const mDiff = getMonthsDiff(start, end);
    console.log('diff: ', mDiff);

    if (mDiff > limit) {
      const hStepper = Math.round(mDiff / limit);
      console.log('step: ', step);

      for (
        let step = hStepper;
        start.getMonth() > step;
        step += hStepper
      )
      end.getMonth() - step;
      // align months to year
    } else {

    }
  }*/

  /*

  if (start.getFullYear() !== end.getFullYear()) {
    const diff = end.getFullYear() - start.getFullYear();

    if (diff < 5) {

    }
  } else if (start.getMonth() !== end.getMonth()) {

  } else if (start.getDate() !== end.getDate()) {

  }*/

}
