import React, { useState, useEffect } from 'react';

import styles from './LOTGame.module.css';
import { NavLink } from 'react-router-dom';

const LOTGame = (props) => {
     let questions = props.state;
    
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [score, setScore] = useState(0);
      const [gameOver, setGameOver] = useState(false);
      const [showExplanation, setShowExplanation] = useState(false);
      const [usedQuestions, setUsedQuestions] = useState([]);
      const [blocked, setBlocked] = useState(false);
    
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
        if (userAnswer === currentQuestion.isTrue) {
          // Правильный ответ
          const newScore = score + 1;
          setScore(newScore);
          setBlocked(true);
          
          if (newScore >= 5) {
            setGameOver(true);
          } else {
            setShowExplanation(true);
            setTimeout(() => {
              nextQuestion();
          setBlocked(false);
            }, 3000);
          }
        } else {          
          setGameOver(true); // 
          setScore(score);
        
                
        
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
                <h2>Игра окончена</h2>
                <p>Вы набрали {score} очков из 5</p>
                <NavLink to={'/home'} onClick={resetGame} className={styles.reset_button}>
                  На главную
                </NavLink>
              </div>
            ) : (
              <>
                
                <div className={styles.question_card}>
                  <h2>Факт:</h2>
                  <p className={styles.fact_text}>"{currentQuestion?.fact}"</p>
                  
                  {showExplanation && (
                    <div className={styles.explanation}>
                      <strong>Объяснение:</strong> {currentQuestion?.explanation}
                    </div>
                  )}
                </div>
                
                <div className={styles.buttons_container}>
                  <button 
                    onClick={() => handleAnswer(true)}
                    className={`${styles.truth_button}`}
                    disabled={blocked}
                  >
                    Правда
                  </button>
                  
                  <button 
                    onClick={() => handleAnswer(false)}
                    className={`${styles.lie_button}`}
                  disabled={blocked}
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