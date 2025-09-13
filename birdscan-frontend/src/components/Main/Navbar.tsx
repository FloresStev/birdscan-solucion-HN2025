import React from 'react'
import './Navbar.css'
import BirdScan_logo from '/src/assets/BirdScan_logo.svg'
import {useTranslation} from 'react-i18next';
import { Link } from 'react-router-dom';
import {useTheme} from './ThemeContext.tsx';
import LanguageDropdown from './LanguageDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';


const Navbar: React.FC = () => {
    const [t, i18n] = useTranslation('main');
    const {darkMode, toggleDarkMode} = useTheme();

    return (
        <header className = 'header'>
            <div className = 'Navbar_container'>
                <Link to = "/">
                    <img src={BirdScan_logo} alt="BirdScan Logo" className="logo" />
                </Link>

                <nav className = 'navbar'>
                    <Link to = "/" className = 'navbar_items'>
                        {t('header.home')}
                    </Link>
                    <Link to = "/explore" className = 'navbar_items'>
                        {t('header.explore')}
                    </Link>
                    <Link to = "/tours" className = 'navbar_items'>
                        {t('header.tours')}
                    </Link>
                    <Link to = "/events" className = 'navbar_items'>
                        {t('header.events')}
                    </Link>
                    <Link to = "/learn" className = 'navbar_items'>
                        {t('header.learn')}
                    </Link>

                    <div className = 'language_selector'>
                        <LanguageDropdown i18n={i18n} />
                    </div>
                
                </nav>
                <button onClick={toggleDarkMode}
                    className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}>
                        <div className = 'circle'>
                            <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
                        </div>
                </button>
                <Link to = "/login" className = 'login_button'>
                    {t('header.login')}
                </Link>
            </div>
        </header>
    );
}

export default Navbar