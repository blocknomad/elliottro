export default function drawGridLine(context, startX, startY, endX, endY, color) {
  context.save();
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
  context.restore();
};
