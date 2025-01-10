import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import Countdown from 'react-countdown';
import { AppProvider, AppContext } from './context/AppContext';
import { useQuotes } from './hooks/useQuotes';
import { FaHeart, FaSurprise, FaGift } from 'react-icons/fa';
import Image from "./assets/komal.jpeg"

const FloatingHearts = () => {
  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-0 left-1/4 text-pink-500 text-4xl"
      >
        <FaHeart />
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className="absolute top-1/3 left-3/4 text-purple-500 text-4xl"
      >
        <FaHeart />
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute top-2/3 left-1/2 text-red-500 text-4xl"
      >
        <FaHeart />
      </motion.div>
    </>
  );
};

const MainContent = () => {
  const { showSurprise, setShowSurprise } = useContext(AppContext);
  const { quotes, loading } = useQuotes();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [colorSurprise, setColorSurprise] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('from-pink-100 to-purple-100');

  // Number Guessing Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const startGame = () => {
    const number = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(number);
    setGameStarted(true);
    setMessage('Guess a number between 1 and 100!');
  };

  const handleGuess = () => {
    const userGuess = parseInt(guess, 10);
    if (userGuess === randomNumber) {
      setMessage(`Congratulations! You guessed the number ${randomNumber} correctly!`);
      setGameStarted(false);
    } else if (userGuess < randomNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
    setGuess('');
  };

  const handleSurpriseClick = () => {
    if (showSurprise) {
      setShowSurprise(false); // Hide the surprise
    } else {
      setShowCountdown(true); // Start the countdown
      setTimeout(() => {
        setShowSurprise(true); // Show the surprise
        setShowConfetti(true); // Show confetti
        setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
      }, 5000); // Countdown lasts for 5 seconds
    }
  };

  const handleColorSurprise = () => {
    setColorSurprise(true);
    const colors = [
      'from-blue-100 to-green-100',
      'from-yellow-100 to-red-100',
      'from-purple-100 to-indigo-100',
      'from-pink-100 to-purple-100',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
    setTimeout(() => setColorSurprise(false), 2000); // Reset after 2 seconds
  };

  const renderCountdown = ({ seconds }) => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold text-purple-800"
    >
      {seconds}
    </motion.div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-r ${backgroundColor} flex flex-col items-center justify-center overflow-hidden relative transition-colors duration-1000`}>
      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Floating hearts */}
      <FloatingHearts />

      {/* Main content */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center w-11/12 md:max-w-md relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">Dear Komal Srivastava,</h1>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          Wishing you a speedy recovery and Get well soon! 💐
        </p>

        {/* Motivational quotes */}
        <div className="bg-purple-50 p-3 md:p-4 rounded-lg mb-6">
          {loading ? (
            <p className="text-purple-600 italic">Loading quotes...</p>
          ) : (
            quotes.map((quote, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.5 }}
                className="text-sm md:text-base text-purple-600 italic"
              >
                "{quote.content}" - {quote.author}
              </motion.p>
            ))
          )}
        </div>

        {/* Surprise button */}
        <button
          onClick={handleSurpriseClick}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-600 transition-all mb-4 w-full md:w-auto"
        >
          <FaSurprise />
          <span>{showSurprise ? "Hide Surprise" : "Click for a Surprise!"}</span>
        </button>

        {/* Countdown */}
        {showCountdown && !showSurprise && (
          <div className="mt-4">
            <Countdown date={Date.now() + 5000} renderer={renderCountdown} />
          </div>
        )}

        {/* Surprise image */}
        <AnimatePresence>
          {showSurprise && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="mt-4"
            >
              <img
                src={Image} // Path to your surprise image
                alt="Surprise for Komal"
                className="rounded-lg shadow-md w-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Color surprise button */}
        <button
          onClick={handleColorSurprise}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-pink-600 transition-all mt-6 w-full md:w-auto"
        >
          <FaGift />
          <span>Click for a Color Surprise!</span>
        </button>

        {/* Number Guessing Game */}
        <div className="mt-6">
          {!gameStarted ? (
            <button
              onClick={startGame}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all w-full md:w-auto"
            >
              <span>Play a Number Guessing Game</span>
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-purple-600">{message}</p>
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="border border-purple-300 p-2 rounded-lg w-full"
                placeholder="Enter your guess"
              />
              <button
                onClick={handleGuess}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all w-full md:w-auto"
              >
                <span>Submit Guess</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;