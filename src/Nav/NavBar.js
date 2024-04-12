import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
import { useState } from "react";

const NavBar = () => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const chapterList = [3, 6, 10, 11, 14, 22, 23, 24, 25, 26, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

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