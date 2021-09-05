import type {
  BoardType,
  Row,
  Vector,
} from '../types/Board.types.ts';

export function getNeighbors(
  cells: BoardType,
  position: Vector,
): Row {
  const [y, x] = position;
  const neighbors: Row = [
    cells[y - 1]?.[x],
    cells[y + 1]?.[x],
    cells[y]?.[x - 1],
    cells[y]?.[x + 1],
    cells[y - 1]?.[x - 1],
    cells[y + 1]?.[x - 1],
    cells[y - 1]?.[x + 1],
    cells[y + 1]?.[x + 1],
  ].map(Boolean);
  return neighbors;
}
export function getNeighborsAlive(neighbors: Row) {
  return neighbors.filter(Boolean).length;
}
