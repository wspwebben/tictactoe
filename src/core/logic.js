function getCellAddress({ coords: { x, y }, size: fieldSize }) {
  return fieldSize * y + x;
}

export function getCoordinates({ address, fieldSize }) {
  const x = address % fieldSize;
  const y = (address - x) / fieldSize;

  return { x, y };
}

export function getCell({ field, size, coords }) {
  const address = getCellAddress({ coords, size });

  return field[address];
}

export function createField({ size, filler }) {
  return new Array(size * size).fill(filler);
}

export function makeMove({
  field, size, coords, player,
}) {
  const cellIndex = getCellAddress({ coords, size });

  return field.map((cell, index) => (cellIndex === index ? player : cell));
}

export function getNextPlayer({ currentPlayer, maxPlayers }) {
  return (currentPlayer % maxPlayers) + 1;
}

function checkDirection({
  field, size, rowToWin, player,
  direction: [vx, vy],
  lastMove: { x: baseX, y: baseY },
}) {
  const isValidCoord = coord => coord >= 0 && coord < size;
  const isValidPoint = ({ x, y }) => isValidCoord(x) && isValidCoord(y);

  // generate all possible starting points for a win-row on the current axis
  // the upper limit for them is ROW_TO_WIN
  // the lower limit is 1, when the lastMove is at the field border
  const axis = Array.from({ length: rowToWin }, (_, i) => ({
    x: baseX - i * vx,
    y: baseY - i * vy,
  })).filter(isValidPoint);

  // eslint-disable-next-line
  for (const { x: startX, y: startY } of axis) {
    // generate all points for row
    // it's similiar to generating starting points, but in reverse direction
    // since it mostly contain previous row, but with one point removed/added
    // it's probably a good idea to replace it with Sliding Window pattern

    const row = Array.from({ length: rowToWin }, (_, i) => ({
      x: startX + i * vx,
      y: startY + i * vy,
    }));

    if (row.every(isValidPoint)) {
      const isWinningRow = row.every((coords) => {
        const cell = getCell({
          field,
          size,
          coords,
        });

        return (cell === player);
      });

      if (isWinningRow) return row;
    }
  }

  return false;
}

export function checkWinner({
  field, size, rowToWin,
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

  // eslint-disable-next-line
  for (const direction of directions) {
    const directionRow = checkDirection({
      field,
      player,
      direction,
      lastMove,
      size,
      rowToWin,
    });

    if (directionRow !== false) {
      const start = directionRow[0];
      const end = directionRow[directionRow.length - 1];

      return {
        start,
        end,
      };
    }
  }

  return false;
}
