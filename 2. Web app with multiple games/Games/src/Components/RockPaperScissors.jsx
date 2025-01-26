// src/RockPaperScissors.js
import React, { useState } from 'react';
import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors, FaSun, FaMoon } from 'react-icons/fa';

const choices = [
    { name: 'Rock', icon: <FaRegHandRock className="text-4xl" /> },
    { name: 'Paper', icon: <FaRegHandPaper className="text-4xl" /> },
    { name: 'Scissors', icon: <FaRegHandScissors className="text-4xl" /> },
];

const RockPaperScissors = () => {
    const [userChoice, setUserChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');
    const [theme, setTheme] = useState('light');

    const handleUserChoice = (choice) => {
        setUserChoice(choice);
        const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)].name;
        setComputerChoice(computerRandomChoice);
        determineWinner(choice, computerRandomChoice);
    };

    const determineWinner = (user, computer) => {
        if (user === computer) {
            setResult('It\'s a draw!');
        } else if (
            (user === 'Rock' && computer === 'Scissors') ||
            (user === 'Paper' && computer === 'Rock') ||
            (user === 'Scissors' && computer === 'Paper')
        ) {
            setResult('You win!');
        } else {
            setResult('You lose!');
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div
            className={`flex flex-col items-center justify-center h-screen transition-all ${
                theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-100'
            }`}
        >
            <button
                onClick={toggleTheme}
                className={`flex items-center mb-6 px-6 py-3 rounded-full text-lg font-semibold transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    theme === 'light'
                        ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500'
                }`}
            >
                {theme === 'light' ? <FaMoon className="mr-2" /> : <FaSun className="mr-2" />}
                Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>

            <h1 className="text-5xl font-extrabold mb-6 text-center tracking-wide">
                <span className={`${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-500'}`}>Rock</span>{' '}
                <span className={`${
                    theme === 'light' ? 'text-red-600' : 'text-red-500'}`}>Paper</span>{' '}
                <span className={`${
                    theme === 'light' ? 'text-green-600' : 'text-green-500'}`}>Scissors</span>
            </h1>

            <div className="flex space-x-6 mb-6">
                {choices.map((choice) => (
                    <button
                        key={choice.name}
                        onClick={() => handleUserChoice(choice.name)}
                        className={`flex flex-col items-center px-6 py-4 rounded-lg shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            theme === 'light'
                                ? 'bg-white text-gray-800 hover:bg-gray-100 focus:ring-gray-300'
                                : 'bg-gray-800 text-gray-100 hover:bg-gray-700 focus:ring-gray-500'
                        }`}
                    >
                        {choice.icon}
                        <span className="mt-2 text-lg font-semibold">{choice.name}</span>
                    </button>
                ))}
            </div>

            {userChoice && (
                <h2 className="text-2xl font-medium mb-2">Your choice: {userChoice}</h2>
            )}
            {computerChoice && (
                <h2 className="text-2xl font-medium mb-2">Computer's choice: {computerChoice}</h2>
            )}
            {result && (
                <h2 className="text-3xl font-bold mt-4 p-4 ${
                    theme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-gray-700 text-gray-100'} rounded-lg">
                    {result}
                </h2>
            )}
        </div>
    );
};

export default RockPaperScissors;
