import React, { useState } from "react";
import { FiHome, FiAward, FiSettings } from "react-icons/fi";
import { BsFillGridFill, BsMoonFill, BsSunFill } from "react-icons/bs";
import { GiCardRandom, GiPerspectiveDiceSixFacesRandom, GiRock, GiPaper, GiScissors } from "react-icons/gi";
import { FaBrain } from "react-icons/fa";

const GameDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const games = [
    {
      id: 1,
      title: "Tic Tac Toe",
      description: "Classic X's and O's game. Get three in a row to win!",
      image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948",
      icon: BsFillGridFill
    },
    {
      id: 2,
      title: "Hangman",
      description: "Guess the word one letter at a time. Save the stickman!",
      image: "https://images.unsplash.com/photo-1553481187-be93c21490a9",
      icon: GiPerspectiveDiceSixFacesRandom
    },
    {
      id: 3,
      title: "Memory Cards",
      description: "Match pairs of cards to test your memory skills.",
      image: "https://images.unsplash.com/photo-1558478551-1a378f63328e",
      icon: GiCardRandom
    },
    {
      id: 4,
      title: "Rock Paper Scissors",
      description: "Challenge the computer in this classic hand game.",
      image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11",
      icon: GiRock
    },
    {
      id: 5,
      title: "Quiz Game",
      description: "Test your knowledge across various categories.",
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b",
      icon: FaBrain
    }
  ];

  const handleGameStart = (gameTitle) => {
    alert("Starting " + gameTitle);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <header className="sticky top-0 z-50 bg-blue-600 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiHome className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">Game Hub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              {darkMode ? (
                <BsSunFill className="w-5 h-5 text-white" />
              ) : (
                <BsMoonFill className="w-5 h-5 text-white" />
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-blue-700 transition-colors">
              <FiAward className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-full hover:bg-blue-700 transition-colors">
              <FiSettings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Available Games</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className={`${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <game.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
                  {game.description}
                </p>
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => handleGameStart(game.title)}
                >
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} mt-8 py-6`}>
        <div className="container mx-auto px-4 text-center">
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            © 2024 Game Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GameDashboard;