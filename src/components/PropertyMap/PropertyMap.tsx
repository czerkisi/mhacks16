import { TileLayer, MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './Map.css';
import { useAppSelector } from "../../store/hooks";
import L, { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from "react";
import CustomPropertyPin from "../CustomPropertyPin/CustomPropertyPin";

function CustomMap({ properties }: { properties: Property[] }) {
    const map = useMap();

    // Convert property coordinates to LatLngExpression[]
    const propertyLatLngs: LatLngExpression[] = properties.map(property => [property.latitude, property.longitude]);

    // Create a LatLngBounds object from property coordinates
    const bounds = L.latLngBounds(propertyLatLngs);

    // Fit the map to the bounds of all properties when it's ready
    useEffect(() => {
        map.whenReady(() => {
            if (bounds.isValid()){
                map.fitBounds(bounds);
            }
        });
    }, [map, bounds]);

    return null; // This component doesn't render anything, it just manages the map state
}

interface Property {
    uid: string;
    latitude: number;
    longitude: number;
}

function PropertyMap() {
    const properties = useAppSelector(state => state.properties.selectedProperties);
    const selectedProperty = useAppSelector(state => state.filter.selectedProperty);
    const selectedProperties = useAppSelector(state => state.properties.selectedProperties);
    const shuffledProperties = useAppSelector(state => state.properties.shuffledProperties);
    const initialPosition: [number, number] = [40.69816148071831, -73.93802961687618];
    const initialZoom = 11;
    const [position, setPosition] = useState<[number, number]>(initialPosition);
    const [zoom, setZoom] = useState(initialZoom);
    // I realize using a counter to force the map is extremely janky and not recommended
    // We're on a time limit and loading the map is difficult
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (!selectedProperty) {
            setPosition(initialPosition);
            setZoom(initialZoom);
        } else {
            const newPosition: [number, number] = [selectedProperty.latitude, selectedProperty.longitude];
            setPosition(newPosition);
            setZoom(19);

            setTimeout(() => {
                setCounter(counter + 1);
            }, 25);
        }
    }, [selectedProperty]);

    useEffect(() => {
        setTimeout(() => {
            setCounter(counter + 1);
        }, 25);
    }, [shuffledProperties, selectedProperties]);

    return (
        <MapContainer key={counter} center={position} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {properties.map((property) => (
                <CustomPropertyPin
                    key={property.uid}
                    property={property}
                    onClick={() => console.log("Property clicked!")}
                />
            ))}

            {selectedProperty === null ? (
                <CustomMap properties={properties} />
            ) : null}
        </MapContainer>
    );
}

export default PropertyMap;
