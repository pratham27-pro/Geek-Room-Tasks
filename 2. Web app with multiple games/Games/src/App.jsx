import { useState } from 'react'
import './App.css';
import GameDashboard from './Components/Home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Hangman from './Components/Hangman.jsx';
import TicTacToe from './Components/TicTacToe.jsx';
import MemoryGame from './Components/MemoryCards.jsx';
import RockPaperScissors from './Components/RockPaperScissors.jsx';
import QuizGame from './Components/Quiz.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <GameDashboard/>
    },
    {
      path: "/hangman",
      element: <Hangman/>
    },
    {
      path: "/tictactoe",
      element: <TicTacToe/>
    },
    {
      path: "/memory",
      element: <MemoryGame/>
    },
    {
      path: "/jankenrock",
      element: <RockPaperScissors/>
    },
    {
      path: "/quiz",
      element: <QuizGame/>
    }
  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
