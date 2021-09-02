import React from 'react';
import Board from './Board.tsx';
import Controls from './Controls.tsx';
export default function Game() {
  const [running, setRunning] = React.useState(true);
  return (
    <div className='game'>
      <Board running={running} />
      <Controls
        onClick={() => setRunning(!running)}
        label={running ? 'stop' : 'play'}
      />
    </div>
  );
}
