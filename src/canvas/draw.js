import { drawCross, drawCircle } from './figures';

const figures = [drawCross, drawCircle];
const getFigure = player => figures[player % figures.length];

export default function (ctx, params) {
  const {
    player,
    ...drawParams
  } = params;

  const drawFigure = getFigure(player);

  drawFigure(ctx, drawParams);
}
