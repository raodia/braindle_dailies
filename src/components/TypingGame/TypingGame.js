// import React, { useState, useEffect, useRef } from 'react';
// import styles from './TypingGame.module.css';

// import Stat from './Stats/Stat';
// import Result_item from './Results/Results';

// const TypingGame = (props) => {
//   let texts = props.state;

//   const [gameState, setGameState] = useState('idle'); // состояния игры: idle, playing, finished
//   const [currentText, setCurrentText] = useState('');
//   const [userInput, setUserInput] = useState('');
//   const [score, setScore] = useState(0);
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [errors, setErrors] = useState(0);
//   const [wpm, setWpm] = useState(0);
//   const [accuracy, setAccuracy] = useState(100);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const inputRef = useRef(null);
//   const timerRef = useRef(null);

//   // Примеры текстов для игры
 

//   const startGame = () => {
//     const randomText = texts[Math.floor(Math.random() * texts.length)];
//     setCurrentText(randomText);
//     setUserInput('');
//     setScore(0);
//     setTimeElapsed(0);
//     setErrors(0);
//     setWpm(0);
//     setAccuracy(100);
//     setCurrentIndex(0);
//     setGameState('playing');

//     // Фокусируемся на поле ввода
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 100);

//     // Запускаем таймер
//     timerRef.current = setInterval(() => {
//       setTimeElapsed(prev => prev + 0.1);
//     }, 100);
//   };

//   const handleInputChange = (e) => {
//     if (gameState !== 'playing') return;

//     const value = e.target.value;
//     setUserInput(value);

//     let errorCount = 0;

//     // подсчет ошибок
//     for (let i = 0; i < value.length; i++) {
//       if (value[i] !== currentText[i]) {
//         errorCount++;
//       }
//     }
//     setErrors(errorCount);

//     // расчет точности
//     const newAccuracy = value.length > 0 
//       ? Math.max(0, ((value.length - errorCount) / value.length) * 100)
//       : 100;
//     setAccuracy(Number(newAccuracy.toFixed(1)));

//     // расчет WPM (слов в минуту)
//     const words = value.trim().split(/\s+/).length;
//     const minutes = timeElapsed / 60;
//     const newWpm = minutes > 0 ? Math.round(words / minutes) : 0;
//     setWpm(newWpm);

//     // ПРоверка завершения
//     if (value.length === currentText.length) {
//       finishGame();
//     }
//   };

//   const finishGame = () => {
//     clearInterval(timerRef.current);
//     setGameState('finished');
    
//     // расчет финального счета
//     const baseScore = Math.round((currentText.length / timeElapsed) * 100);
//     const errorPenalty = errors * 10;
//     const finalScore = Math.max(0, baseScore - errorPenalty);
//     setScore(finalScore);
//   };

//   const getCharacterClass = (index) => {
//     if (index >= userInput.length) return '';
//     if (userInput[index] === currentText[index]) return 'correct';
//     return 'incorrect';
//   };

//   // Очистка таймера при размонтировании
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div className={styles.typing_game}>
//       <h1>Blinded Typer</h1>
      
//       {gameState === 'idle' && (
//         <div className={styles.start_screen}>
//           <p>Улучшите свою скорость печати!</p>
//           <button onClick={startGame} className={styles.start_button}>
//             Начать
//           </button>
//         </div>
//       )}

//       {gameState === 'playing' && (
//         <div className={styles.game_screen}>
//           <div className={styles.stats}>
//            <Stat text="Время: " data={timeElapsed.toFixed(1)}></Stat>
//            <Stat text="WPM: " data={wpm}></Stat>
//            <Stat text="Ошибки: " data={errors}></Stat>
//            <Stat text="Точность: " data={accuracy + '%'}></Stat>
            
//         </div>

//           <div className={styles.text_display}>
//             {currentText.split('').map((char, index) => (
//               <span
//                 key={index}
//                 className={`char ${getCharacterClass(index)} ${
//                   index === userInput.length ? 'current' : ''
//                 }`}
//               >
//                 {char}
//               </span>
//             ))}
//           </div>

//           <input
//             ref={inputRef}
//             type="text"
//             value={userInput}
//             onChange={handleInputChange}
//             className={styles.typing_input}
//             placeholder="Начните печатать..."
//             disabled={gameState !== 'playing'}
//           />

//           <button onClick={finishGame} className={styles.finish_button}>
//             Завершить досрочно
//           </button>
//         </div>
//       )}

//       {gameState === 'finished' && (
//         <div className={styles.results_screen}>
//           <h2>Результаты</h2>
//           <div className={styles.results}>
//             <Result_item name='Время: ' data={timeElapsed.toFixed(1)}></Result_item>
//             <Result_item name='WPM: ' data={wpm}></Result_item>
//             <Result_item name='Ошибки: ' data={errors}></Result_item>
//             <Result_item name='Точность: ' data={accuracy + '%'}></Result_item>
//           </div>
//           <button onClick={startGame} className={styles.restart_button}>
//             Играть снова
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TypingGame;

import React, { useState, useEffect, useRef } from 'react';
import styles from './TypingGame.module.css';

import Stat from './Stats/Stat';
import Result_item from './Results/Results';

const TypingGame = (props) => {
  let texts = props.state;
  const [gameState, setGameState] = useState('idle'); // idle, playing, finished
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);


  const startGame = () => {
    const randomText = texts[Math.floor(Math.random() * texts.length)].text;
    setCurrentText(randomText);
debugger;

    setUserInput('');
    setScore(0);
    setTimeElapsed(0);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setCurrentIndex(0);
    setGameState('playing');

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 0.1);
    }, 100);
  };

  const handleInputChange = (e) => {
    if (gameState !== 'playing') return;

    const value = e.target.value;
    setUserInput(value);

    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    const newAccuracy = value.length > 0 
      ? Math.max(0, ((value.length - errorCount) / value.length) * 100)
      : 100;
    setAccuracy(Number(newAccuracy.toFixed(1)));

    const words = value.trim().split(/\s+/).length;
    const minutes = timeElapsed / 60;
    const newWpm = minutes > 0 ? Math.round(words / minutes) : 0;
    setWpm(newWpm);

    if (value.length === currentText.length) {
      finishGame();
    }
  };

  const finishGame = () => {
    clearInterval(timerRef.current);
    setGameState('finished');
    
    const baseScore = Math.round((currentText.length / timeElapsed) * 100);
    const errorPenalty = errors * 10;
    const finalScore = Math.max(0, baseScore - errorPenalty);
    setScore(finalScore);
  };

  const getCharacterClass = (index) => {
    // Если буква еще не напечатана
    if (index >= userInput.length) return '';
    
    // Если напечатана и совпадает
    if (userInput[index] === currentText[index]) return 'correct';
    
    // Если напечатана и НЕ совпадает — подсвечиваем ошибку
    return 'incorrect';
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  return (
    <div className={styles.typing_game}>
      <h1>Blinded Typer</h1>
      
      {gameState === 'idle' && (
        <div className={styles.start_screen}>
          <p>Улучшите свою скорость печати!</p>
          <button onClick={startGame} className={styles.start_button}>
            Начать
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className={styles.game_screen}>
          <div className={styles.stats}>
            <Stat text="Время: " data={timeElapsed.toFixed(1)}></Stat>
            <Stat text="WPM: " data={wpm}></Stat>
            <Stat text="Ошибки: " data={errors}></Stat>
            <Stat text="Точность: " data={accuracy + '%'}></Stat>
          </div>

          <div className={styles.text_display}>
            {currentText.split('').map((char, index) => (
              <span
                key={index}
                className={`${styles.char} ${styles[getCharacterClass(index)]} ${
                  index === userInput.length ? styles.current : ''
                }`}
              >
                {char === ' ' ? '\u00A0' : char} 
                {/* он игнорирует пробелы */}
              </span>
            ))}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className={styles.typing_input}
            placeholder="Начните печатать..."
            disabled={gameState !== 'playing'}
          />

          <button onClick={finishGame} className={styles.finish_button}>
            Завершить досрочно
          </button>
        </div>
      )}

      {gameState === 'finished' && (
        <div className={styles.results_screen}>
          <h2>Результаты</h2>
          <div className={styles.results}>
            <Result_item name='Время: ' data={timeElapsed.toFixed(1)}></Result_item>
            <Result_item name='WPM: ' data={wpm}></Result_item>
            <Result_item name='Ошибки: ' data={errors}></Result_item>
            <Result_item name='Точность: ' data={accuracy + '%'}></Result_item>
          </div>
          <button onClick={startGame} className={styles.restart_button}>
            Играть снова
          </button>
        </div>
      )}
    </div>
  );
};

export default TypingGame;