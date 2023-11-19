import {TileLayer, MapContainer, useMap} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import './Map.css';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import L, { LatLngExpression } from 'leaflet';
import CustomPin from "../CustomPin/CustomPin";

function CustomMap() {
    const pins = useAppSelector(state => state.pins.selectedPins);
    const map = useMap();

    // Convert pin coordinates to LatLngExpression[]
    const pinLatLngs: LatLngExpression[] = pins.map(pin => [pin.latitude, pin.longitude]);

    // Create a LatLngBounds object from pin coordinates
    const bounds = L.latLngBounds(pinLatLngs);

    // Fit the map to the bounds of all pins
    map.fitBounds(bounds);

    return null; // This component doesn't render anything, it just manages the map state
}

function Map() {
    const pins = useAppSelector(state => state.pins.selectedPins);

    return (
        <MapContainer center={[40.69816148071831, -73.93802961687618]} zoom={11} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {pins.map((pin) => (
                <CustomPin
                    key={pin.uid}
                    position={[pin.latitude, pin.longitude]}
                    onClick={() => console.log("Pin clicked!")}
                />
            ))}

            {/* Include the CustomMap component */}
            <CustomMap />
        </MapContainer>
    );
}

export default Map;