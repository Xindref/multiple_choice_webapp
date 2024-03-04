import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
import { useState } from "react";

const NavBar = () => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const chapterList = [3, 6, 11, 22, 23, 25, 26, 31, 32, 37, 38, 39, 43, 48];

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    }

    return (
        <nav className={styles.NavBar}>
            <ul className={styles.navList}>
                <li><Link to={'/'}>Home</Link></li>
                <li onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} className={styles.chapterSelect}>
                    <Link >Chapter Select</Link>
                    {isDropdownOpen && (
                        <ul className={styles.dropDownContainer}>
                            {chapterList.map((chapter) => (
                                <li className={styles.dropDownItem}>
                                    <Link to={`/chapter_${chapter}`} onClick={toggleDropdown}>Chapter {chapter}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;