import React from 'react';

export default function Cell({
  value,
  onClick,
  index,
}: {
  value: boolean;
  onClick: () => void;
  index: string;
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
