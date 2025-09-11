import React from 'react'
import './Navbar.css'
import BirdScan_logo from '/src/assets/BirdScan_logo.svg'
import {useTranslation} from 'react-i18next';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [t, i18n] = useTranslation('main');
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
                        <select name="language" id="language" className = 'language_dropdown'>
                            <option value="es" onClick={() => i18n.changeLanguage('es')}>
                                Español 🇳🇮
                            </option>
                            <option value="en" onClick={() => i18n.changeLanguage('en')}>
                                English 🇺🇸
                            </option>
                            <option value="ch" onClick={() => i18n.changeLanguage('ch')}>
                                中国 🇨🇳
                            </option>
                        </select>
                    </div>
                
                </nav>

                <Link to = "/login" className = 'login_button'>
                    {t('header.login')}
                </Link>
            </div>
        </header>
    );
}

export default Navbar