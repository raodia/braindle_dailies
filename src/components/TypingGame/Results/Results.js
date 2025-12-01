import React, { useState, useEffect, useRef } from 'react';

import styles from './Results.module.css';

const Result_item = ( props ) => {
    return (
<div className={styles.result_item}>
              <span>
                <p>
                    {props.name}
                </p>
              </span>
              <strong>{props.data}</strong>
            </div>

    )
}

export default Result_item;