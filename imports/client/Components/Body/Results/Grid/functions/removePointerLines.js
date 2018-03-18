

export default function removePointerLines(canvas) {
  const context = canvas.getContext('2d');

  canvas.style.cursor = 'initial';

  context.save();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.restore();
};
