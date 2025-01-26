// src/QuizGame.js
import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Shark", "Giraffe"],
        answer: "Blue Whale",
    },
];

const QuizGame = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [theme, setTheme] = useState('light');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === quizData[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        setSelectedOption('');

        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedOption('');
        setShowResult(false);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div
            className={`flex flex-col items-center justify-center min-h-screen transition-all ${
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

            {showResult ? (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Your Score: {score} / {quizData.length}</h1>
                    <button
                        onClick={restartQuiz}
                        className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Restart Quiz
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">{quizData[currentQuestionIndex].question}</h1>
                    <div className="space-y-4">
                        {quizData[currentQuestionIndex].options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className={`w-full px-4 py-2 text-left border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    selectedOption === option
                                        ? 'bg-blue-500 text-white'
                                        : theme === 'light'
                                        ? 'bg-gray-100 hover:bg-gray-200 focus:ring-blue-300'
                                        : 'bg-gray-700 hover:bg-gray-600 focus:ring-gray-500'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNextQuestion}
                        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        disabled={!selectedOption}
                    >
                        Next Question
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizGame;
