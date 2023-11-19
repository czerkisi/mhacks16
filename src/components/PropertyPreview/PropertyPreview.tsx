import {Property} from "../../store/slices/propertiesSlice";
import './PropertyPreview.css';
import {useAppDispatch} from "../../store/hooks";
import {selectProperty} from "../../store/slices/filterSlice";

interface PropertyPreviewProps{
    property: Property;
}

export default function PropertyPreview(props: PropertyPreviewProps){
    const property = props.property;
    const dispatch = useAppDispatch();

    function selectThisProperty(){
        dispatch(selectProperty(property));
    }

    return (
        <div className={'property-preview'} onClick={selectThisProperty}>
            <span>{`Name: ${property.title}`}</span>
            <span>{`Latitude: ${property.latitude}`}</span>
            <span>{`Longitude: ${property.longitude}`}</span>
        </div>
    );
}