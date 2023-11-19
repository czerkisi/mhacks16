import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios/index";

export interface Property {
    uid: string;
    title: string;
    latitude: number;
    longitude: number;
    type: string;
    address: string;
}

export async function getPropertiesByAddress(address: string, count: number){
    const properties: Property[] = [];

    const getScoreBody = {
        location: address,
        k: count,
    };
    axios.post('/score', getScoreBody)
        .then(response => {
            const data = response.data;
            console.log('Response:', response.data);

            const nyGovEndpoint = 'https://data.cityofnewyork.us/resource/usc3-8zwd.json';

            const nyGovBody = {
                property_id: 7365,
            }

            axios.post(nyGovEndpoint, nyGovBody)
                .then(response => {
                    const data = response.data;
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    });
}

interface PropertiesState {
    allProperties: Property[];
    selectedProperties: Property[]; // Array of selected Properties
}

const initialState: PropertiesState = {
    allProperties: [],
    selectedProperties: [],
};

const PropertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        setSelectedProperties: (state, action: PayloadAction<Property[]>) => {
            state.selectedProperties = action.payload;
        },
        addProperty: (state, action: PayloadAction<{ title: string; latitude: number; longitude: number; address: string; type: string; }>) => {
            const newProperty: Property = {
                uid: uuidv4(),
                ...action.payload,
            };
            state.allProperties.push(newProperty);
        },
        removeProperty: (state, action: PayloadAction<string>) => {
            state.allProperties = state.allProperties.filter((Property) => Property.uid !== action.payload);
            state.selectedProperties = state.selectedProperties.filter((Property) => Property.uid !== action.payload);
        },
    },
});

// Export the actions generated by createSlice
export const { setSelectedProperties, addProperty, removeProperty } = PropertiesSlice.actions;

// Export the reducer generated by createSlice
export default PropertiesSlice.reducer;
