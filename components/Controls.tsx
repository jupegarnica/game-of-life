import React from 'react';

export default function Controls(props: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
}) {
  return (
    <div
      className='controls'
      style={{ position: 'absolute', top: '0', right: '0' }}
    >
      <button className='button' onClick={props.onClick}>
        {props.label}
      </button>
    </div>
  );
}
