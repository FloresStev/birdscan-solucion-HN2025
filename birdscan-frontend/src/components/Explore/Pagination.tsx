import "./Pagination.css";
export function Pagination( {page, totalPages, setPage}: {page: number; totalPages: number; setPage: (p: number) => void}) {
    const visiblePages = 10;
    const start = Math.max(1, page - Math.floor(visiblePages / 2));
    const end = Math.min(totalPages, start + visiblePages - 1);

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (

        <div className = 'pagination'>
            <button onClick = {() => setPage(page - 1)} disabled={page === 1}>←</button>
            {pages.map((p) => (
                <button key={p} onClick={() => setPage(p)} className = {p === page ? 'active' : ''}>
                    {p}
                </button>
            ))}
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>→</button>
        </div>
    );
}