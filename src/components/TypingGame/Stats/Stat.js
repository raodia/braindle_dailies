import React, { useState, useEffect, useRef } from 'react';

import styles from './Stat.module.css';

const Stat = ( props ) => {
    return (
        <div className="stat">
            <span className={styles.stat_label}>
                <p>
                    {props.text}
                </p>
            </span>
            <span className={styles.stat_value}>
                <p>
                    {props.data}
                </p>
                </span>
        </div>
    )
}

export default Stat;