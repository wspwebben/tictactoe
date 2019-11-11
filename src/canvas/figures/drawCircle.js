import { MARK_OFFSET } from '../consts';
import getCenter from '../getCenter';

export default function (ctx, params) {
  const { x, y } = getCenter(params);
  const radius = MARK_OFFSET * params.cellSize;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);

  ctx.stroke();
  ctx.closePath();
}
