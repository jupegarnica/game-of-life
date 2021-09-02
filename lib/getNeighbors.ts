import type {
    BoardType,
    Row,
    Vector,
  } from '../types/Board.types.ts';

export function getNeighbors(cells: BoardType, position: Vector): Row {
    const [x, y] = position;
    const neighbors: Row = [
      cells[x]?.[y - 1],
      cells[x]?.[y + 1],
      cells[x - 1]?.[y],
      cells[x + 1]?.[y],
      cells[x - 1]?.[y - 1],
      cells[x - 1]?.[y + 1],
      cells[x + 1]?.[y - 1],
      cells[x + 1]?.[y + 1],
    ].map(Boolean);
    return neighbors;
  }
  export function getNeighborsAlive(neighbors: Row) {
    return neighbors.filter(Boolean).length;
  }
