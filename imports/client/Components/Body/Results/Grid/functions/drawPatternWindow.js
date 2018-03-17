import Lodash from 'lodash';

export default function drawPatternWindow(
  context,
  x,
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

  const xOffset = x / 2 + x * klinesOffset - 1 + x / 2 * klinesOffset;
  const width = x * klinesWidth + x / 2 * klinesWidth;

  const klinesInWindow = Lodash.slice(klines, klinesOffset, klinesOffset + klinesWidth);
  const highInWindow = Lodash.maxBy(klinesInWindow, 'high');
  const lowInWindow = Lodash.minBy(klinesInWindow, 'low');

  const yOffset = (windowTop - highInWindow.high) * ratio - x;
  const height = (highInWindow.high - lowInWindow.low) * ratio + x * 2;

  context.fillStyle = 'rgba(129,212,250, .25)';
  context.fillRect(
    xOffset,
    Lodash.clamp(yOffset, 0, canvasHeight),
    width,
    Lodash.clamp(height, 0, canvasHeight)
  );

  context.restore();
};
