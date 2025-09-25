import React from 'react'
import './Hero.css'
import {useTranslation} from 'react-i18next';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    const [t, i18n] = useTranslation('main');
    return (
        <section className = 'hero'>

            <div className = 'hero_content'>
                <h1>
                    {t("header.h1_header")}
                </h1>
                
                <h2 className = 'h2_hero_section'>
                    {t("header.h2_header_hero")}
                </h2>
                <div className='hero_actions'>

                    <Link to = '/birds' className = 'primary_button'>
                        {t('header.primary_button_hero')}
                    </Link>
                    <Link to = '/tours' className = 'secondary_button'>
                        {t("header.secondary_button_hero")}
                    </Link>

                </div>
            </div>
        </section>
    );
}

export default Hero