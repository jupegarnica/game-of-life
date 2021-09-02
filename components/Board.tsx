import React, { useState } from 'react';
import Cell from './Cell.tsx';
import { useInterval } from '../lib/useInterval.ts';

type Row = Array<boolean>;
type BoardType = Array<Row>;
type Vector = [number, number];

const HEIGHT = 10;
const WIDTH = 10;
const DELAY = 200;
// const TOTAL_CELLS = HEIGHT * WIDTH;

// const INITIAL_CELLS: BoardType = [...Array(HEIGHT)].map(() =>
//   [...Array(WIDTH)].map(
//     () => Math.random() > 0.5,
//     // () => false,
//   ),
// );

const INITIAL_CELLS: BoardType = [
  [true, true, true, false, true, true, true, true, false, true],
  [
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
  ],
  [true, true, true, true, true, false, false, true, true, true],
  [
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
  ],
  [
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [true, true, true, false, true, true, true, true, true, true],
  [true, true, true, true, true, false, true, true, false, true],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
  ],
  [
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
  ],
];
function getNeighbors(cells: BoardType, position: Vector): Row {
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
function getNeighborsAlive(neighbors: Row) {
  return neighbors.filter(Boolean).length;
}

export default function Board() {
  const [cells, setCells] = useState(INITIAL_CELLS);
  useInterval(() => {
    const newCells: BoardType = [...cells];
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const position: Vector = [x, y];
        const isAlive = cells[x][y];

        const neighbors = getNeighbors(cells, position);
        const neighborsAlive = getNeighborsAlive(neighbors);
        if (isAlive) {
          newCells[x][y] =
            neighborsAlive === 2 || neighborsAlive === 3;
        } else {
          newCells[x][y] = neighborsAlive === 3;
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
        {cells.map((row, x) =>
          row.map((value, y) => {
            const id = `${x}-${y}`;
            return (
              <Cell
                key={id}
                index={id}
                value={value}
                onClick={() => {
                  const newCells = [...cells];
                  newCells[x][y] = !newCells[x][y];
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
