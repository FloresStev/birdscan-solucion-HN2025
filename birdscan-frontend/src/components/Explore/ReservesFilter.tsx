import { useEffect, useState } from 'react';
import './ReservesFilter.css'
import api from '../../api/api';
import { useNavigate } from 'react-router';
import axios from 'axios';

export function ReservesFilter() {
    const [types, setTypes] = useState<string[]>([]);
    const [municipalities, setMunicipalities] = useState<string[]>([])
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');
    const [selectedMunicipality, setSelectedMunicipality] = useState('');

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [typeRes, municipalitiesRes] = await Promise.all([
                    axios.get<string[]>(`${api.defaults.baseURL}/api/naturalreserves/types`),
                    axios.get<string[]>(`${api.defaults.baseURL}/api/naturalreserves/municipalities`),
                ]);
                setTypes(typeRes.data);
                setMunicipalities(municipalitiesRes.data);
            } catch (error) {
                console.error("Error al cargar fitros:", error);
            }
        };
        fetchFilters();
    }, []);

    return (
        <>
            <div className="filters-container">
                <select
                    value={selectedType}
                    onChange={(e) => {
                        setSelectedType(e.target.value);
                        navigate(`?filter=type&type=${e.target.value}`);
                    }}
                >
                    <option value="">Todos los tipos</option>
                    {types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>

                <select
                    value={selectedMunicipality}
                    onChange={(e) => {
                        setSelectedMunicipality(e.target.value);
                        navigate(`?filter=municipality&municipality=${e.target.value}`);
                    }}
                >
                    <option value="">Todos los municipios</option>
                    {municipalities.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>
        </>
    )

}