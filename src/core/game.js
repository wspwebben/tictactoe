import {
  createField,
  getCell,
  makeMove,
  checkWinner,
  getNextPlayer,
} from './logic';

export default function* game({
  fieldSize: size, rowToWin, maxPlayers,
}) {
  const minTurns = maxPlayers * (rowToWin - 1);
  const maxTurns = size * size;
  const emptyCell = 0;

  let field = createField({ size, filler: emptyCell });
  let player = 1;
  let turn = 0;

  do {
    const move = yield {
      field,
      player,
      winner: false,
    };

    const cell = getCell({
      field,
      size,
      coords: move,
    });

    if (cell === emptyCell) {
      field = makeMove({
        field,
        size,
        player,
        coords: move,
      });

      turn += 1;

      if (turn > minTurns) {
        const winRow = checkWinner({
          field,
          size,
          lastMove: move,
          player,
          rowToWin,
        });

        if (winRow !== false) {
          return {
            field,
            player,
            winner: player,
            winRow,
          };
        }
      }

      player = getNextPlayer({
        currentPlayer: player,
        maxPlayers,
      });
    }
  } while (turn < maxTurns);

  return false;
}
