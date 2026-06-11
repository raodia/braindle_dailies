import React, { useState, useEffect } from 'react';
import styles from './wordle.module.css';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const LETTER_STATUS = {
  CORRECT: 'correct',
  PRESENT: 'present',
  ABSENT: 'absent',
  EMPTY: 'empty'
};

// компонент для отдельной буквы
const LetterTile = ({ letter, status }) => {
  const getStatusClass = () => {
    switch (status) {
      case LETTER_STATUS.CORRECT:
        return styles.correct;
      case LETTER_STATUS.PRESENT:
        return styles.present;
      case LETTER_STATUS.ABSENT:
        return styles.absent;
      default:
        return styles.empty;
    }
  };

  return (
    <div className={`${styles.letterTile} ${getStatusClass()}`}>
      {letter}
    </div>
  );
};

// Компонент для клавиатуры
const Keyboard = ({ onKeyPress, usedLetters }) => {
  const rows = [
    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
    ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
    ['ВВОД', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'УДАЛИТЬ']
  ];

  const getKeyStatus = (key) => {
    return usedLetters[key] || LETTER_STATUS.EMPTY;
  };

  const getKeyClass = (key) => {
    const status = getKeyStatus(key);
    const isSpecialKey = key.length > 1;

    if (isSpecialKey) {
      return styles.specialKey;
    }

    switch (status) {
      case LETTER_STATUS.CORRECT:
        return styles.keyCorrect;
      case LETTER_STATUS.PRESENT:
        return styles.keyPresent;
      case LETTER_STATUS.ABSENT:
        return styles.keyAbsent;
      default:
        return styles.keyDefault;
    }
  };

  const renderKeyContent = (key) => {
    if (key === 'УДАЛИТЬ') {
      return '⌫';
    }
    return key;
  };

  return (
    <div className={styles.keyboard}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.keyboardRow}>
          {row.map(key => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${styles.keyButton} ${getKeyClass(key)}`}
              disabled={key === 'ВВОД' && usedLetters['ВВОД'] === LETTER_STATUS.CORRECT}
            >
              {renderKeyContent(key)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};


const WordleGame = (props) => {
  const WORDS = props.state;
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill().map(() => Array(WORD_LENGTH).fill('')));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  // playing, won, lost как состояния
  const [gameStatus, setGameStatus] = useState('playing');
  const [usedLetters, setUsedLetters] = useState({});
  const [difficulty, setDifficulty] = useState('medium');
  const [message, setMessage] = useState('');
  debugger;


  // инициадизация игры
  const initializeGame = () => {
  debugger;

    const wordList = WORDS;
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)].word;
    setWord(randomWord);
    setGuesses(Array(MAX_ATTEMPTS).fill().map(() => Array(WORD_LENGTH).fill('')));
    setCurrentGuess('');
    setCurrentRow(0);
    setGameStatus('playing');
    setUsedLetters({});
    setMessage(`Угадайте слово из ${WORD_LENGTH} букв!`);
  };

  // стартовая инициализация
  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  // Обработка нажатия клавиш
  const handleKeyPress = (key) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ВВОД') {
      submitGuess();
    } else if (key === 'УДАЛИТЬ') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && /^[А-Я]$/.test(key)) {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(prev => prev + key);
      }
    }
  };

  // Обработка физической клавиатуры
  useEffect(() => {
    const handlePhysicalKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleKeyPress('ВВОД');
      } else if (e.key === 'Backspace') {
        handleKeyPress('УДАЛИТЬ');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyPress);
    return () => window.removeEventListener('keydown', handlePhysicalKeyPress);
  }, [currentGuess, gameStatus]);

  // Проверка догадки
  const submitGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      setMessage(`Слово должно содержать ${WORD_LENGTH} букв!`);
      return;
    }

    const newGuesses = [...guesses];
    newGuesses[currentRow] = currentGuess.split('');
    setGuesses(newGuesses);

    // Проверка выигрыша
    if (currentGuess === word) {
      setGameStatus('won');
      setMessage('Поздравляем! Вы угадали слово!');
      updateUsedLetters(currentGuess, word);
      return;
    }

    // Обновление использованных букв
    updateUsedLetters(currentGuess, word);

    // Переход к следующей попытке
    if (currentRow + 1 >= MAX_ATTEMPTS) {
      setGameStatus('lost');
      setMessage(`Игра окончена! Загаданное слово: ${word}`);
    } else {
      setCurrentRow(prev => prev + 1);
      setCurrentGuess('');
      setMessage('');
    }
  };

  // Обновление статуса использованных букв
  const updateUsedLetters = (guess, word) => {
    const newUsedLetters = { ...usedLetters };
    const wordArr = word.split('');
    const guessArr = guess.split('');

    let answerLetters = {};

    for (let char of word) {
      answerLetters[char] = (answerLetters[char] || 0) + 1;
    }
    debugger;

    // Первый проход: точные совпадения (зелёные)
    guessArr.forEach((letter, i) => {
      if (wordArr[i] === letter) {

        newUsedLetters[letter] = LETTER_STATUS.CORRECT;
        answerLetters[guess[i]]--;
        debugger;
      }
    });

    // Второй проход: буквы не на своих местах (жёлтые) или отсутствующие
    guessArr.forEach((letter, i) => {
      // Пропускаем точные совпадения
      if (wordArr[i] === letter) return;

      const char = guess[i];
      if (answerLetters[char] > 0) {
        newUsedLetters[letter] = LETTER_STATUS.PRESENT;
        answerLetters[letter]--;
      } else {
        if (wordArr[i] !== letter)
          newUsedLetters[letter] = LETTER_STATUS.ABSENT;
      }

    });
    debugger;
    setUsedLetters(newUsedLetters);
  };



const getLetterStatus = (rowIndex, colIndex, letter) => {
  if (rowIndex < currentRow || (rowIndex === currentRow && gameStatus !== 'playing')) {
    // Сначала нужно получить ВСЮ строку догадки, а не только текущую букву
    // Предполагаю, что у вас есть массив guesses или что-то подобное
    const fullGuess = guesses[rowIndex]; // Полная догадка для этой строки
    const wordArr = word.split('');
    
    // ЗЕЛЁНЫЙ: точное совпадение по позиции
    if (letter === word[colIndex]) {
      return LETTER_STATUS.CORRECT;
    }
    
    // ЖЁЛТЫЙ: буква есть в слове, но не на этой позиции
    // НО нужно учитывать повторяющиеся буквы!
    if (word.includes(letter)) {
      // Считаем, сколько раз буква встречается в ответе
      let answerCount = 0;
      for (let char of word) {
        if (char === letter) answerCount++;
      }
      
      // Считаем, сколько раз эта буква уже использована в ЗЕЛЁНЫХ позициях
      let greenUsed = 0;
      for (let i = 0; i < 5; i++) {
        if (fullGuess[i] === letter && word[i] === letter) {
          greenUsed++;
        }
      }
      
      // Считаем, сколько раз эта буква уже использована в ЖЁЛТЫХ позициях
      let yellowUsed = 0;
      for (let i = 0; i < colIndex; i++) {
        if (fullGuess[i] === letter && 
            fullGuess[i] !== word[i] && 
            word.includes(letter)) {
          // Проверяем, не заблокирована ли эта позиция зелёными
          let isBlocked = false;
          for (let j = 0; j < 5; j++) {
            if (fullGuess[i] === word[j] && i === j) {
              isBlocked = true;
              break;
            }
          }
          if (!isBlocked) yellowUsed++;
        }
      }
      
      // Если остались неиспользованные копии буквы
      if (answerCount > greenUsed + yellowUsed) {
        return LETTER_STATUS.PRESENT;
      }
    }
    
    return LETTER_STATUS.ABSENT;
  } else {
    return LETTER_STATUS.EMPTY;
  }
}

// Рендер сетки игры
const renderGrid = () => {
  return (
    <div className={styles.grid}>
      {guesses.map((guess, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {Array(WORD_LENGTH).fill().map((_, colIndex) => {
            const letter = rowIndex === currentRow && colIndex < currentGuess.length
              ? currentGuess[colIndex]
              : guess[colIndex] || '';
            const status = getLetterStatus(rowIndex, colIndex, letter);

            return (
              <LetterTile
                key={`${rowIndex}-${colIndex}`}
                letter={letter}
                status={status}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const getMessageClass = () => {
  switch (gameStatus) {
    case 'won':
      return styles.messageSuccess;
    case 'lost':
      return styles.messageError;
    default:
      return styles.messageInfo;
  }
};

return (
  <div className={styles.container}>
    <div className={styles.gameWrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>WORDLE</h1>
      </header>

      <div className={styles.gameControls}>

        {message && (
          <div className={`${styles.message} ${getMessageClass()}`}>
            {message}
          </div>
        )}
      </div>

      <div className={styles.gameBoard}>
        {renderGrid()}
      </div>

      <Keyboard
        onKeyPress={handleKeyPress}
        usedLetters={usedLetters}
      />

      <div className={styles.instructions}>
        <h3 className={styles.instructionsTitle}>Как играть:</h3>
        <ul className={styles.instructionsList}>
          <li>
            <span className={styles.bullet}>•</span>
            Введите слово из 5 букв и нажмите Enter
          </li>
          <li>
            <span className={`${styles.colorExample} ${styles.correctExample}`}></span>
            - буква на правильном месте
          </li>
          <li>
            <span className={`${styles.colorExample} ${styles.presentExample}`}></span>
            - буква есть в слове, но в другом месте
          </li>
          <li>
            <span className={`${styles.colorExample} ${styles.absentExample}`}></span>
            - буквы нет в слове
          </li>
          <li>
            <span className={styles.bullet}>•</span>
            У вас есть {MAX_ATTEMPTS} попыток чтобы угадать слово
          </li>
        </ul>
      </div>

      {gameStatus !== 'playing' && (
        <div className={styles.restartSection}>
          <button
            onClick={initializeGame}
            className={styles.restartButton}
          >
            Вернуться
          </button>
        </div>
      )}
    </div>
  </div>
);
};

export default WordleGame;