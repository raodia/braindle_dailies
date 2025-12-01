
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.wrapper} id='Mainscreen'>
        <div className={styles.greetings}>
                Добро пожаловать!
            </div>

            Выберите пункт в меню на боковой панели
        </div>
    )
}

export default HomePage;