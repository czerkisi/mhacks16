import { Marker, Popup } from "react-leaflet";
import pinImage from '../../media/pin.png';
import L from "leaflet";

interface CustomPinProps {
    position: [number, number];
    onClick?: () => void;
}

export default function CustomPin(props: CustomPinProps){
    const onClick = props.onClick;
    const position = props.position;

    const customIcon = new L.Icon({
        iconUrl: pinImage,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    return (
        <Marker position={position} icon={customIcon} eventHandlers={{ click: onClick }}>
            <Popup>
                <div>
                    <h1>ESG Score</h1>
                    <p>10/10</p>
                </div>
            </Popup>
        </Marker>
    );
};