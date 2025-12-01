import React, { useState, useEffect, useRef } from 'react';
import Styles from './Header.module.css';

const Header = () => {
    return (
        <header className={Styles.App_header}>
            <a href='/home'>
                <img src="https://i.pinimg.com/736x/31/df/a4/31dfa47e92e8b5ef7fd902c93c5204a3.jpg" alt="logo" height='100px' />
                <h1>
                    Braindle
                </h1>
            </a>
            
        </header>
    )
}

export default Header;