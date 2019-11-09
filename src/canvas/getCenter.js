export default function ({
  x, y, cellSize, borderWidth,
}) {
  const halfCell = cellSize / 2;
  const offset = cellSize + borderWidth;

  const calculateCenter = coord => coord * offset + borderWidth + halfCell;

  return {
    x: calculateCenter(x),
    y: calculateCenter(y),
  };
}
