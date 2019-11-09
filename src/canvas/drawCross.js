import { MARK_OFFSET } from './consts';
import getCenter from './getCenter';

export default function (ctx, {
  color, ...data
}) {
  const { x, y } = getCenter(data);
  const lineLength = MARK_OFFSET * data.cellSize / 2;

  // eslint-disable-next-line
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.moveTo(x - lineLength, y - lineLength);
  ctx.lineTo(x + lineLength, y + lineLength);

  ctx.moveTo(x + lineLength, y - lineLength);
  ctx.lineTo(x - lineLength, y + lineLength);
  ctx.stroke();
  ctx.closePath();
}
