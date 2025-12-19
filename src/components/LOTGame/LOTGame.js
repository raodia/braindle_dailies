import React, { useState, useEffect } from 'react';

import styles from './LOTGame.module.css';

const LOTGame = () => {
     const [questions, setQuestions] = useState([
        {
          id: 1,
          fact: "Солнце - звезда",
          isTrue: true,
          explanation: "Солнце действительно является звездой - желтым карликом."
        },
        {
          id: 2,
          fact: "Вода закипает при 90 градусах Цельсия при н.у.",
          isTrue: false,
          explanation: "Вода закипает при 100 градусах Цельсия при нормальном атмосферном давлении."
        },
        {
          id: 3,
          fact: "Пингвины умеют летать",
          isTrue: false,
          explanation: "Пингвины - нелетающие птицы, они хорошо плваают, но не летают."
        },
        {
          id: 4,
          fact: "Python - это язык программирования",
          isTrue: true,
          explanation: "Python - мусор, но всё-таки ЯП, эх."
        },
        {
          id: 5,
          fact: "Земля плоская",
          isTrue: false,
          explanation: "Научно доказано, что Земля имеет форму геоида (сплюснутый у полюсов шар)."
        },
        {
          id: 6,
          fact: "Медвежата при рождении весят около 5 килограммов",
          isTrue: false,
          explanation: "На самом деле, их вес при рождении составляет всего полкило"
        },
        {
          id: 7,
          fact: "Свет быстрее звука",
          isTrue: true,
          explanation: "Свет распространяется со скоростью 300,000 км/с, а звук - около 340 м/с."
        },
        {
          id: 8,
          fact: "Акулы болеют раком",
          isTrue: true,
          explanation: "акулы действительно могут болеть раком."
        },
        {
          id: 9,
          fact: "Венера - самая горячая планета Солнечной системы",
          isTrue: true,
          explanation: "Из-за парникового эффекта температура на Венере достигает 470°C."
        },
        {
          id: 10,
          fact: "Название реки Волга происходит от слова \"волочь\"",
          isTrue: false,
          explanation: "Это неправда, оно происходит от старославянского \"влага\""
        },
        {
          id: 11,
          fact: "Бикини (элемент одежды) было названо в честь дизайнера Альберта Бикини",
          isTrue: false,
          explanation: "Элемент одежды \"бикини\" был назван в честь атолла (острова) Бикини, на котором проходили ядерные испытания"
          //Коралловый остров кольцеобразной формы
        }
      ]);
    
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [score, setScore] = useState(0);
      const [gameOver, setGameOver] = useState(false);
      const [blocked, setBlocked] = useState(false);
      const [showExplanation, setShowExplanation] = useState(false);
      const [usedQuestions, setUsedQuestions] = useState([]);
    
      const getRandomQuestion = () => {
        const availableQuestions = questions.filter(q => !usedQuestions.includes(q.id));
        if (availableQuestions.length === 0) {
          // если все вопросы использованы, сбрасываем список
          setUsedQuestions([]);
          return questions[Math.floor(Math.random() * questions.length)];
        }
        return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      };
    
      const currentQuestion = questions[currentQuestionIndex];
    
      const handleAnswer = (userAnswer) => {
        if (blocked) return;
    
        if (userAnswer === currentQuestion.isTrue) {
          // Правильный ответ
          const newScore = score + 1;
          setScore(newScore);
          
          if (newScore >= 5) {
            setGameOver(true);
          } else {
            setShowExplanation(true);
            setTimeout(() => {
              nextQuestion();
            }, 3000);
          }
        } else {
          // Неправильный ответ - блокировка
          setBlocked(true);
          setShowExplanation(true);
          setTimeout(() => {
            setBlocked(false);
            setShowExplanation(false);
          }, 3000);
        }
      };
    
      const nextQuestion = () => {
        setUsedQuestions(prev => [...prev, currentQuestion.id]);
        
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * questions.length);
        } while (usedQuestions.includes(questions[nextIndex].id) && usedQuestions.length < questions.length);
        
        setCurrentQuestionIndex(nextIndex);
        setShowExplanation(false);
      };
    
      const resetGame = () => {
        setScore(0);
        setGameOver(false);
        setBlocked(false);
        setShowExplanation(false);
        setUsedQuestions([]);
        setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
      };
    
      useEffect(() => {
        // Начальная инициализация случайного вопроса
        setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
      }, []);
    
      return (
        <div className={styles.LOTgame}>

            <h1>Правда или Ложь</h1>
            
            {gameOver ? (
              <div className={styles.game_over}>
                <h2>Поздравляем!</h2>
                <p>Вы набрали 5 очков и выиграли</p>
                <button onClick={resetGame} className={styles.reset_button}>
                  Играть снова
                </button>
              </div>
            ) : (
              <>
                
                <div className={styles.question_card}>
                  <h2>Факт:</h2>
                  <p className={styles.fact_text}>"{currentQuestion?.fact}"</p>
                  
                  {blocked && (
                    <div className={styles.blocked_message}>
                      Неправильно! Попробуйте снова через 3 секунды...
                    </div>
                  )}
                  
                  {showExplanation && (
                    <div className={styles.explanation}>
                      <strong>Объяснение:</strong> {currentQuestion?.explanation}
                    </div>
                  )}
                </div>
                
                <div className={styles.buttons_container}>
                  <button 
                    onClick={() => handleAnswer(true)}
                    disabled={blocked}
                    className={`${styles.truth_button} ${blocked ? styles.disabled : ''}`}
                  >
                    Правда
                  </button>
                  
                  <button 
                    onClick={() => handleAnswer(false)}
                    disabled={blocked}
                    className={`${styles.lie_button} ${blocked ? styles.disabled : ''}`}
                  >
                    Ложь
                  </button>
                </div>

                <div className={styles.score}>Очки: {score}/5</div>
                <div className={styles.progress}>
                  <div 
                    className={styles.progress_bar} 
                    style={{width: `${(score / 5) * 100}%`}}
                  ></div>
                </div>
              </>
            )}


        </div>
      );
}

export default LOTGame;