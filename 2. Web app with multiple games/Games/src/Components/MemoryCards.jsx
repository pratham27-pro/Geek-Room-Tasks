import React, { useState, useEffect, useCallback } from "react";
import { FaRedo, FaMoon, FaSun, FaTrophy } from "react-icons/fa";
import confetti from "canvas-confetti";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || {}
  );
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const cardImages = [
    { id: 1, image: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9" },
    { id: 2, image: "https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b" },
    { id: 3, image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f" },
    { id: 4, image: "https://images.unsplash.com/photo-1596854273338-cbf078ec7071" },
    { id: 5, image: "https://images.unsplash.com/photo-1560343090-f0409e92791a" },
    { id: 6, image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131" },
    { id: 7, image: "https://images.unsplash.com/photo-1574158622682-e40e69881006" },
    { id: 8, image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987" },
    { id: 9, image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c" },
    { id: 10, image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4" },
    { id: 11, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba" },
    { id: 12, image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987" }
  ];

  const gridSizes = {
    easy: 8,
    medium: 12,
    hard: 18
  };

  const initializeGame = useCallback(() => {
    const gridSize = gridSizes[difficulty];
    const selectedCards = cardImages.slice(0, gridSize / 2);
    const duplicatedCards = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));

    setCards(duplicatedCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
  }, [difficulty]);

  useEffect(() => {
    initializeGame();
  }, [difficulty, initializeGame]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (matchedPairs.length === cards.length / 2 && cards.length > 0) {
      setIsPlaying(false);
      const currentScore = { moves, time };
      if (!bestScore[difficulty] || currentScore.moves < bestScore[difficulty].moves) {
        const newBestScore = { ...bestScore, [difficulty]: currentScore };
        setBestScore(newBestScore);
        localStorage.setItem("bestScore", JSON.stringify(newBestScore));
      }
      confetti();
    }
  }, [matchedPairs, cards, moves, time, difficulty, bestScore]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleCardClick = (clickedCard) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(clickedCard.uniqueId) ||
      matchedPairs.includes(clickedCard.id)
    )
      return;

    const newFlippedCards = [...flippedCards, clickedCard.uniqueId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstCard, secondCard] = newFlippedCards.map(
        (id) => cards.find((card) => card.uniqueId === id)
      );

      if (firstCard.id === secondCard.id) {
        setMatchedPairs((prev) => [...prev, firstCard.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gray-100"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-4xl font-bold ${darkMode ? "dark:text-white" : "dark:text-black"}`}>Memory Game</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-2xl" />
              ) : (
                <FaMoon className="text-gray-600 text-2xl" />
              )}
            </button>
            <button
              onClick={initializeGame}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FaRedo className="text-gray-600 dark:text-gray-300 text-2xl" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Moves</h2>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{moves}</p>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Time</h2>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
            </p>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Best Score</h2>
            {bestScore[difficulty] && (
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {bestScore[difficulty].moves} moves
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          {Object.keys(gridSizes).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                difficulty === level
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <div
          className={`grid gap-4 ${
            difficulty === "easy"
              ? "grid-cols-2 sm:grid-cols-4"
              : difficulty === "medium"
              ? "grid-cols-3 sm:grid-cols-4"
              : "grid-cols-3 sm:grid-cols-6"
          }`}
        >
          {cards.map((card) => (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(card)}
              className={`aspect-square rounded-xl cursor-pointer transition-transform duration-500 transform ${
                flippedCards.includes(card.uniqueId) || matchedPairs.includes(card.id)
                  ? "rotate-y-180"
                  : ""
              }`}
            >
              <div className="relative w-full h-full">
                <div
                  className={`absolute w-full h-full backface-hidden ${
                    flippedCards.includes(card.uniqueId) || matchedPairs.includes(card.id)
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                >
                  <div className="w-full h-full bg-blue-500 dark:bg-blue-700 rounded-xl flex items-center justify-center">
                    <FaTrophy className="text-4xl text-white" />
                  </div>
                </div>
                <div
                  className={`absolute w-full h-full backface-hidden ${
                    flippedCards.includes(card.uniqueId) || matchedPairs.includes(card.id)
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <img
                    src={card.image}
                    alt="Card"
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {matchedPairs.length === cards.length / 2 && cards.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Congratulations!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You completed the game in {moves} moves and {Math.floor(time / 60)}:
                {(time % 60).toString().padStart(2, "0")} minutes!
              </p>
              <button
                onClick={initializeGame}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;