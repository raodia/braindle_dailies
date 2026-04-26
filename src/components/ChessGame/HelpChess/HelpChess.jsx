import styles from './HelpChess.module.css'

const HelpChess = () => {
  return (

    <div className={styles.instructions}>
        <h3>Как играть:</h3>
        <ul>
          <li>Нажмите на фигуру, которую хотите переместить</li>
          <li>Нажмите на клетку, куда хотите поставить фигуру</li>
          <li>Решите задачу правильным ходом!</li>
        </ul>
      </div>
    )
}

export default HelpChess;