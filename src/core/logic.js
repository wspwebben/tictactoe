function getCellAddress({ coords: { x, y }, size: fieldSize }) {
  return {
    address: fieldSize * y + x,
  };
}

export function getCoordinates({ address, fieldSize }) {
  const x = address % fieldSize;
  const y = (address - x) / fieldSize;

  return {
    x,
    y,
  };
}

export function getCell({ field, size, coords }) {
  const { address } = getCellAddress({ coords, size });

  return {
    cell: field[address],
  };
}

export function createField({ size, filler }) {
  return {
    field: new Array(size * size).fill(filler),
    size,
  };
}

export function makeMove({
  field, size, coords, player,
}) {
  const { address: cellIndex } = getCellAddress({ coords, size });
  const newField = field.map((cell, index) => (cellIndex === index ? player : cell));

  return {
    field: newField,
    size,
  };
}

export function getNextPlayer({ currentPlayer, maxPlayers }) {
  return {
    player: (currentPlayer + 1) % maxPlayers,
  };
}

function checkDirection({
  field, size, rowToWin, player,
  direction: [vx, vy],
  lastMove: { baseX, baseY },
}) {
  const isValidCoord = coord => coord >= 0 && coord < size;
  const isValidPoint = ({ x, y }) => isValidCoord(x) && isValidCoord(y);

  // generate all possible starting points for a win-row on the current axis
  // the upper limit for them is ROW_TO_WIN
  // the lower limit is 1, when the lastMove is at the field border
  const axisIterator = Array.from({ length: rowToWin }, (_, i) => ({
    x: baseX - i * vx,
    y: baseY - i * vy,
  })).filter(isValidPoint);

  return axisIterator.some((startPoint) => {
    // generate all points for row
    // it's similiar to generating starting points, but in reverse direction
    // since it mostly contain previous row, but with one point removed/added
    // it's probably a good idea to replace it with Sliding Window pattern

    const rowIterator = Array.from({ length: rowToWin }, (_, i) => ({
      x: startPoint.x + i * vx,
      y: startPoint.y + i * vy,
    }));

    if (!rowIterator.every(isValidPoint)) return false;

    const isWinningRow = rowIterator.every((coords) => {
      const { cell } = getCell({
        field,
        size,
        coords,
      });

      return (cell === player);
    });

    if (isWinningRow) {
      // eslint-disable-next-line
      console.log(rowIterator);

      // need to find a way to return that points (first and last ones)

      return true;
    }

    return false;
  });
}

export function checkWinner({
  field, size, noWinner, rowToWin,
  // the only possible winner is the player who made the last move
  player,
  // and the winning row has to contain that move
  lastMove,
}) {
  // there's only 8 ways the row can contain the cell
  // but half of them are on the same axis
  const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];

  directions.some(direction => checkDirection({
    field,
    player,
    direction,
    lastMove,
    size,
    rowToWin,
  }));

  // need to find a way to return an object with win-row data from .some
  return { winner: noWinner };
}
