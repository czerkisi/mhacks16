import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MoveableMap: React.FC = () => {
    const mapRef = useRef<typeof MapContainer>(null);
    const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 37.7749, lng: -122.4194 });
    const [zoom, setZoom] = useState(13);

    const handleMarkerDragEnd = (event: Leaflet.LeafletMouseEvent) => {
        const { lat, lng } = event.target.getLatLng();
        setCenter({ lat, lng });
    };

    return (
        <MapContainer ref={mapRef} center={center} zoom={zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center} draggable={true} onDragend={handleMarkerDragEnd}>
                <Popup>
                    This is a moveable marker. You can drag and drop it to change its location.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MoveableMap;
