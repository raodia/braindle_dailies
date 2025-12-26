import React, { useState, useEffect } from 'react';
import styles from './Sudoku.module.css';

// Предопределенные начальные состояния (пазлы 6x6)
const INITIAL_PUZZLES = [
  [
    [1, 2, 0, 4, 5, 6],
      [4, 5, 6, 1, 2, 3],
      [2, 0, 1, 5, 0, 4],
      [0, 6, 0, 0, 3, 0],
      [3, 4, 5, 6, 1, 2],
      [6, 1, 2, 3, 4, 5]
  ]
  ,
  [
   [4, 1, 3, 5, 0, 0],
      [5, 6, 0, 1, 0, 3],
      [0, 4, 6, 3, 5, 2],
      [0, 3, 0, 4, 6, 1],
      [0, 5, 1, 0, 0, 0],
      [0, 2, 4, 0, 1, 0]
  ],
  [
	[0, 0, 1, 3, 0, 0],
	[0, 3, 4, 0, 6, 2],
	[1, 4, 6, 2, 5, 0],
	[0, 2, 5, 6, 1, 4],
	[0, 0, 3, 0, 2, 1],
	[0, 1, 0, 0, 3, 6],
],
  [
	[0, 0, 0, 1, 5, 0],
	[6, 1, 5, 3, 0, 0],
	[0, 0, 0, 5, 0, 0],
	[1, 0, 0, 2, 6, 3],
	[3, 2, 6, 4, 0, 5],
	[5, 0, 0, 6, 0, 2]
],
[
	[4, 3, 2, 1, 5, 6],
	[6, 1, 5, 3, 2, 4],
	[2, 6, 3, 5, 4, 1],
	[1, 5, 4, 2, 6, 3],
	[3, 2, 6, 4, 1, 5],
	[5, 4, 1, 6, 3, 2]
]
];

// Правильное решение для проверки
const PUZZLE_SOLUTIONS = [
  [
     [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 1, 2, 3],
      [2, 3, 1, 5, 6, 4],
      [5, 6, 4, 2, 3, 1],
      [3, 4, 5, 6, 1, 2],
      [6, 1, 2, 3, 4, 5]
  ],
  [
   [4, 1, 3, 5, 2, 6],
      [5, 6, 2, 1, 4, 3],
      [1, 4, 6, 3, 5, 2],
      [2, 3, 5, 4, 6, 1],
      [6, 5, 1, 2, 3, 4],
      [3, 2, 4, 6, 1, 5]
  ],
  [
	[2, 6, 1, 3, 4, 5],
	[5, 3, 4, 1, 6, 2],
	[1, 4, 6, 2, 5, 3],
	[3, 2, 5, 6, 1, 4],
	[6, 5, 3, 4, 2, 1],
	[4, 1, 2, 5, 3, 6]
],

 
];

const SudokuGame = () => {
  const [grid, setGrid] = useState([]);
  const [initialGrid, setInitialGrid] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  // Инициализация игры
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Выбираем случайный пазл или следующий по кругу
    const newPuzzleIndex = (puzzleIndex + 1) % INITIAL_PUZZLES.length;
    setPuzzleIndex(newPuzzleIndex);
    
    const puzzle = INITIAL_PUZZLES[newPuzzleIndex].map(row => [...row]);
    const initial = INITIAL_PUZZLES[newPuzzleIndex].map(row => [...row]);
    
    setGrid(puzzle);
    setInitialGrid(initial);
    setSelectedCell(null);
    setMistakes(0);
    setIsComplete(false);
  };

  const handleCellClick = (row, col) => {
    if (initialGrid[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (number) => {
    if (!selectedCell || isComplete) return;

    const { row, col } = selectedCell;
    
    // Проверяем, можно ли изменить эту ячейку
    if (initialGrid[row][col] !== 0) return;

    // Проверяем правильность числа
    const correctNumber = PUZZLE_SOLUTIONS[puzzleIndex][row][col];
    const isCorrect = number === correctNumber;

    if (!isCorrect) {
      setMistakes(prev => prev + 1);
      if (mistakes + 1 >= 3) {
        alert('Слишком много ошибок! В будущем поле будет отображать недостающие цифры на сетке, но пока так');
        return;
      }
    }

    // Обновляем сетку
    const newGrid = [...grid];
    newGrid[row][col] = number;
    setGrid(newGrid);

    // Проверяем, заполнена ли вся сетка
    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid) => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (currentGrid[i][j] === 0) return;
      }
    }
    setIsComplete(true);
  };

  const clearCell = () => {
    if (!selectedCell || isComplete) return;

    const { row, col } = selectedCell;
    if (initialGrid[row][col] === 0) {
      const newGrid = [...grid];
      newGrid[row][col] = 0;
      setGrid(newGrid);
      setIsComplete(false);
    }
  };

  const getCellClass = (row, col) => {
    const classes = [styles.cell];
    
    // Добавляем границы для блоков 2x3
    if (row % 2 === 0) classes.push(styles.topBlockBorder);
    if (col % 3 === 0) classes.push(styles.leftBlockBorder);
    
    // Выделяем выбранную ячейку
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      classes.push(styles.selected);
    }
    
    // Разные стили для начальных чисел
    if (initialGrid[row] && initialGrid[row][col] !== 0) {
      classes.push(styles.initial);
    }
    
    // Подсветка строки и столбца выбранной ячейки
    if (selectedCell && (selectedCell.row === row || selectedCell.col === col)) {
      classes.push(styles.highlighted);
    }
    
    return classes.join(' ');
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} className={styles.row}>
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={getCellClass(rowIndex, colIndex)}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {cell !== 0 ? cell : ''}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Судоку 6x6</h1>
        <div className={styles.stats}>
          <div className={styles.statItem}>Ошибки: {mistakes}/3</div>
          <div className={styles.statItem}>
            Статус: {isComplete ? 'Завершено!' : 'В процессе'}
          </div>
        </div>
      </div>

      <div className={styles.gameArea}>
        <div className={styles.gridContainer}>
          <div className={styles.grid}>{renderGrid()}</div>
        </div>

        <div className={styles.controls}>
          <div className={styles.numberPad}>
            {[1, 2, 3, 4, 5, 6].map(num => (
              <button
                key={num}
                className={styles.numberButton}
                onClick={() => handleNumberInput(num)}
                disabled={!selectedCell || isComplete}
              >
                {num}
              </button>
            ))}
          </div>

          <div className={styles.actionButtons}>
            <button
              className={styles.actionButton}
              onClick={clearCell}
              disabled={!selectedCell || isComplete}
            >
              Очистить
            </button>
            <button
              className={`${styles.actionButton} ${styles.newGameButton}`}
              onClick={startNewGame}
            >
              Новая игра
            </button>
          </div>

          <div className={styles.instructions}>
            <h3>Как играть:</h3>
            <ul>
              <li>Кликните на пустую ячейку</li>
              <li>Выберите число от 1 до 6</li>
              <li>Каждое число должно быть уникальным в строке, столбце и блоке 2x3</li>
              <li>Максимум 3 ошибки</li>
            </ul>
          </div>
        </div>
      </div>

      {isComplete && (
        <div className={styles.completionMessage}>
        Поздравляем! Вы решили эту задачу!
        </div>
      )}
    </div>
  );
};

export default SudokuGame;