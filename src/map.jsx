import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { useMap, useMapEvent } from 'react-leaflet/hooks';
import { Marker } from 'react-leaflet/Marker';

import { useState, useEffect } from 'react';

import 'leaflet/dist/leaflet.css';

// clear out leaflet's default map icon (using one in CSS instead)
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
import icon2x from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon from 'leaflet/dist/images/marker-icon.png';
L.Icon.Default.mergeOptions({
    iconRetinaUrl: icon2x,
    iconUrl: icon,
    shadowUrl: iconShadow,
});

function MapEvents({ onPositionChange, lat, lng }) {
    const [position, setPosition] = useState({ lat, lng });
    const map = useMap();
    useMapEvent('click', (e) => {
        setPosition(e.latlng);
        onPositionChange(e.latlng);
    });

    useEffect(() => {
        map.setView([lat, lng]);
        setPosition({ lat, lng });
    }, [lat, lng])

    if (!position) {
        return <></>;
    }

    return <Marker position={position}></Marker>
}

export function Map({ lat = 51.477936, lng = -0.001471, onPositionChange }) {
    return (
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents onPositionChange={onPositionChange} lat={lat} lng={lng} />
        </MapContainer>
    );
}