import drawField from './drawField';
import { drawCross, drawCircle } from './figures';

export default function (ctx, params) {
  drawField(ctx, params);

  const {
    cellSize,
    border,
  } = params;

  // eslint-disable-next-line
  ctx.strokeStyle = 'red';
  drawCross(ctx, {
    x: 1,
    y: 1,
    cellSize,
    borderWidth: border.width,
  });

  // eslint-disable-next-line
  ctx.strokeStyle = 'blue';
  drawCircle(ctx, {
    x: 1,
    y: 2,
    cellSize,
    borderWidth: border.width,
  });
}
