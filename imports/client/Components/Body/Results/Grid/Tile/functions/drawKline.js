export default function drawKline({ context, body, wick, color}) {
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
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(wick.startX, wick.startY);
  context.lineTo(wick.endX, wick.endY);
  context.stroke();

  context.restore();
};
