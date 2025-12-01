import './App.css';
import React from 'react';

import Header from './components/Header/Header';
import TypingGame from './components/TypingGame/TypingGame';
import Navbar from './components/Navbar/Navbar';
import MainScreen from './components/MainScreen/MainScreen';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <MainScreen /> 
      {/* <TypingGame /> */}
    </div>
  );
}

export default App;
