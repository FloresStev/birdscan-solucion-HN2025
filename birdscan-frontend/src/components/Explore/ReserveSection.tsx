import "./ReserveSection.css";
import axios from 'axios';
import api, { type Reserve } from "../../api/api"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "./Pagination";
import { ReservesFilter } from "./ReservesFilter";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ReserveSection() {

    const query = useQuery();
    const filter = query.get('filter') || 'all';
    const navigate = useNavigate();


    const [naturalReserves, setNaturalReverves] = useState<Reserve[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 20;

    const search = query.get('search') || '';
    const municipality = query.get('municipality') || '';
    const type = query.get('type') || '';

    useEffect(() => {
        const fetchReserves = async () => {
            setLoading(true);

            const endpoint = search
                ? `/api/naturalreserves/search?q=${encodeURIComponent(search)}`
                : filter === 'type'
                    ? `/api/naturalreserves/by-type?type=${encodeURIComponent(type)}&page=${page}&limit=${limit}`
                    : filter === 'municipality'
                        ? `/api/naturalreserves/by-municipality?municipality=${encodeURIComponent(municipality)}&page=${page}&limit=${limit}`
                        : `/api/naturalreserves/all?page=${page}&limit=${limit}`;
            try {
                const res = await axios.get<{ message: String; data: Reserve[]; totalPages?: number }>(
                    `${api.defaults.baseURL}${endpoint}`
                );

                const reservesData = res.data?.data;
                setNaturalReverves(Array.isArray(reservesData) ? reservesData : []);

                if (res.data.totalPages && !search) {
                    setTotalPages(res.data.totalPages);
                }

                await new Promise((resolve) => setTimeout(resolve, 800));

            } catch (error) {
                console.error(error);
                setNaturalReverves([]);
            } finally {
                setLoading(false);
            }
        }; ''

        fetchReserves();

    }, [filter, page, search, municipality, type]);


    return (
        <>
            <h2 className='h2-tittle-reserves'>

            </h2>

            <ReservesFilter />

            {loading && (
                <div className="Loading container">
                    <p className="loading-text">
                        Cargando reservas naturales...
                    </p>
                </div>
            )}

            {!loading && (
                <div className="catalog-grid">
                    {naturalReserves.length > 0 ? (
                        naturalReserves.map((naturalReserves) => (
                            <div key={naturalReserves.id} className="observation-card">
                                <div key={naturalReserves.id} className="observation-card">
                                    <div className="observation-image">
                                        {naturalReserves.images?.length > 0 ? (
                                            <img
                                                src={`${api.defaults.baseURL}/reserves_images/${encodeURIComponent(naturalReserves.images[0].trim())}`}
                                                alt={naturalReserves.name}
                                                onClick={() => navigate(`/naturalreserves/${naturalReserves.id}`)}
                                            />
                                        ) : (
                                            <div className="no-image">Imagen no disponible</div>
                                        )}
                                    </div>
                                </div>

                                <div className="observation-info">
                                    <p className="common-name" onClick={() => navigate(`/naturalreserves/${naturalReserves.id}`)} >
                                        {naturalReserves.name}
                                    </p>
                                    <div className='status-bird-information'>
                                        <p className="meta">{naturalReserves.protected_area_type}</p>
                                        <p className="meta_status">
                                            {naturalReserves.municipality}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron reservas naturales.</p>
                    )}
                </div>
            )}


            {!search && totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            )}
        </>

    )



}