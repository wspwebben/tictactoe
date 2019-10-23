import {
  createField,
  getCell,
  makeMove,
  checkWinner,
  getNextPlayer,
} from './logic';

export default function* game({
  fieldSize: size, rowToWin, noWinner, emptyCell, maxPlayers,
}) {
  const minTurns = maxPlayers * (rowToWin - 1);
  const maxTurns = size * size;

  let { field } = createField({ size, filler: emptyCell });
  let player = 1;
  let turn = 0;
  let winner = noWinner;

  do {
    const move = yield {
      field,
      player,
      winner,
    };

    const { cell } = getCell({
      field,
      size,
      coords: move,
    });

    if (cell === emptyCell) {
      ({ field } = makeMove({
        field,
        size,
        player,
        coords: move,
      }));

      turn += 1;

      if (turn > minTurns) {
        ({ player: winner } = checkWinner({
          field,
          size,
          lastMove: move,
          player,
          noWinner,
          rowToWin,
        }));

        if (winner !== noWinner) {
          return {
            field,
            player,
            winner,
          };
        }
      }

      ({ player } = getNextPlayer({
        currentPlayer: player,
        maxPlayers,
      }));
    }
  } while (turn < maxTurns);

  return false;
}
