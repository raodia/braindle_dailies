import styles from './Help.module.css';

const Help = () => {
    return (
        <div className={styles.instructions}>
            <h3>Как играть:</h3>
            <ul>
              <li>Кликните на пустую ячейку</li>
              <li>Выберите число от 1 до 6</li>
              <li>Каждое число должно быть уникальным в строке, столбце и блоке 2x3</li>
              <li>3 права на ошибку</li>
            </ul>
          </div>
    );
}

export default Help;