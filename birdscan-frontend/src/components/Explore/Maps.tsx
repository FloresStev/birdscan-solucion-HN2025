import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { GeoJsonObject } from 'geojson';

type Props = {
    geoJsonData: GeoJsonObject;
};



export function Maps({ geoJsonData }: Props) {
    return (
        <>
            <MapContainer center={[12.1, -86.3]}
                zoom={7}
                style={{ height: '100%', width: '100%' }} >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <GeoJSON data={geoJsonData}
                style={() => ({
                    color: '#228B22',
                    weight: 2,
                    fillOpacity: 0.5,
                })} />
            </MapContainer>
        </>
    );
}
