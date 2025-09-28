import React from "react";
import './BSmultiplatform.css'
import {useTranslation} from 'react-i18next';
import { Link } from "react-router-dom";

const BSmultiplatform: React.FC = () => {
    const [t, i18n] = useTranslation('main');
    return (
        <section className = 'birdscanMultiplatform_section'>
            <div className = 'container_multiplatformcontent'>
                <div className = 'image_container'>
                    <img className='multiplatform_images' src='/src/assets/BirdScan_multiplatform.svg'/>
                </div>
                <div className = 'content_container'>
                    <h2 className = 'h2_birdscan_multiplatform'>
                        {t("birdscanMultiplatform.h2_birdscanMultiplatform")}
                    </h2>
                    <p className ='p_birdscan_multiplatform'>
                        {t("birdscanMultiplatform.p_birdscanMultiplatform")}
                    </p>
                    <Link to = "/information" className = 'learnmore_button'>
                        {t("birdscanMultiplatform.secondary_button_birdscanMultiplatform")}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default BSmultiplatform