import Lodash from 'lodash';
import config from '/imports/client/config';

export default function drawPointerLines(
  canvas,
  event,
  match,
  ratio,
  klineWidth,
  klinesWidth,
  klinesHeight,
  windowTop
) {
  const context = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = Math.floor(event.clientY - rect.top) + .5;

  context.save();

  canvas.style.cursor = 'initial';
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (x < klinesWidth && y < klinesHeight) {
    // set crosshair cursor
    canvas.style.cursor = 'crosshair';


    // setup stroke color and line dash
    context.strokeStyle = '#999';
    context.setLineDash([4]);

    // draw horizontal line
    context.beginPath();
    context.moveTo(0.5, y);
    context.lineTo(klinesWidth, y);
    context.lineWidth = 1;
    context.stroke();

    // draw vertical line
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

    // write kline stats on upper left corner
    const kline = match.klines[klineIndex];

    context.font = '10px Arial';
    context.fillStyle = '#666';
    context.fillText(`O:${kline.open}  H:${kline.high}  L:${kline.low}  C:${kline.close}`, 3, 13, klinesWidth);


    // vertical marker
    const markerColor = '#444';
    const markerTextColor = '#FFF';
    const rectYOffset = Lodash.clamp(y - 8, 0, klinesHeight - 16);

    context.fillStyle = markerColor;
    context.fillRect(klinesWidth + 1, rectYOffset, canvas.width - klinesWidth, 16);
    context.fillStyle = markerTextColor;

    const yText = (windowTop - y / ratio).toFixed(8);
    context.fillText(yText, klinesWidth + 11, rectYOffset + 11);

    // horizontal marker
    const xText = new Date(kline.openTime).toLocaleString();
    const textWidth = context.measureText(xText).width;
    const rectXOffset = Lodash.clamp(
      xpos - textWidth / 2 - 4,
      0,
      klinesWidth - textWidth - 8
    );

    context.fillStyle = markerColor;
    context.fillRect(
      rectXOffset,
      klinesHeight + 1,
      textWidth + 8,
      16
    );
    context.fillStyle = markerTextColor;
    context.fillText(xText, rectXOffset + 4, klinesHeight + 13);
  }

  context.restore();
};
