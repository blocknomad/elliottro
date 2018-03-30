import Lodash from 'lodash';

import config from '/imports/client/config';

export default function drawPatternWindow(
  context,
  klineWidth,
  ratio,
  match,
  windowTop,
  canvasHeight
) {
  context.save();

  const { klines } = match;
  const klineTimeframe = klines[1].openTime - klines[0].openTime;

  const timeOffset = match.start - klines[0].openTime;
  const klinesOffset = timeOffset / klineTimeframe;

  const timeWidth = match.end - match.start;
  const klinesWidth = timeWidth / klineTimeframe + 1;

  const xOffset = klineWidth / 2 + klineWidth * klinesOffset - 1 + klineWidth / 2 * klinesOffset;
  const width = klineWidth * klinesWidth + klineWidth / 2 * klinesWidth;

  const klinesInWindow = Lodash.slice(klines, klinesOffset, klinesOffset + klinesWidth);
  const highInWindow = Lodash.maxBy(klinesInWindow, 'high');
  const lowInWindow = Lodash.minBy(klinesInWindow, 'low');

  const yOffset = (windowTop - highInWindow.high) * ratio - klineWidth;
  const height = (highInWindow.high - lowInWindow.low) * ratio + klineWidth * 2;

  context.fillStyle = 'rgba(0, 179, 188, .15)';
  context.fillRect(
    xOffset,
    Lodash.clamp(yOffset, 0, canvasHeight),
    width,
    Lodash.clamp(height, canvasHeight - 1)
  );

  context.restore();
};
