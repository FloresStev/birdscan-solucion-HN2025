// src/components/BirdFilterButtons.tsx
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGlobeAmericas, FaDove, FaHome, FaExchangeAlt } from 'react-icons/fa';
import './BirdFilterButtons.css';

type Props = {
    context: 'general' | 'endangered';
};

export function BirdFilterButtons({ context }: Props) {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const filter = query.get('filter') || 'all';
    const status = query.get('status') || '';

    return (
        <div className="filter-buttons">
            {context === 'general' ? (
                <>
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => navigate('/birds?filter=all')}
                    >
                        <FaGlobeAmericas /> Todas
                    </button>
                    <button
                        className={filter === 'migratory' ? 'active' : ''}
                        onClick={() => navigate('/birds?filter=migratory')}
                    >
                        <FaDove /> Migratorias
                    </button>
                    <button
                        className={filter === 'resident' ? 'active' : ''}
                        onClick={() => navigate('/birds?filter=resident')}
                    >
                        <FaHome /> Residentes
                    </button>
                    <button
                        className={filter === 'mixed' ? 'active' : ''}
                        onClick={() => navigate('/birds?filter=mixed')}
                    >
                        <FaExchangeAlt style={{ marginRight: '8px' }} />
                        Aves mixtas
                    </button>




                </>
            ) : (
                <>
                    <button
                        className={!status ? 'active' : ''}
                        onClick={() => navigate('/birds?filter=endangered')}
                    >
                        <FaGlobeAmericas /> Todas
                    </button>
                    <button
                        className={status === 'R' ? 'active' : ''}
                        onClick={() => navigate('/birds?filter=endangered&status=R')}
                    >
                        <FaHome /> Residentes
                    </button>
                    <button
                        className={status === 'M,MP,S,P/S' ? 'active' : ''}
                        onClick={() => navigate('/birds?filter=endangered&status=M,MP,S,P/S')}
                    >
                        <FaDove /> Migratorias
                    </button>
                </>
            )}
        </div>
    );
}