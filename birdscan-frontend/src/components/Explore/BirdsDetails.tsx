import React, { useEffect, useState } from 'react';
import './BirdsDetails.css';
import { useParams } from 'react-router-dom';
import api, { type Bird } from '../../api/api';
import axios from 'axios';
import Footer from '../Main/Footer';

const BirdsDetails: React.FC = () => {

    const { id } = useParams();

    const [bird, setBird] = useState<Bird | null>(null);
    const [error, setError] = useState(null);

    const getUICNLabel = (code: string): string => {
        switch (code) {
            case 'LC': return 'Preocupación Menor';
            case 'NT': return 'Casi Amenazada';
            case 'VU': return 'Vulnerable';
            case 'EN': return 'En Peligro';
            case 'CR': return 'En Peligro Crítico';
            case 'EW': return 'Extinta en Estado Silvestre';
            case 'EX': return 'Extinta';
            default: return 'Estado desconocido';
        }
    };

    useEffect(() => {
        const birdSelected = async () => {
            try {
                const res = await axios.get<Bird>(`${api.defaults.baseURL}/api/birds/${id}`);
                if (res.data) {
                    setBird(res.data);
                }
            } catch (error: any) {
                setError(error.message);
            }
        };

        if (id) birdSelected();
    }, [id]);

    if (error) return <p>Error: {error}</p>;
    if (!bird) return <p>Cargando...</p>;


    return (
        <>
            <div className='bird-detail-section-container'>

                <div className='bird-detail-subcontainer'>

                    <div className='basic-bird-information'>

                        <h2> {bird.spanish_commonName} </h2>
                        <h3> {bird.english_commonName} </h3>
                        <p> {bird.scientificName}</p>
                        <div className="status_conservation">
                            <div className="status-icon">{bird.conservationStatus}</div>
                            <span className="status-conservation-value">
                                {getUICNLabel(bird.conservationStatus)}
                            </span>
                        </div>

                    </div>
                    <div className='bird-image-container'>
                        {bird.imageUrl ? (
                            <img
                                src={`${api.defaults.baseURL}/images/${encodeURIComponent(bird.imageUrl)}`}
                                alt={bird.english_commonName}
                            />
                        ) : (
                            <div className="no-image">Imagen no disponible</div>
                        )}
                    </div>

                </div>

                <div className='description-bird-container'>
                    <h3> Descripción </h3>
                    <p> {bird.description} </p>
                </div>

                <div className = 'distributionMap'>
                    
                </div>
            </div>

            <Footer />
        </>
    );
}

export default BirdsDetails