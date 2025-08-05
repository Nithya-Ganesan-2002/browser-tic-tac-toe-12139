import React, { useState } from 'react';
import './App.css';

// == UTILS ==

// Checks for winner and returns "X", "O", "Draw", or null
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  if (squares.every((sq) => sq)) {
    return 'Draw';
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  // State for the board: array of 9 items (X, O, or null)
  const [squares, setSquares] = useState(Array(9).fill(null));
  // X starts first
  const [xIsNext, setXIsNext] = useState(true);
  // Winner state
  const winner = calculateWinner(squares);

  // PUBLIC_INTERFACE
  /** Handles a click on a cell */
  function handleClick(index) {
    if (squares[index] || winner) return; // Don't allow move if occupied or game over

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  /** Resets board and player state for new game */
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // Prepare display (status above board)
  let status;
  if (winner === 'Draw') {
    status = "It's a draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Turn: ${xIsNext ? 'X' : 'O'}`;
  }

  // Minimal instructions
  const instructions =
    'Players take turns. Click a square to mark it. First to three in a row wins.';

  return (
    <div className="App tic-tac-toe-background">
      <div className="ttt-wrapper">
        <div className="ttt-header">
          <h2 className="ttt-title" style={{ color: 'var(--color-primary)' }}>Tic Tac Toe</h2>
          <p className="ttt-status" style={
              winner === 'Draw' ? { color: 'var(--color-secondary)' }
            : winner ? { color: 'var(--color-accent)' }
            : { color: 'var(--color-primary)' }
          }>
            {status}
          </p>
        </div>
        <div className="ttt-instructions">{instructions}</div>
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
          {squares.map((val, idx) => (
            <button
              key={idx}
              className="ttt-cell"
              aria-label={`Cell ${Math.floor(idx / 3) + 1}, ${idx % 3 + 1}`}
              onClick={() => handleClick(idx)}
              disabled={!!squares[idx] || winner}
              tabIndex={0}
            >{val}</button>
          ))}
        </div>
        <button className="ttt-reset" onClick={handleReset} aria-label="Restart Game">
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default App;
