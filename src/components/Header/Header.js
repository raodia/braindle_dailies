import React from "react";
import Styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={Styles.App_header}>
      <Link to="/home">
        <img
          src="https://i.pinimg.com/736x/31/df/a4/31dfa47e92e8b5ef7fd902c93c5204a3.jpg"
          alt="logo"
          height="100px"
        />
        <h1>Braindle</h1>
      </Link>

      <div>
        <Link to="signup">
        <div className={Styles.signup_button}>
            Регистрация
        </div>
        </Link>

        <Link to="login">
        <div className={Styles.login_button}>
            Вход
        </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
