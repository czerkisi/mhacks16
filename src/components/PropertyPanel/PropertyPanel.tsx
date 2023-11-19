import React, { useState } from 'react';
import './PropertyPanel.css';
import {calculateGrade, curveGrade, Property} from "../../store/slices/propertiesSlice";

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

            <div className="panel-content">
                <h3><strong>{`Selected Property:`}</strong> {property.title}</h3>
                <h1>Primary Info</h1>
                <span><strong>{`Address:`}</strong> {property.address}</span>
                <span><strong>{`Type:`}</strong> {property.type}</span>
                <span><strong>{`Unique ID:`}</strong> {property.uid}</span>
                <span><strong>{`Coordinates:`}</strong> [{property.latitude}, {property.longitude}]</span>
                <h1>Weighting Info</h1>
                <span><strong>{`Energy Star Score:`}</strong> {property.energyStar}</span>
                <span><strong>{`Percent of Electricity Used that's Generated on Site:`}</strong> {property.percentElecOnsite}</span>
                <span><strong>{`Site EUI in kBTU/sqft:`}</strong> {property.siteEui}</span>
                <span><strong>{`Source EUI in kBTU/sqft:`}</strong> {property.sourceEui}</span>
                <span><strong>{`Total Green House Gas Emissions in Metric Tons:`}</strong> {property.totalghg}</span>
                <span><strong>{`ESG Score:`}</strong> {curveGrade(property.score).toFixed(2)} ({calculateGrade(curveGrade(property.score))})</span>
                <br/>
                <span>Data courtesy of https://data.cityofnewyork.us/Environment/Energy-and-Water-Data-Disclosure-for-Local-Law-84-/usc3-8zwd</span>
            </div>

        </div>
    );
};

export default PropertyPanel;
