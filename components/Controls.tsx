import React from 'react';

export default function Controls(props: {
  handlePlay: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  handleAddRow: () => void;
  handleRemoveRow: () => void;
  label: string;
}) {
  return (
    <div
      className='controls'
      style={{ position: 'absolute', top: '0', right: '0' }}
    >
      <button className='play' onClick={props.handlePlay}>
        {props.label}
      </button>
      <button className='add' onClick={props.handleRemoveRow}>
        -
      </button>
      <button className='add' onClick={props.handleAddRow}>
        +
      </button>
    </div>
  );
}
