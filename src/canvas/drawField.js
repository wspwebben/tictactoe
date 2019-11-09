import drawLine from './drawLine';
import drawCross from './drawCross';

export default function (ctx, {
  fieldSize,
  cellSize,
  totalSize,
  border,
}) {
  // eslint-disable-next-line
  ctx.strokeStyle = border.color;
  // eslint-disable-next-line
  ctx.lineWidth = border.width;

  for (let line = 0; line <= fieldSize; line += 1) {
    const x = line * (cellSize + border.width) + border.width / 2;

    drawLine(ctx, {
      start: [x, 0],
      end: [x, totalSize],
    });

    drawLine(ctx, {
      start: [0, x],
      end: [totalSize, x],
    });
  }

  drawCross(ctx, {
    color: 'red',
    x: 1,
    y: 1,
    cellSize,
    borderWidth: border.width,
  });
}
