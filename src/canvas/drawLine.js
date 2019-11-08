export default function (ctx, {
  start: [x1, y1],
  end: [x2, y2],
}) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}
