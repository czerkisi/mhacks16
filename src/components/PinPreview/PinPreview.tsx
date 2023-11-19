import {Pin} from "../../store/slices/pinsSlice";
import './PinPreview.css';

interface PinPreviewProps{
    pin: Pin;
}

export default function PinPreview(props: PinPreviewProps){
    const pin = props.pin
    return (
        <div className={'pin-preview'}>
            <span>{`Name: ${pin.title}`}</span>
            <span>{`Latitude: ${pin.latitude}`}</span>
            <span>{`Longitude: ${pin.longitude}`}</span>
        </div>
    );
}