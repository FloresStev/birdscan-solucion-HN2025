import React from 'react'
import './AboutBS.css'
import {useTranslation} from 'react-i18next';

const AboutBS: React.FC = () => {
    const [t, i18n] = useTranslation('main');
    return (
        <section className = 'aboutBS_section'>
            <h2 className = 'h2_aboutBS_section'>
                {t("main.h2_main")}
            </h2>

            <p className = 'p_aboutBS_section'>
                {t("main.h3_main")}
            </p>

            <div className = 'images_container'>
                <img className = 'image_item' src = '/src/assets/Platalea_ajaja.jpg'/>
                <img className = 'image_item' src = '/src/assets/Tisma.jpg'/>
                <img className = 'image_item' src = '/src/assets/Observadora.jpg'/>
            </div>

            <a className = 'secondary_button_main' href=''>
                {t("main.secondary_button_main")}
            </a>
            
        </section>
    );
}

export default AboutBS