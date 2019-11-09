import { MARK_OFFSET } from './consts';
import getCenter from './getCenter';

export default function (ctx, {
  color, ...data
}) {
  const { x, y } = getCenter(data);
  const radius = MARK_OFFSET * data.cellSize;

  // eslint-disable-next-line
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);

  ctx.stroke();
  ctx.closePath();
}
