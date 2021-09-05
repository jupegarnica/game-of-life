import React from 'react';
import { colors } from '../services/colors.ts';
import { Vector } from '../types/Board.types.ts';

// const getRandomColor = () => {
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex];
// };

const pickColor = ([x, y]: Vector) => {
  return colors[y % colors.length];
};
export default function Cell({
  value,
  onClick,
  position,
}: {
  value: boolean;
  onClick: () => void;
  position: Vector;
}) {
  const [x, y] = position;
  const id = `${x}-${y}`;
  return (
    <span
      data-key={id}
      className={`cell ${value ? 'live' : 'dead'}`}
      onClick={onClick}
      style={{
        backgroundColor: value
          ? pickColor(position)
          : 'transparent',
        opacity: Math.random() > 0.8 ? 0.9 : 0.6,
      }}
    >
      {value ? 1 : 0}
      {/* {index} */}
    </span>
  );
}
