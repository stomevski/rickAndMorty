import styles from './Header.module.css';
import rickAndMorty from '../../assets/rickAndMorty.png';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <header>
            <div className={styles.nameAndLogo}>
                <h1 className={styles.header_text}>Rick & Morty</h1>
                <img className={styles.img} src={rickAndMorty} alt="Rick and morty" />
            </div>
            <nav className={styles.navbar}>
                <NavLink className={(navData) => navData.isActive ? styles.active : ''} to="/characters">Characters</NavLink>
                <NavLink className={(navData) => navData.isActive ? styles.active : ''} to="/locations">Locations</NavLink>
                <NavLink className={(navData) => navData.isActive ? styles.active : ''} to="/episodes">Episodes</NavLink>
            </nav>
        </header>
    )

}

export default Header;