import { FIELD_SIZE, EMPTY_CELL, MAX_PLAYERS } from './consts';

function getCellAddress({ x, y }, fieldSize = FIELD_SIZE) {
  return fieldSize * y + x;
}

export function getCoordinates(address, fieldSize = FIELD_SIZE) {
  const x = address % fieldSize;
  const y = (address - x) / fieldSize;
  return { x, y };
}

function getCell(field, cell) {
  return field[getCellAddress(cell)];
}

export function createField(fieldSize = FIELD_SIZE) {
  return new Array(fieldSize * fieldSize).fill(EMPTY_CELL);

  // return Array.from(
  //   { length: fieldSize },
  //   () => new Array(fieldSize).fill('')
  // );
}

export function makeMove(field, { x, y }, player) {
  const cellIndex = getCellAddress({ x, y });
  return field.map((cell, index) => (cellIndex === index ? player : cell));
}

export function getNextPlayer(currentPlayer, maxPlayers = MAX_PLAYERS) {
  return (currentPlayer + 1) % maxPlayers;
}

export function checkWinner(field, player, fieldSize = FIELD_SIZE) {
  const countHelper = cell => Number(getCell(field, cell) === player);
  const checkHelper = counter => counter === fieldSize;
  const lastCell = fieldSize - 1;

  let diagCount = 0;
  let addCount = 0;

  for (let y = 0; y < fieldSize; y += 1) {
    let rowCount = 0;
    let colCount = 0;

    for (let x = 0; x < fieldSize; x += 1) {
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
    winner: -1,
  };
}
