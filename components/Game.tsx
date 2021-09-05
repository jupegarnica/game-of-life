import React, { useState } from 'react';
import Board from './Board.tsx';
import Controls from './Controls.tsx';
import { initialBoards } from '../services/initialBoards.ts';
import { useInterval } from '../services/useInterval.ts';
import {
  getNeighbors,
  getNeighborsAlive,
} from '../services/getNeighbors.ts';

import type {
  BoardType,
  Row,
  Vector,
} from '../types/Board.types.ts';
function printBoard(board: BoardType) {
  console.log(JSON.stringify(board));
}
function addRow(
  board: BoardType,
  set: React.Dispatch<React.SetStateAction<BoardType>>,
  newValue = false,
) {
  const WIDTH = board[0].length + 1;

  const row: Row = [...Array(WIDTH)].map(() => newValue);
  const newBoard: BoardType = board.map((row) => [
    ...row,
    newValue,
  ]);
  set([...newBoard, row]);
}

function removeRow(
  board: BoardType,
  set: React.Dispatch<React.SetStateAction<BoardType>>,
) {
  const WIDTH = board[0].length - 1;

  const newBoard: BoardType = board.map((row) => {
    return row.slice(0, WIDTH);
  });
  set(newBoard.slice(0, WIDTH));
}
export default function Game() {
  const [running, setRunning] = React.useState(false);
  const [delay, setDelay] = React.useState(1000);
  const [cells, setCells] = useState(initialBoards[0]);
  const HEIGHT = cells.length;
  const WIDTH = cells[0].length;

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
    <div
      className='game'
      onDoubleClick={() => printBoard(cells)}
    >
      <Board
        cells={cells}
        delay={delay}
        onClickCell={(x, y) => {
          const newCells = JSON.parse(JSON.stringify(cells));
          newCells[y][x] = !newCells[y][x];

          setCells(newCells);
        }}
      />
      <Controls
        handlePlay={() => setRunning(!running)}
        handleAddRow={() => addRow(cells, setCells)}
        handleRemoveRow={() => removeRow(cells, setCells)}
        label={running ? 'stop' : 'play'}
      />
    </div>
  );
}
