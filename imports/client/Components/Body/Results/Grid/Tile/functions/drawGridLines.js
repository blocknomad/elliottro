import config from '/imports/client/config';
import drawGridLine from './drawGridLine';

export default function drawGridLines(
  canvas,
  match,
  stepper,
  ratio,
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
    let step = windowBottom + stepper;
    step <= windowTop;
    step += stepper
  ) {
    const y = (windowTop - step) * ratio;

    drawGridLine(context, 0, y, canvasWidth + 5, y, color);
    context.fillText(step.toFixed(8), canvasWidth + 10, y + 4);
  }

  // draw horizontal gridlines

  const { klines } = match;

  const start = new Date(klines[0].openTime);
  const end = new Date(klines[klines.length - 1].openTime);

  if (start.getFullYear() !== end.getFullYear()) {

  } else if (start.getMonth() !== end.getMonth()) {

  } else if (start.getDate() !== end.getDate()) {

  }

}
