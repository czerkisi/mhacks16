import { TileLayer , MapContainer , Marker , Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import './Map.css';


export default function Map() {
    return (
        <MapContainer center={[40.69816148071831, -73.93802961687618]} zoom={ 11 } scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[34.0522, -118.2437]}>
                <Popup>
                    Los Angeles
                </Popup>
            </Marker>
        </MapContainer>
    )
}