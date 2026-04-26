import React, { useState, useEffect, useRef } from 'react';
import Styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className={Styles.App_header}>
            <Link to='/home'>
                <img src="https://i.pinimg.com/736x/31/df/a4/31dfa47e92e8b5ef7fd902c93c5204a3.jpg" alt="logo" height='100px' />
                <h1>
                    Braindle
                </h1>
            </Link>
            
        </header>
    )
}

export default Header;