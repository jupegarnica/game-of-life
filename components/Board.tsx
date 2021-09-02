import React, { useState } from 'react';
import Cell from './Cell.tsx';
import { useInterval } from '../lib/useInterval.ts';
import type {
  BoardType,
  Row,
  Vector,
} from '../types/Board.types.ts';
const HEIGHT = 3;
const WIDTH = 3;
const DELAY = 2000;
// const TOTAL_CELLS = HEIGHT * WIDTH;

// const INITIAL_CELLS: BoardType = [...Array(HEIGHT)].map(() =>
//   [...Array(WIDTH)].map(
//     // () => Math.random() > 0.5,
//     () => false,
//   ),
// );

const INITIAL_CELLS: BoardType = [
  [false, true, false],
  [false, true, false],
  [false, true, false],
];
function getNeighbors(cells: BoardType, position: Vector): Row {
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
function getNeighborsAlive(neighbors: Row) {
  return neighbors.filter(Boolean).length;
}

export default function Board({
  running,
}: {
  running: boolean;
}) {
  const [cells, setCells] = useState(INITIAL_CELLS);
  useInterval(() => {
    if (!running) {
      return;
    }
    const newCells: BoardType = JSON.parse(
      JSON.stringify(cells),
    );
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const position: Vector = [y, x];
        const isAlive = cells[y][x];

        const neighbors = getNeighbors(cells, position);
        const neighborsAlive = getNeighborsAlive(neighbors);
        console.log(
          isAlive && { neighbors, neighborsAlive, position },
        );

        if (isAlive) {
          newCells[y][x] =
            neighborsAlive === 2 || neighborsAlive === 3;
        } else {
          newCells[y][x] = neighborsAlive === 3;
        }
      }
    }
    setCells(newCells);
  }, DELAY);
  return (
    <>
      <style>
        {`
      .board {
        display: grid;
        grid-template-columns: repeat(${WIDTH}, 1fr);
        height: 100vh;
      }
      `}
      </style>
      <div className='board'>
        {/* <pre>{JSON.stringify(cells, null, 2)}</pre> */}
        {cells.map((row, y) =>
          row.map((value, x) => {
            const id = `${x}-${y}`;
            return (
              <Cell
                key={id}
                index={id}
                value={value}
                onClick={() => {
                  console.log(x, y);

                  const newCells = JSON.parse(
                    JSON.stringify(cells),
                  );
                  newCells[y][x] = !newCells[y][x];

                  setCells(newCells);
                }}
              />
            );
          }),
        )}
      </div>
    </>
  );
}
