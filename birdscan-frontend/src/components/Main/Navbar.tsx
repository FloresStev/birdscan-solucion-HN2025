import React from 'react';
import './Navbar.css';
import BirdScan_logo from '/src/assets/BirdScan_logo.svg';
import { useTranslation } from 'react-i18next';

import { Link, NavLink } from 'react-router-dom';
import { useTheme } from './ThemeContext.tsx';
import LanguageDropdown from './LanguageDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import UserDropDown from '../User/UserDropDown.tsx';
import { useAuth } from '../../auth/AuthProvider.tsx';


const Navbar: React.FC = () => {
    const [t, i18n] = useTranslation('main');
    const { darkMode, toggleDarkMode } = useTheme();
    const { isAuthenticated } = useAuth();

    return (
        <header className='header'>
            <div className='Navbar_container'>
                <Link to="/">
                    <img src={BirdScan_logo} alt="BirdScan Logo" className="logo" />
                </Link>

                <nav className='navbar'>

                    <NavLink to="/" className='navbar_items'>
                        {t('header.home')}
                    </NavLink>
                    <NavLink to="/explore" className='navbar_items'>
                        {t('header.explore')}
                    </NavLink>
                    <NavLink to="/tours" className='navbar_items'>
                        {t('header.tours')}
                    </NavLink>
                    <NavLink to="/events" className='navbar_items'>
                        {t('header.events')}
                    </NavLink>
                    <NavLink to="/learn" className='navbar_items'>
                    
                        {t('header.learn')}
                    </NavLink>

                    <div className='language_selector'>
                        <LanguageDropdown i18n={i18n} />
                    </div>

                </nav>

                <div className='right_section-navbar'>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className='login_button'>
                                {t('header.login')}
                            </Link>
                            <Link to="/signup" className='signup_button'>
                                {t('header.signup')}
                            </Link>
                        </>
                    ) : (

                        <UserDropDown />
                    )}

                    <button onClick={toggleDarkMode}
                        className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}>
                        <div className='circle'>
                            <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
                        </div>
                    </button>
                </div>


            </div>
        </header>
    );
}

export default Navbar