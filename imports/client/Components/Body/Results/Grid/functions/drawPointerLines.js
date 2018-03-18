import Lodash from 'lodash';
import config from '/imports/client/config';

export default function drawPointerLines(
  canvas,
  event,
  match,
  ratio,
  klineWidth,
  klinesWidth,
  klinesHeight
) {
  const context = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = Math.floor(event.clientY - rect.top) + .5;

  context.save();

  canvas.style.cursor = 'initial';
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (x < klinesWidth && y < klinesHeight) {
    canvas.style.cursor = 'crosshair';

    context.strokeStyle = '#999';
    context.setLineDash([4]);

    context.beginPath();
    context.moveTo(0.5, y);
    context.lineTo(klinesWidth, y);
    context.lineWidth = 1;
    context.stroke();

    const klineIndex = Lodash.clamp(
      Math.floor((x - klineWidth / 4) / (klineWidth + klineWidth / 2)),
      0,
      match.klines.length - 1
    );
    const xpos = klineWidth / 2 + klineWidth * klineIndex + klineWidth / 2 * (klineIndex + 1);

    context.beginPath();
    context.moveTo(xpos, 0.5);
    context.lineTo(xpos, klinesHeight);
    context.lineWidth = 1;
    context.stroke();

    const kline = match.klines[klineIndex];

    context.font = '10px Arial';
    context.fillStyle = '#666';
    context.fillText(`O:${kline.open}  H:${kline.high}  L:${kline.low}  C:${kline.close}`, 3, 13);
  }

  context.restore();
};
