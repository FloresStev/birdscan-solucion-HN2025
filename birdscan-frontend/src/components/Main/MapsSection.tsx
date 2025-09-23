import React from "react";
import "./MapsSection.css";
import {useTranslation} from 'react-i18next';
import mapaReservas from "../../assets/Mapa_reservas.jpg";
import { Link } from "react-router-dom";

const MapsSection: React.FC = () => {
    const [t, i18n] = useTranslation('main');
    return (
        <section className = 'maps_section-container'>
            
            <div className = 'maps-container'> 
                <img src = {mapaReservas}/>
            </div>

            <div className = 'maps_content-container'>
                <h2 className = 'h2_maps-section'>
                    {t("mapsSection.h2_mapsSection")}
                </h2>

                <p className = 'p_maps-section'>
                    {t("mapsSection.p_mapsSection")}
                </p>

                <Link to=  '/maps' className = 'button_maps-section'>
                    {t("mapsSection.primary_button_mapsSection")}
                </Link>
            </div>

        </section>
    );

}

export default MapsSection