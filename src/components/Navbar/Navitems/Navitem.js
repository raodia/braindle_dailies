import styles from './Navitem.module.css';

const Navitem = ( props ) => {
    return (
            <a className={styles.navitem} href={props.link}>
                {props.text}
            </a>
    )
}

export default Navitem;