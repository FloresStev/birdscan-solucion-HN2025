import "./BirdSection.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import api, { type Bird } from "../../api/api";
import { useLocation } from "react-router-dom";
import { Pagination } from "./Pagination";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function BirdSection() {
    const query = useQuery();
    const filter = query.get('filter') || 'all';

    const [birds, setBirds] = useState<Bird[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 20;

    useEffect(() => {
        const endpoint = filter === 'endangered'
            ? '/api/birds/endangeredspecies'
            : `/api/birds/all?page=${page}&limit=${limit}`;

        axios.get<{ message: string; data: Bird[]; totalPages?: number }>(`${api.defaults.baseURL + endpoint}`)
            .then((res) => {
                if (res.data && Array.isArray(res.data.data)) {
                    setBirds(res.data.data);
                    if (res.data.totalPages) setTotalPages(res.data.totalPages);
                } else {
                    console.error('Respuesta inesperada:', res.data);
                    setBirds([]);
                }
            })
            .catch((err) => console.error(err));
    }, [filter, page]);

    return (
        <>
            <h2 className = 'h2-tittle-birds'>
                {filter === 'endangered' ? 'Aves en peligro' : 'Aves de Nicaragua'}
            </h2>

            <div className="catalog-grid">
                {birds.length > 0 ? (
                    birds.map((bird) => (
                        <div key={bird.scientificName} className="observation-card">
                            <div className="observation-image">
                                {bird.imageUrl ? (
                                    <img
                                        src={`${api.defaults.baseURL}/images/${encodeURIComponent(bird.imageUrl)}`}
                                        alt={bird.english_commonName}
                                    />
                                ) : (
                                    <div className="no-image">Imagen no disponible</div>
                                )}
                            </div>

                            <div className="observation-info">
                                <p className="common-name">{bird.spanish_commonName}</p>
                                <p className="scientific-name">{bird.scientificName}</p>
                                <p className="meta">{bird.conservationStatus}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron aves.</p>
                )}
            </div>
            {filter === 'all' && (
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            )}

        </>
    );
}