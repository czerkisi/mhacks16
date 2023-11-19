import { Marker, Popup } from "react-leaflet";
import buildingImage from '../../media/building.png';
import hospitalImage from '../../media/hospital.png';
import hotelImage from '../../media/hotel.png';
import officeImage from '../../media/office.png';
import schoolImage from '../../media/school.png';
import storeImage from '../../media/store.png';

import L from "leaflet";
import {Property} from "../../store/slices/propertiesSlice";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../store/hooks";
import './CustomPropertyPin.css';

interface CustomPropertyProps {
    property: Property;
    onClick?: () => void;
}

export default function CustomPropertyPin(props: CustomPropertyProps){
    const property = props.property;
    const selectedProper = useAppSelector(state => state.filter.selectedProperty);
    const onClick = props.onClick;
    const position = L.latLng([property.latitude, property.longitude]);
    const [image, setImage] = useState(buildingImage);

    const customIcon = new L.Icon({
        iconUrl: image,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    useEffect(() => {
        if (props.property.type.toLowerCase().includes('hospital')){
            setImage(hospitalImage);
        } else if (props.property.type.toLowerCase().includes('hotel')){
            setImage(hotelImage);
        } else if (props.property.type.toLowerCase().includes('office')){
            setImage(officeImage);
        } else if (props.property.type.toLowerCase().includes('school')){
            setImage(schoolImage);
        } else if (props.property.type.toLowerCase().includes('store')){
            setImage(storeImage);
        } else {
            setImage(buildingImage);
        }
    }, [props.property]);

    return (
        <Marker position={position} icon={customIcon} eventHandlers={{ click: onClick }}>
            <Popup>
                <div className={'popup-div'}>
                    <span className={'popup-title'}>{property.title}</span>
                </div>
            </Popup>
        </Marker>
    );
};