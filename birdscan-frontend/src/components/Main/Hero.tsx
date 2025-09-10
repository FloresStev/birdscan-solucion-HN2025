import React from 'react'
import './Hero.css'
import {useTranslation} from 'react-i18next';

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

                    <a className = 'primary_button' href=''>
                        {t('header.primary_button_hero')}
                    </a>
                    <a className = 'secondary_button' href=''>
                        {t("header.secondary_button_hero")}
                    </a>

                </div>
            </div>
        </section>
    );
}

export default Hero