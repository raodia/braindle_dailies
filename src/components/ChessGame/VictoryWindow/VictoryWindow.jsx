
import React, { useState, useEffect } from 'react';
import Styles from './VictoryWindow.module.css'

const VictoryScreen = ({ onNextPuzzle, moves }) => {
  return (
  <div className={Styles.victory_screen}>
      <div className={Styles.victory_content}>
        <h2>🎉 Поздравляем! 🎉</h2>
        <p>Вы правильно решили шахматную задачу!</p>
        <p>Ваш ход: {moves.from} → {moves.to}</p>
        <button onClick={onNextPuzzle} className={Styles.next_button}>
          Следующая задача
        </button>
      </div>
    </div>
  );
};

export default VictoryScreen;