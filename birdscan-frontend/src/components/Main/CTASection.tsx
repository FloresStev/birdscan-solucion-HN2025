import React from "react";
import './CTASection.css';
import {useTranslation} from 'react-i18next';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () =>{
    const [t, i18n] = useTranslation('main');
    return(
        <section className = 'CTA_section'>
            <div className = 'CTA_section-container'>
                <div>
                    <h2 className = 'CTA_section-h2'>
                        {t("ctaSection.h2_ctaSection")}
                    </h2>

                    <p className = 'CTA_section-p'>
                        {t("ctaSection.p_ctaSection")}
                    </p>
                </div>
                
                <Link to = '/signin' className = 'CTA_section-button'>
                    {t("ctaSection.primary_button_ctaSection")}
                </Link>
            </div>

        </section>
    );
}

export default CTASection