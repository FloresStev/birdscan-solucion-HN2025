import React from 'react'
import './WhyBS.css'
import {useTranslation} from 'react-i18next';

const AboutBS: React.FC = () => {
    const [t, i18n] = useTranslation('main');
    return (
        <>
            <section className = 'whyBS_section'>
                <h2 className = 'h2_whyBS_section'>
                    {t("whyBS.h2_whyBS_text")}
                </h2>
                
                <div className = 'containers_wrapper'>
                    <div className = 'tags_container'>
                        <img src = '/src/assets/birds_catalog.svg'/>
                        <h3>
                            {t("whyBS.birdslabel")}
                        </h3>
                        <p>
                            {t("whyBS.birdsP")}
                        </p>
                    </div>

                    <div className = 'tags_container'>
                        <img src = '/src/assets/Forest.svg'/>
                        <h3>
                            {t("whyBS.reserveslabel")}
                        </h3>
                        <p>
                            {t("whyBS.reservesP")}
                        </p>
                    </div>

                    <div className = 'tags_container'>
                        <img src = '/src/assets/Calendario.svg'/>
                        <h3>
                            {t("whyBS.eventslabel")}
                        </h3>
                        <p>
                            {t("whyBS.eventsP")}
                        </p>
                    </div>

                    <div className = 'tags_container'>
                        <img src = '/src/assets/Binoculares.svg'/>
                        <h3>
                            {t("whyBS.avidexlabel")}
                        </h3>
                        <p>
                            {t("whyBS.avidexp")}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutBS