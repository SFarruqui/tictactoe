import { useState } from 'react';

// Square component representing each cell in the tic-tac-toe grid
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value} {/* Display the value (either 'X', 'O', or null) */}
    </button>
  );
}

// Board component to display the game board
function Board({ xIsNext, squares, onPlay }) {
  // Handles click on each square
  function handleClick(i) {
    // Ignore the click if game already has a winner or square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Create a shallow copy of squares array
    const nextSquares = squares.slice();
    // Assign 'X' or 'O' based on whose turn it is
    nextSquares[i] = xIsNext ? 'X' : 'O';
    // Trigger the play action with updated squares
    onPlay(nextSquares);
  }

  // Determine if there is a winner
  const winner = calculateWinner(squares);
  // Status message display
  let status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

  // Render the game board with 9 squares and display the game status.
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Main game component
export default function Game() {
  // Game state including history of moves
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // Determine whose turn is next
  const xIsNext = currentMove % 2 === 0;
  // Current state of the game board
  const currentSquares = history[currentMove];

  // Handle the play and update game history
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Function to jump to a specific past move
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Create list of moves for navigation
  const moves = history.map((squares, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Render the game board and moves navigation
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function to calculate the winner of the game
function calculateWinner(squares) {
  // Possible winning combinations
  const lines = [
    // Rows, columns, and diagonals.
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Check each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Return the winner ('X' or 'O') if found
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Return null if no winner
  return null;
}

