import React from "react";
import './Footer.css';
import  {useTranslation} from 'react-i18next';
import {Link} from 'react-router'

const Footer: React.FC = () =>{
    const [t, i18n] = useTranslation('main');

    return(
        <>
            <section className = 'footer_section-container'>
                <div className = 'social_media-section'>
                    <img className = 'footer_birdscan-logo' src = '/src/assets/BirdScan_logo.svg'/>
                    
                    <p className = 'social_media-label'>
                        {t('footer.follow_us')}
                    </p>
                    <section className = 'icons_container'>
                        <div className = 'icon_socialmedia-container'>
                            <img className = 'facebook_logo' src = '/src/assets/facebook_logo.svg'/>
                        </div>

                        <div className = 'icon_socialmedia-container'>
                            <img className = 'instagram_logo' src = '/src/assets/instagram_logo.svg'/>
                        </div>
                    </section>
                </div>

                <div className = 'nav_section'>
                    <h3 className = "footer_section-tittle">
                        {t("footer.navigation")}
                    </h3>
                    <Link to='/' className = 'footer_navigation-links'>
                        {t("footer.home")}
                    </Link>
                    <Link to='explore' className = 'footer_navigation-links'>
                        {t("footer.explore")}
                    </Link>
                    <Link to='/tours' className = 'footer_navigation-links'>
                        {t("footer.tours")}
                    </Link>
                    <Link to='/events' className = 'footer_navigation-links'>
                        {t("footer.events")}
                    </Link>
                    <Link to='/learn' className = 'footer_navigation-links'>
                        {t("footer.learn")}
                    </Link>
                    <Link to='' className = 'footer_navigation-links'>
                        {t("footer.privacy_policy")}
                    </Link>
                    <Link to='' className = 'footer_navigation-links'>
                        {t("footer.terms_of_service")}
                    </Link>
                </div>

                <div className = 'contact_section'>
                    <h3 className = 'footer_section-tittle'>
                        {t("footer.contact")}
                    </h3>
                    <p className = 'footer_contact-p'>
                        +505 8434-9658
                    </p>
                    <p className = 'footer_contact-p-tittle'>
                        {t("footer.number_text")}
                    </p>
                    <p className = 'footer_contact-p'>
                        birdscan@gmail.com
                    </p>
                    <p className = 'footer_contact-p-tittle'>
                        {t("footer.email_text")}
                    </p>
                    <p className = 'footer_contact-p'>
                        {t("footer.address")}
                    </p>
                    <p className = 'footer_contact-p-tittle'>
                        {t("footer.ubication")}
                    </p>
                </div>
            </section>
            <section className = "container_copyright-text">
                <p className = 'copyright_text-content'>
                    © BirdScan 2025
                </p>
            </section>
            
        </>
    );
}

export default Footer