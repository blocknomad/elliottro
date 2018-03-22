export default function drawKline({ context, body, wick, color}) {
  const normalizeLine = (n) => Math.floor(n) + .5;
  //const normalizeLine = (n) => n;

  context.save();

  // kline body
  context.fillStyle = color;
  context.fillRect(
    body.startX,
    body.startY,
    body.width,
    body.height < 1 ? 1 : body.height
  );

  // kline wick

  for (let k in wick) wick[k] = normalizeLine(wick[k]);

  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(wick.startX, wick.startY);
  context.lineTo(wick.endX, wick.endY);
  context.stroke();

  context.restore();
};
