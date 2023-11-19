import React, { useState } from 'react';
import './PropertyPanel.css';
import {Property} from "../../store/slices/propertiesSlice";

interface PropertyPanelProps {
    clearProperty: () => void;
    increment: () => void;
    decrement: () => void;
    property: Property;
    index: number;
    maxIndex: number;
}

const PropertyPanel: React.FC<PropertyPanelProps> = (props) => {
    const property = props.property;
    return (
        <div className="property-panel-container">
            <button className="close-button" onClick={props.clearProperty}>
                X
            </button>

            <button className="arrow-button left" onClick={props.decrement} disabled={props.index <= 0}>
                {'<'}
            </button>

            <button className="arrow-button right" onClick={props.increment} disabled={props.index >= props.maxIndex - 1}>
                {'>'}
            </button>

            <div className="content">
                <p>{`Property: ${property.title}`}</p>
            </div>
        </div>
    );
};

export default PropertyPanel;
