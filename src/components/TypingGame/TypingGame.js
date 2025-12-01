import React, { useState, useEffect, useRef } from 'react';
import styles from './TypingGame.module.css';

import Stat from './Stats/Stat';
import Result_item from './Results/Results';

const TypingGame = () => {
  const [gameState, setGameState] = useState('idle'); // состояния игры: idle, playing, finished
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

  // Примеры текстов для игры
  const texts = [
    'Не мысля гордый свет забавить, Вниманье дружбы возлюбя, Хотел бы я тебе представить Залог достойнее тебя, Достойнее души прекрасной, Святой исполненной мечты, Поэзии живой и ясной, Высоких дум и простоты; Но так и быть — рукой пристрастной Прими собранье пестрых глав, Полусмешных, полупечальных, Простонародных, идеальных, Небрежный плод моих забав, Бессонниц, легких вдохновений, Незрелых и увядших лет, Ума холодных наблюдений И сердца горестных замет.',
    'Во всякой книге предисловие есть первая и вместе с тем последняя вещь; оно или служит объяснением цели сочинения, или оправданием и ответом на критики. Но обыкновенно читателям дела нет до нравственной цели и до журнальных нападок, и потому они не читают предисловий. А жаль, что это так, особенно у нас. Наша публика так еще молода и простодушна, что не понимает басни, если в конце ее на находит нравоучения. Она не угадывает шутки, не чувствует иронии; она просто дурно воспитана. Она еще не знает, что в порядочном обществе и в порядочной книге явная брань не может иметь места; что современная образованность изобрела орудие более острое, почти невидимое и тем не менее смертельное, которое, под одеждою лести, наносит неотразимый и верный удар. Наша публика похожа на провинциала, который, подслушав разговор двух дипломатов, принадлежащих к враждебным дворам, остался бы уверен, что каждый из них обманывает свое правительство в пользу взаимной нежнейшей дружбы.',
    'Я ехал на перекладных из Тифлиса. Вся поклажа моей тележки состояла из одного небольшого чемодана, который до половины был набит путевыми записками о Грузии. Большая часть из них, к счастию для вас, потеряна, а чемодан с остальными вещами, к счастью для меня, остался цел.',
    'Нечего делать, я нанял шесть быков и нескольких осетин. Один из них взвалил себе на плечи мой чемодан, другие стали помогать быкам почти одним криком.',
    'setTimeout(() => { inputRef.current?.focus(); }, 100); timerRef.current = setInterval(() => { setTimeElapsed(prev => prev + 0.1); }, 100);',
    'Уж мы различали почтовую станцию, кровли окружающих ее саклей, и перед нами мелькали приветные огоньки, когда пахнул сырой, холодный ветер, ущелье загудело и пошел мелкий дождь. Едва успел я накинуть бурку, как повалил снег. Я с благоговением посмотрел на штабс-капитана...'
  ];

  const startGame = () => {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setCurrentText(randomText);
    setUserInput('');
    setScore(0);
    setTimeElapsed(0);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setCurrentIndex(0);
    setGameState('playing');

    // Фокусируемся на поле ввода
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    // Запускаем таймер
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 0.1);
    }, 100);
  };

  const handleInputChange = (e) => {
    if (gameState !== 'playing') return;

    const value = e.target.value;
    setUserInput(value);

    let errorCount = 0;

    // подсчет ошибок
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    // расчет точности
    const newAccuracy = value.length > 0 
      ? Math.max(0, ((value.length - errorCount) / value.length) * 100)
      : 100;
    setAccuracy(Number(newAccuracy.toFixed(1)));

    // расчет WPM (слов в минуту)
    const words = value.trim().split(/\s+/).length;
    const minutes = timeElapsed / 60;
    const newWpm = minutes > 0 ? Math.round(words / minutes) : 0;
    setWpm(newWpm);

    // ПРоверка завершения
    if (value.length === currentText.length) {
      finishGame();
    }
  };

  const finishGame = () => {
    clearInterval(timerRef.current);
    setGameState('finished');
    
    // расчет финального счета
    const baseScore = Math.round((currentText.length / timeElapsed) * 100);
    const errorPenalty = errors * 10;
    const finalScore = Math.max(0, baseScore - errorPenalty);
    setScore(finalScore);
  };

  const getCharacterClass = (index) => {
    if (index >= userInput.length) return '';
    if (userInput[index] === currentText[index]) return 'correct';
    return 'incorrect';
  };

  // Очистка таймера при размонтировании
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
                className={`char ${getCharacterClass(index)} ${
                  index === userInput.length ? 'current' : ''
                }`}
              >
                {char}
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