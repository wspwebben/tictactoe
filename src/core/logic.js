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

export function checkWinner({
  field, size, player, noWinner,
}) {
  const countHelper = coords => Number(getCell({ field, size, coords }).cell === player);
  const checkHelper = counter => counter === size;
  const lastCell = size - 1;

  let diagCount = 0;
  let addCount = 0;

  for (let y = 0; y < size; y += 1) {
    let rowCount = 0;
    let colCount = 0;

    for (let x = 0; x < size; x += 1) {
      rowCount += countHelper({ x, y });
      colCount += countHelper({ x: y, y: x });
    }

    if (checkHelper(rowCount)) {
      return {
        start: { x: 0, y },
        end: { x: lastCell, y },
        winner: player,
      };
    }

    if (checkHelper(colCount)) {
      return {
        start: { x: y, y: 0 },
        end: { x: y, lastCell },
        winner: player,
      };
    }

    diagCount += countHelper({ x: y, y });
    addCount += countHelper({ x: lastCell - y, y });
  }

  if (checkHelper(diagCount)) {
    return {
      start: { x: 0, y: 0 },
      end: { x: lastCell, y: lastCell },
      winner: player,
    };
  }

  if (checkHelper(addCount)) {
    return {
      start: { x: lastCell, y: 0 },
      end: { x: 0, y: lastCell },
      winner: player,
    };
  }

  return {
    start: {},
    end: {},
    winner: noWinner,
  };
}
