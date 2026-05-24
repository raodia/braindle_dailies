import React, { useState, useEffect } from 'react';

import VictoryScreen from './VictoryWindow/VictoryWindow'
import ChessBoard from './ChessBoard/ChessBoard';
import HelpChess from './HelpChess/HelpChess';

import styles from './ChessGame.module.css';

const ChessGame = (props) => {
debugger;
  let CHESS_PUZZLES = props.puzzlesDispatch({type: 'GET-TODAY-PUZZLES'}).chess;
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing' и 'victory'
  const [playerMoves, setPlayerMoves] = useState({ from: '', to: '' });
  const [message, setMessage] = useState('');
  debugger;

  const currentPuzzle = CHESS_PUZZLES[currentPuzzleIndex];

  const checkMove = (from, to) => {
    setPlayerMoves({ from, to });

    const isCorrect =
      from === currentPuzzle.solution[0] &&
      to === currentPuzzle.solution[1];

    if (isCorrect) {
      setGameState('victory');
      //setMessage('');
    } else {
      setMessage('Неправильный ход. Попробуйте ещё раз.');
      //setTimeout(() => setMessage(''), 2000);
    }
  };

  const nextPuzzle = () => {
    setGameState('playing');
    setPlayerMoves({ from: '', to: '' });
    setMessage('');
    setCurrentPuzzleIndex((prev) => (prev + 1) % CHESS_PUZZLES.length);
  };

  const resetGame = () => {
    setGameState('playing');
    setPlayerMoves({ from: '', to: '' });
    setMessage('');
    setCurrentPuzzleIndex(0);
  };

  return (
    <div className={styles.chess_game}>
      <header className={styles.game_header}>
        <h1>Шахматные задачи</h1>
        <p>Решите шахматную задачу, сделав правильный ход</p>
      </header>

      <div className={styles.game_info}>
        <p><strong>Задача #{currentPuzzle.id}:</strong> {currentPuzzle.description}</p>
        <p>Сделайте ход: выберите фигуру, затем клетку назначения</p>
      </div>

      {message && <div className={styles.message}>{message}</div>}

      <div className={styles.game_area}>
        {gameState === 'victory' ? (
          <VictoryScreen
            onNextPuzzle={nextPuzzle}
            moves={playerMoves}
          />
        ) : (
          <ChessBoard
            position={currentPuzzle.fen}
            onMove={checkMove}
            isWhite={currentPuzzle.fen.includes(' w ')}
          />
        )}
      </div>

      <div className={styles.game_controls}>
        <button onClick={resetGame} className={styles.reset_button}>
          Начать заново
        </button>
        <div className="stats">
          Задача {currentPuzzleIndex + 1} из {CHESS_PUZZLES.length}
        </div>
      </div>

        <HelpChess />
      
    </div>


  );
};


export default ChessGame;