import React from 'react';
import Board from './Board.tsx';
import Controls from './Controls.tsx';
import { initialBoards } from '../services/initialBoards.ts';

export default function Game() {
  const [running, setRunning] = React.useState(true);
  return (
    <div className='game'>
      <Board
        running={running}
        initialCells={initialBoards[0]}
        delay={1000}
      />
      <Controls
        onClick={() => setRunning(!running)}
        label={running ? 'stop' : 'play'}
      />
    </div>
  );
}
