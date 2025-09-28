import React, { useEffect, useState } from "react";
import "./MapsSection.css";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Maps } from "../Explore/Maps";
import type { GeoJsonObject } from "geojson";

const MapsSection: React.FC = () => {
    const [t, i18n] = useTranslation('main');

    const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null);

    useEffect(() => {
        fetch('/Reservas_Nicaragua.geojson')
            .then((res) => res.json())
            .then((data) => {
                if (data.type === 'FeatureCollection') {
                    setGeoJsonData(data);
                } else {
                    console.error('GeoJSON inválido:', data);
                }
            })
            .catch((error) => console.error('Error Loading GeoJson:', error))
    }, [])
    return (
        <section className='maps_section-container'>

            <div className='maps-container'>
                {geoJsonData ? (
                    <Maps geoJsonData={geoJsonData} />
                ) : (
                    <p>Cargando mapa de reservas...</p>
                )}

            </div>

            <div className='maps_content-container'>
                <h2 className='h2_maps-section'>
                    {t("mapsSection.h2_mapsSection")}
                </h2>

                <p className='p_maps-section'>
                    {t("mapsSection.p_mapsSection")}
                </p>

                <Link to='/naturalreserves' className='button_maps-section'>
                    {t("mapsSection.primary_button_mapsSection")}
                </Link>
            </div>

        </section>
    );

}

export default MapsSection