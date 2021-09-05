import React from 'react';
import Cell from './Cell.tsx';

import type { BoardType } from '../types/Board.types.ts';

export default function Board({
  cells,
  delay,
  onClickCell,
}: {
  cells: BoardType;
  delay: number;
  onClickCell: (x: number, y: number) => void;
}) {
  const HEIGHT = cells.length;
  const WIDTH = cells[0].length;

  return (
    <>
      <style>
        {`
      .board {
        display: grid;
        grid-template-columns: repeat(${WIDTH}, 1fr);
        grid-template-rows: repeat(${HEIGHT}, 1fr);
        height: 100vh;
      }
      .cell {
        transition: background-color ${
          delay * 0.7
        }ms ease-in-out;

      }
      `}
      </style>
      <div className='board'>
        {/* <pre>{JSON.stringify(cells, null, 2)}</pre> */}
        {cells.map((row, y) =>
          row.map((value, x) => {
            return (
              <Cell
                key={`${x}-${y}`}
                position={[x, y]}
                value={value}
                onClick={() => onClickCell(x, y)}
              />
            );
          }),
        )}
      </div>
    </>
  );
}
