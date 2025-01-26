import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FaSun, FaMoon, FaRedo } from "react-icons/fa";

const WORDS = {
  easy: ["cat", "dog", "run", "jump", "play"],
  medium: ["python", "javascript", "react", "coding", "developer"],
  hard: ["extraordinary", "programming", "development", "optimization", "algorithm"]
};

const Hangman = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [difficulty, setDifficulty] = useState("medium");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);

  const selectWord = useCallback(() => {
    const words = WORDS[difficulty];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord.toLowerCase());
  }, [difficulty]);

  useEffect(() => {
    selectWord();
  }, [selectWord]);

  const resetGame = () => {
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameOver(false);
    setWon(false);
    selectWord();
  };

  const guessLetter = (letter) => {
    if (gameOver) return;

    setGuessedLetters((prev) => new Set([...prev, letter]));
    
    if (!word.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
      if (wrongGuesses + 1 >= 6) {
        setGameOver(true);
      }
    } else {
      const isWon = [...word].every((char) => guessedLetters.has(char) || char === letter);
      if (isWon) {
        setWon(true);
        setGameOver(true);
        setScore((prev) => prev + 1);
      }
    }
  };

  const hangmanDrawing = useMemo(() => {
    const parts = [
      (
        <div key="gallows" className="absolute w-[10px] h-[100px] bg-current top-0 right-[50%]"/>
      ),
      (
        <div key="head" className="absolute w-[20px] h-[20px] rounded-full border-[3px] border-current top-[20px] right-[calc(50%-10px)]"/>
      ),
      (
        <div key="body" className="absolute w-[3px] h-[30px] bg-current top-[40px] right-[50%]"/>
      ),
      (
        <div key="leftArm" className="absolute w-[20px] h-[3px] bg-current top-[50px] right-[50%] rotate-45 origin-right"/>
      ),
      (
        <div key="rightArm" className="absolute w-[20px] h-[3px] bg-current top-[50px] right-[calc(50%-3px)] -rotate-45 origin-left"/>
      ),
      (
        <div key="legs" className="absolute w-[3px] h-[20px] bg-current top-[70px] right-[50%]"/>
      )
    ];

    return parts.slice(0, wrongGuesses);
  }, [wrongGuesses]);

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Hangman Game</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
            </button>
            <span className="text-xl">Score: {score}</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={`p-2 rounded ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </header>

        <div className="flex flex-col items-center gap-8">
          <div className="relative w-[200px] h-[120px] border-b-4 border-current">
            {hangmanDrawing}
          </div>

          <div className="text-3xl font-mono space-x-2">
            {[...word].map((letter, index) => (
              <span key={index} className="inline-block w-8 text-center border-b-2 border-current">
                {guessedLetters.has(letter) ? letter : ""}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 sm:grid-cols-9">
            {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
              <button
                key={letter}
                onClick={() => guessLetter(letter)}
                disabled={guessedLetters.has(letter) || gameOver}
                className={`p-3 text-lg font-bold rounded ${guessedLetters.has(letter) ? "bg-gray-400" : darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} ${word.includes(letter) && guessedLetters.has(letter) ? "text-green-500" : ""} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className={`p-8 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} max-w-md text-center`}>
              <h2 className="text-2xl font-bold mb-4">
                {won ? "Congratulations! You won!" : "Game Over!"}
              </h2>
              <p className="mb-4">
                {won ? "You guessed the word correctly!" : `The word was: ${word}`}
              </p>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <FaRedo /> Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hangman;