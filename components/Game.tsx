import React, { useState, useRef, useEffect } from 'react';

export default function Game() {
  return (
    <div className='game'>
      <Board />
    </div>
  );
}

type BoardType = Array<boolean | undefined>;
const HEIGHT = 10;
const WIDTH = 10;
const DELAY = 100;
const TOTAL_CELLS = HEIGHT * WIDTH;

const INITIAL_CELLS: BoardType = [...Array(TOTAL_CELLS)].map(
  () => Math.random() > 0.5,
  // () => false,
);

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
function getNeighbors(cells: BoardType, index: number) {
  const neighbors = [
    index - WIDTH,
    index - WIDTH - 1,
    index - WIDTH + 1,
    index - 1,
    index + 1,
    index + WIDTH,
    index + WIDTH + 1,
    index + WIDTH - 1,
  ];
  return neighbors.map((neighbor) => cells[neighbor]);
}
function getNeighborsAlive(neighbors: BoardType) {
  return neighbors.filter(Boolean).length;
}

function Board() {
  const [cells, setCells] = useState(INITIAL_CELLS);
  useInterval(() => {
    // console.clear();
    // console.time();
    const newCells = cells.map((cell, index) => {
      const neighbors = getNeighbors(cells, index);
      const alive = getNeighborsAlive(neighbors);
      if (cell) {
        return alive === 2 || alive === 3;
      } else {
        return alive === 3;
      }
    });
    setCells(newCells);
    // console.timeEnd();
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
        {cells.map((value, index) => (
          <Cell
            key={index}
            index={index}
            value={value}
            onClick={() => {
              const newCells = [...cells];
              newCells[index] = !newCells[index];
              setCells(newCells);
            }}
          />
        ))}
      </div>
    </>
  );
}

function Cell({
  value,
  onClick,
  index,
}: {
  value: bolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <span
      data-key={index}
      className={`cell ${value ? 'live' : 'dead'}`}
      onClick={onClick}
    >
      {value ? 1 : 0}
    </span>
  );
}
