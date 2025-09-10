import React from 'react'
import './Navbar.css'
import BirdScan_logo from '/src/assets/BirdScan_logo.svg'
import {useTranslation} from 'react-i18next';

const Navbar: React.FC = () => {
    const [t, i18n] = useTranslation('main');
    return (
        <header className = 'header'>
            <div className = 'Navbar_container'>

                <img src={BirdScan_logo} alt="BirdScan Logo" className="logo" />

                <nav className = 'navbar'>
                    <a className = 'navbar_items' href="">
                        {t('header.home')}
                    </a>
                    <a className = 'navbar_items' href="">
                        {t('header.explore')}
                    </a>
                    <a className = 'navbar_items' href="">
                        {t('header.tours')}
                    </a>
                    <a className = 'navbar_items' href="">
                        {t('header.events')}
                    </a>
                    <a className = 'navbar_items' href="">
                        {t('header.learn')}
                    </a>

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

                <a className = 'login_button' href="">
                    {t('header.login')}
                </a>
            </div>
        </header>
    );
}

export default Navbar