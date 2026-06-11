import React, { useState, useEffect } from 'react';
import Styles from './ChessBoard.module.css';


const ChessBoard = ({ position, onMove, isWhite }) => {
  // инициализация доски
  const files = isWhite ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] : ['h', 'h', 'f', 'e', 'd', 'c', 'b', 'a'];
  const boardLines = isWhite ? ['8', '7', '6', '5', '4', '3', '2', '1'] : ['1', '2', '3', '4', '5', '6', '7', '8'];

  // возвращаем символ фигуры в обмен на её название (k - возврат ♚ и тд)
  const getPieceSymbol = (piece) => {
    const symbols = {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    };
    return symbols[piece] || '';
  };

  // парсер фена

  const parseFEN = (fen) => {
    const board = Array(8).fill().map(() => Array(8).fill(''));
    const [position] = fen.split(' ');
    let boardLine = 0;
    let file = 0;
    
    for (const char of position) {
      if (char === '/') {
        boardLine++;
        file = 0;
      } else if (isNaN(char)) {
        board[boardLine][file] = char;
        file++;
      } else {
        file += parseInt(char);
      }
    }
    
    return isWhite ? board : [...board].reverse().map(row => [...row].reverse());
  };

  const board = parseFEN(position);
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handleSquareClick = (boardLineIndex, fileIndex) => {
    const square = `${files[fileIndex]}${boardLines[boardLineIndex]}`;
    
    if (selectedSquare) {
      onMove(selectedSquare, square);
      setSelectedSquare(null);
    } else {
      setSelectedSquare(square);
    }
  };

  return (
    <div className={Styles.chess_board}>
      {board.map((boardLine, boardLineIndex) => (
        <div key={boardLineIndex} className={Styles.boardLine}>
          {boardLine.map((piece, fileIndex) => {
            const isLight = (boardLineIndex + fileIndex) % 2 === 0;
            const isSelected = selectedSquare === `${files[fileIndex]}${boardLines[boardLineIndex]}`;
            
            return (
              <div
                key={`${boardLineIndex}-${fileIndex}`}
                className={`${Styles.square} ${isLight ?  Styles.light: Styles.dark} ${isSelected ? Styles.selected : ''}`}
                onClick={() => handleSquareClick(boardLineIndex, fileIndex)}
              >
                {piece && <span className={Styles.piece}>{getPieceSymbol(piece)}</span>}
              <div className={Styles.coordinate}>
                  {fileIndex === 0 && boardLines[boardLineIndex]}
                  {boardLineIndex === 7 && files[fileIndex]}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;