import { NavLink } from 'react-router-dom';
import styles from './LoginPage.module.css'

let LoginPage = (props) => {
    let login = props.puzzlesDispatch;
    return (
        <div className={styles.wrapper}>
            <div className={styles.username_area}>
                <div>
                    Логин:
                </div>
                <input type='text' />
            </div>
            <div className={styles.password_area}>
                <div>
                    Пароль:
                </div>
                <input type='text' />
            </div>
            <div className={styles.button_area}>
                <div
                
                className={styles.login_button}
                onClick={ () => {login({type: 'LOGIN-USER', userdata: {userid: 1, username: 'admin', password: 'Adminpass21.' }});}} // работает исправно
                >
                    Войти
                </div>
            </div>

        </div>
    )
};

export default LoginPage;