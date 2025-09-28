import "./ReserveDetails.css";
import axios from 'axios';
import Footer from '../Main/Footer';
import React, { useEffect, useState } from "react";
import type { Reserve, ReserveBird } from "../../api/api";
import type { GeoJsonObject } from "geojson";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Maps } from "./Maps";

const ReserveDetails: React.FC = () => {
    const { id } = useParams();
    const [naturalReserves, setNaturalReverves] = useState<Reserve | null>(null);
    const [error, setError] = useState(null);
    const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null);
    const [activeTab, setActiveTab] = useState('Información');
    const [speciesList, setSpeciesList] = useState<ReserveBird[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const tabs = [
        "Información",
        "Horario y Tarifas",
        "Servicios y Prácticas",
        "Mapas",
        "Aves Presentes",
        "Guías"
    ];


    useEffect(() => {
        fetch('/Reservas_Nicaragua.geojson')
            .then(res => res.json())
            .then((data) => {
                if (data.type === 'FeatureCollection') {
                    setGeoJsonData(data);
                } else {
                    console.error("Invalid GeoJson:", data);
                }
            })
            .catch((error) => console.error("Error Loading GeoJson", error))
    }, [])

    useEffect(() => {
        const reserveSelected = async () => {
            try {
                const res = await axios.get<Reserve>(`${api.defaults.baseURL}/api/naturalreserves/${id}`);
                if (res.data) {
                    setNaturalReverves(res.data);
                }
            } catch (error: any) {
                setError(error.message);
            }
        };

        if (id) reserveSelected();
    })

    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const res = await axios.get<ReserveBird[]>(`${api.defaults.baseURL}/api/naturalreserves/${id}/species`);
                setSpeciesList(res.data);
            } catch (error) {
                console.error("Error fetching species", error);
            }
        };

        if (id) fetchSpecies();
    }, [id]);

    const renderTabContent = () => {
        if (!naturalReserves) return null;

        switch (activeTab) {
            case "Información":
                return <p>{naturalReserves.description}</p>;
            case "Horario y Tarifas":
                return <div>
                    <p>{`Horarios de Atención: ${naturalReserves.opening_hours}`}</p>
                    <p> {`Tarifas de Entrada: ${naturalReserves.entrance_fee}`}</p>
                </div>;
            case "Servicios y Prácticas":
                return <p>{naturalReserves.services}</p>;
            case "Mapas":
                return <div className='maps-container-bird'>
                    <h3 className="map-title"> {`Mapa del Área Protegida ${naturalReserves.name}`}</h3>
                    {geoJsonData ? (
                        <Maps geoJsonData={geoJsonData} />
                    ) : (
                        <p>Cargando mapa de reservas...</p>
                    )}
                </div>;
            case "Aves Presentes":
                return (
                    <div className="species-list">
                        {speciesList.length === 0 ? (
                            <p>No hay registros de aves para esta reserva.</p>
                        ) : (
                            speciesList.map((bird) => (
                                <div key={bird.id} 
                                className="species-card">
                                    <img
                                        src={bird.imageUrl ? `${api.defaults.baseURL}/images/${bird.imageUrl}` : "/placeholder.jpg"}
                                        alt={bird.spanish_commonName}
                                    />
                                    <div className="species-info">
                                        <h3>{bird.spanish_commonName}</h3>
                                        <p><em>{bird.scientificName}</em></p>
                                        <p>Estacionalidad: {bird.seasonality || "N/D"}</p>
                                        <p>Presencia: {bird.presenceLevel || "N/D"}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                );
            case "Guías":
                return <p>Guías...</p>;
            default:
                return null;
        }
    };



    return (
        <>
            <div className="reserve-detail-section-container">
                <div className="reserve-banner">
                    <div className="carousel-container">
                        {naturalReserves?.images?.length ? (
                            <>
                                <img
                                    src={`${api.defaults.baseURL}/reserves_images/${naturalReserves.images[currentImageIndex]}`}
                                    alt={`Imagen ${currentImageIndex + 1}`}
                                    className="carousel-image"
                                />
                                <div className="carousel-controls">
                                    <button
                                        onClick={() =>
                                            setCurrentImageIndex((prev) =>
                                                prev === 0 ? naturalReserves.images.length - 1 : prev - 1
                                            )
                                        }
                                    >
                                        ◀
                                    </button>
                                    <span>{`${currentImageIndex + 1} / ${naturalReserves.images.length}`}</span>
                                    <button
                                        onClick={() =>
                                            setCurrentImageIndex((prev) =>
                                                prev === naturalReserves.images.length - 1 ? 0 : prev + 1
                                            )
                                        }
                                    >
                                        ▶
                                    </button>
                                </div>
                            </>
                        ) : (
                            <img src="/placeholder.jpg" alt="Reserva Natural" className="carousel-image" />
                        )}
                    </div>

                    <div className="reserve-banner-text">
                        <h1>{naturalReserves?.name}</h1>
                        <span>Área Silvestre Protegida</span>
                    </div>
                </div>

                <div className="reserve-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={tab === activeTab ? "active" : ""}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="reserve-info-section">
                    <h2>{activeTab}</h2>
                    {renderTabContent()}
                </div>
            </div>

            <Footer />

        </>
    )
}

export default ReserveDetails;