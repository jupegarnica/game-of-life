import React, { useState } from 'react';
import Cell from './Cell.tsx';
import { useInterval } from '../services/useInterval.ts';
import {
  getNeighbors,
  getNeighborsAlive,
} from '../services/getNeighbors.ts';
import type {
  BoardType,
  // Row,
  Vector,
} from '../types/Board.types.ts';

function printBoard(board: BoardType) {
  console.log(JSON.stringify(board));
}

export default function Board({
  running,
  initialCells,
  delay = 200,
}: {
  running: boolean;
  initialCells: BoardType;
  delay?: number;
}) {
  const [cells, setCells] = useState(initialCells);

  const HEIGHT = initialCells.length;
  const WIDTH = initialCells[0].length;

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

        if (isAlive) {
          newCells[y][x] =
            neighborsAlive === 2 || neighborsAlive === 3;
        } else {
          newCells[y][x] = neighborsAlive === 3;
        }
      }
    }
    setCells(newCells);
  }, delay);
  return (
    <>
      <style>
        {`
      .board {
        display: grid;
        grid-template-columns: repeat(${WIDTH}, 1fr);
        height: 100vh;
      }
      .cell {
        transition: background-color ${
          delay * 0.7
        }ms ease-in-out;

      }
      `}
      </style>
      <div
        className='board'
        onDoubleClick={() => printBoard(cells)}
      >
        {/* <pre>{JSON.stringify(cells, null, 2)}</pre> */}
        {cells.map((row, y) =>
          row.map((value, x) => {
            return (
              <Cell
                key={`${x}-${y}`}
                position={[x, y]}
                value={value}
                onClick={() => {
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
