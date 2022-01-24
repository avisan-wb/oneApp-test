import React from 'react'
import styles from '../styles/main.css';
import { Link } from '@americanexpress/one-app-router';

function Header({handleLanguageChange}) {
    const locales = React.useMemo(() => ['en-US', 'en-CA', 'es-MX'], []);

    return ( 
        <nav className={styles.navigation}>
            <div className={styles.logo}>
                <Link to="/">TEST-ONE-APP</Link>
            </div>
            <div>
                <select name="locale" id="locale-selector" onChange={handleLanguageChange}>
                    {locales.map((locale) => {
                        return <option key={locale} value={locale}>
                            {locale}
                        </option>
                    })}
                </select>
            </div>
            <ul className={styles.navList}>
                <li>
                    <Link to="/child-1">Child-1</Link>
                </li>
            </ul>
        </nav> 
    )
}

export default Header;