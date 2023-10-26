// Import useState hook from React.
import { useState } from "react";

// Define a functional component Square that takes value and a click handler as props.
function Square({ value, onSquareClick }) {
  // Returns a button element with the provided value and click handler.
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Define the main Board functional component.
export default function Board() {
  // Set up local state for determining if it's X's turn, and initialize with true (X goes first).
  const [xIsNext, setXIsNext] = useState(true);

  // Set up local state for tracking the game board's state, and initialize with an array of 9 null values.
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Define a function that handles the game logic when a square is clicked.
  function handleClick(i) {
    // If there's already a winner or the current square is already filled, do nothing.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Copy the current squares array to avoid direct mutation and change the object.
    const nextSquares = squares.slice();
    // Set the current square to 'X' or 'O' based on whose turn it is.
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // Update the squares state and toggle the turn.
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // Calculate if there's a winner using the helper function.
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square)) {
    // Check if all squares are filled.
    status = "No Winner: It's a tie!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

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

// Helper function that checks for a winner based on predefined winning combinations.
function calculateWinner(squares) {
  // Define possible winning line combinations.
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
  // Loop through the possible winning combinations.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Check if any of the winning combinations have been met.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // If no winner, return null.
  return null;
}
