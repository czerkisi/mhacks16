import React from 'react';
import { Property } from "../../store/slices/propertiesSlice";
import './PropertyPreview.css';
import { useAppDispatch } from "../../store/hooks";
import { selectProperty } from "../../store/slices/filterSlice";
import VisualGrade from "../VisualGrade/VisualGrade";

interface PropertyPreviewProps {
    property: Property;
}

const PropertyPreview: React.FC<PropertyPreviewProps> = (props) => {
    const property = props.property;
    const dispatch = useAppDispatch();

    function selectThisProperty() {
        dispatch(selectProperty(property));
    }

    return (
        <div className={'property-preview-container'} onClick={selectThisProperty}>
            <div className={'property-preview'}>
                <span className={'property-title'}>{`${property.title}`}</span>
                <span className={'property-address'}>{`${property.address}`}</span>
                <span className={'property-type'}>{`${property.type}`}</span>
            </div>
            <VisualGrade grade={property.score}/>
        </div>
    );
};

export default PropertyPreview;