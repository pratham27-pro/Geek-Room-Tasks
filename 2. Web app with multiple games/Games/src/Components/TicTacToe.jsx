import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const TicTacToe = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState("Game in progress");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winningCells, setWinningCells] = useState([]);

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const checkWinner = (squares) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinningCells(pattern);
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || status.includes("Winner")) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setStatus(`Winner: ${winner}`);
      setScores({ ...scores, [winner]: scores[winner] + 1 });
    } else if (!newBoard.includes(null)) {
      setStatus("Game Draw!");
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus("Game in progress");
    setWinningCells([]);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
  };

  const Cell = ({ value, onClick, index }) => {
    const isWinning = winningCells.includes(index);
    return (
      <button
        className={`w-20 h-20 border-2 border-gray-300 dark:border-gray-600 text-4xl font-bold
          ${isWinning ? "bg-green-200 dark:bg-green-700" : ""}
          ${!value ? "hover:bg-gray-100 dark:hover:bg-gray-700" : ""}
          ${value === "X" ? "text-blue-500 dark:text-blue-400" : "text-red-500 dark:text-red-400"}
          transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400
          rounded`}
        onClick={onClick}
        disabled={!!value || status.includes("Winner")}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
        aria-label="Toggle theme"
      >
        {darkMode ? (
          <FaSun className="text-yellow-500 text-xl" />
        ) : (
          <FaMoon className="text-gray-700 text-xl" />
        )}
      </button>

      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
        Tic Tac Toe
      </h1>

      <div className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        {status}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            index={index}
          />
        ))}
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Reset Game
        </button>
        <button
          onClick={resetScores}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
        >
          Reset Scores
        </button>
      </div>

      <div className="flex gap-8 text-lg font-semibold">
        <div className="text-blue-500 dark:text-blue-400">Player X: {scores.X}</div>
        <div className="text-red-500 dark:text-red-400">Player O: {scores.O}</div>
      </div>
    </div>
  );
};

export default TicTacToe;