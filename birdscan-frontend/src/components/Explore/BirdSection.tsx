import "./BirdSection.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import api, { type Bird } from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "./Pagination";
import { BirdFilterButtons } from "./BirdFilterButtons";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function BirdSection() {
    const query = useQuery();
    const filter = query.get('filter') || 'all';
    const navigate = useNavigate();

    const [birds, setBirds] = useState<Bird[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 20;

    const search = query.get('search') || '';
    const statusParam = query.get('status') || '';


    useEffect(() => {
        const fetchBirds = async () => {
            setLoading(true);

            const endpoint = search
                ? `/api/birds/search?q=${encodeURIComponent(search)}`
                : filter === 'endangered'
                    ? `/api/birds/endangeredspecies${statusParam ? `?status=${statusParam}` : ''}`
                    : filter === 'migratory'
                        ? `/api/birds/by-status?status=M,MP,S,P/S&page=${page}&limit=${limit}`
                        : filter === 'resident'
                            ? `/api/birds/by-status?status=R&page=${page}&limit=${limit}`
                            : filter === 'mixed'
                                ? `/api/birds/mixed?page=${page}&limit=${limit}`
                                : `/api/birds/all?page=${page}&limit=${limit}`;

            try {
                const res = await axios.get<{ message: string; data: Bird[]; totalPages?: number }>(
                    `${api.defaults.baseURL}${endpoint}`
                );

                const birdsData = res.data?.data;
                setBirds(Array.isArray(birdsData) ? birdsData : []);

                if (res.data.totalPages && !search) {
                    setTotalPages(res.data.totalPages);
                }

                await new Promise((resolve) => setTimeout(resolve, 800));

            } catch (err) {
                console.error(err);
                setBirds([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBirds();
    }, [filter, page, search, statusParam]);

    return (
        <>
            <h2 className='h2-tittle-birds'>
                {filter === 'endangered'
                    ? statusParam === 'R'
                        ? 'Aves residentes en peligro'
                        : statusParam === 'M,MP,S,P/S'
                            ? 'Aves migratorias en peligro'
                            : 'Aves de Nicaragua en Peligro'
                    : filter === 'migratory'
                        ? 'Aves migratorias'
                        : filter === 'resident'
                            ? 'Aves residentes'
                            : 'Aves de Nicaragua'}
            </h2>

            {['all', 'migratory', 'resident', 'mixed'].includes(filter) && (
                <BirdFilterButtons context="general" />
            )}

            {filter === 'endangered' && (
                <BirdFilterButtons context="endangered" />
            )}



            {search && (
                <button className="clear-search-button" onClick={() => navigate('/birds?filter=all')}>
                    Limpiar búsqueda
                </button>
            )}

            {loading && (
                <div className="loading-container">
                    <p className="loading-text">Cargando aves...</p>
                </div>
            )}

            {!loading && (
                <div className="catalog-grid">
                    {birds.length > 0 ? (
                        birds.map((bird) => (
                            <div key={bird.scientificName} className="observation-card">
                                <div className="observation-image">
                                    {bird.imageUrl ? (
                                        <img
                                            src={`${api.defaults.baseURL}/images/${encodeURIComponent(bird.imageUrl)}`}
                                            alt={bird.english_commonName}
                                            onClick={() => navigate(`/birds/${bird.id}`)}
                                        />
                                    ) : (
                                        <div className="no-image">Imagen no disponible</div>
                                    )}
                                </div>

                                <div className="observation-info">
                                    <p className="common-name" onClick={() => navigate(`/birds/${bird.id}`)} >
                                        {bird.spanish_commonName}
                                    </p>
                                    <p className="scientific-name" onClick={() => navigate(`/birds/${bird.id}`)} >
                                        {bird.scientificName}
                                    </p>
                                    <div className='status-bird-information'>
                                        <p className="meta">{bird.conservationStatus}</p>
                                        <p className="meta_status">
                                            {Array.isArray(bird.status) ? bird.status.join(', ') : bird.status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron aves.</p>
                    )}
                </div>
            )}


            {!search && totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            )}

        </>
    );
}