import React, { useState, useEffect } from 'react';

import VictoryScreen from './VictoryWindow/VictoryWindow'
import ChessBoard from './ChessBoard/ChessBoard';
import HelpChess from './HelpChess/HelpChess';

import styles from './ChessGame.module.css';


//  задачи
const CHESS_PUZZLES = [
  {
    id: 1,
    fen: '5B1k/5Q2/4p1p1/5p1p/4P2P/5P2/6K1/8 w - - 0 1',
    solution: ['f7', 'g7'],
    description: 'Мат в 1 ход за белых'
  },
  {
    id: 2,
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2',
    solution: ['d8', 'h4'],
    description: 'Мат в 1 ход за черных'
  },
  {
    id: 3,
    fen: 'r1bqk2r/pppp1ppp/1bn5/4P3/2BP4/5N2/PP3PPP/RNBQK2R w KQkq - 0 1',
    solution: ['c4', 'f7'],
    description: 'Хорошая жертва'
  }
];




const ChessGame = () => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing' и 'victory'
  const [playerMoves, setPlayerMoves] = useState({ from: '', to: '' });
  const [message, setMessage] = useState('');

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