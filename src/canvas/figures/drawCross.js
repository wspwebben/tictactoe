import { MARK_OFFSET } from '../consts';
import getCenter from '../getCenter';

export default function (ctx, params) {
  const { x, y } = getCenter(params);
  const lineLength = MARK_OFFSET * params.cellSize;

  ctx.beginPath();
  ctx.moveTo(x - lineLength, y - lineLength);
  ctx.lineTo(x + lineLength, y + lineLength);

  ctx.moveTo(x + lineLength, y - lineLength);
  ctx.lineTo(x - lineLength, y + lineLength);
  ctx.stroke();
  ctx.closePath();
}
