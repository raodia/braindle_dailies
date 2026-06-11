
import React, { useState, useEffect } from 'react';
import Styles from './DefeatWindow.module.css'

const DefeatScreen = ({ onNextPuzzle, moves }) => {
  return (
  <div className={Styles.victory_screen}>
      <div className={Styles.victory_content}>
        <h2>О нет!</h2>
        <p>Вы ошиблись!</p>
        {/* <p>Ваш ход: {moves.from} → {moves.to}</p> */}
        <button onClick={onNextPuzzle} className={Styles.next_button}>
          Следующая задача
        </button>
      </div>
    </div>
  );
};

export default DefeatScreen;