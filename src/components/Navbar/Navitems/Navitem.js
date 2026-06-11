import { Link } from 'react-router-dom';
import styles from './Navitem.module.css';

const Navitem = ( props ) => {
    return (        
            <Link className={styles.navitem} to={props.link}>
                {props.text}
            </Link>
    )
}

export default Navitem;