import React from 'react';

import styles from './Navbar.module.css';
import Navitem from './Navitems/Navitem';


const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <Navitem text='Шахматные задачи' link='/chess'></Navitem>
            <Navitem text='Печаталка' link='/blind-typer'></Navitem>
            <Navitem text='Правда/ложь' link='/true-or-lie'></Navitem>
            <Navitem text='Слово дня' link='/wordle'></Navitem>
        </div>
    )
}

export default Navbar;