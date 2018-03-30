export default function drawKline({ context, body, wick, color, stroke}) {
  const normalizeLine = (n) => Math.floor(n) + .5;

  context.save();

  // kline body

  body.height = body.height < 1 ? 1 : body.height;

  if (stroke) {
    context.strokeStyle = color;
    context.rect(
      body.startX,
      body.startY,
      body.width,
      body.height
    );
    context.stroke();
  } else {
    context.fillStyle = color;
    context.fillRect(
      body.startX,
      body.startY,
      body.width,
      body.height
    );
  }

  // kline wick

  for (let k in wick) wick[k] = normalizeLine(wick[k]);

  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(wick.startX, wick.startY);
  context.lineTo(wick.endX, body.startY);
  context.stroke();

  context.beginPath();
  context.moveTo(wick.startX, body.startY + body.height);
  context.lineTo(wick.endX, wick.endY);
  context.stroke();

  context.restore();
};
