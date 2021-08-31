import React, { useState } from 'react';

export default function Game() {
  return (
    <div className='game'>
      <Board />
    </div>
  );
}
const HEIGHT = 10;
const WIDTH = 10;
const TOTAL_CELLS = HEIGHT * WIDTH;
const INITIAL_CELLS: boolean[] = [...Array(TOTAL_CELLS)].map(
  () => Math.random() > 0.5,
);

function Board() {
  const [cells, setCells] = useState(INITIAL_CELLS);
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
        {cells.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => {
              const newCells = [...cells];
              newCells[index] = !newCells[index];
              setCells(newCells);
            }}
          />
        ))}
      </div>
      {/* <pre>{JSON.stringify(cells, null, 2)}</pre> */}
    </>
  );
}

function Cell({
  value,
  onClick,
}: {
  value: bolean;
  onClick: () => void;
}) {
  return (
    <>
      <span
        className={`cell ${value ? 'live' : 'dead'}`}
        onClick={onClick}
      >
        {value}
      </span>
    </>
  );
}
