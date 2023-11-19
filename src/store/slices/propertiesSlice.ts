import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {shuffleArray} from "../../components/List/List";

export interface Property {
    uid: string;
    title: string;
    latitude: number;
    longitude: number;
    type: string;
    address: string;
    score: number;
    totalghg: number;
    siteEui: number;
    sourceEui: number;
    waterUse: number;
    percentElecOnsite: number;
    energyStar: number;
}

interface ScoreResponse {
    'Distance': number;
    'Normalized Sustainability Score': number
    'Property Id': number
}

export async function getPropertiesByAddressOnly(address: string){
    // running out of time again
    const searchSize = localStorage.getItem('searchSize');
    if (searchSize){
        return getPropertiesByAddress(address, parseInt(searchSize));
    } else {
        return [];
    }
}

export function curveGrade(originalGrade: number){
    const curveFactor = 100 / 53;
    return Math.min(originalGrade * curveFactor, 100);
}

export function calculateGrade(score: number){
    if (score >= 90) {
        return 'A+';
    } else if (score >= 85) {
        return 'A';
    } else if (score >= 80) {
        return 'A-';
    } else if (score >= 75) {
        return 'B+';
    } else if (score >= 70) {
        return 'B';
    } else if (score >= 65) {
        return 'B-';
    } else if (score >= 60) {
        return 'C+';
    } else if (score >= 55) {
        return 'C';
    } else if (score >= 50) {
        return 'C-';
    } else if (score >= 45) {
        return 'D+';
    } else if (score >= 40) {
        return 'D';
    } else {
        return 'F';
    }
}

export async function getPropertiesByAddress(address: string, count: number) {
    const requestBody = {
        location: address,
        k: count,
    };

    try {
        const response = await axios.post('/score', requestBody);
        const scoreData = response.data;
        const nyGovEndpoint = 'https://data.cityofnewyork.us/resource/usc3-8zwd.json';

        const promises = scoreData.map(async (entry: ScoreResponse) => {
            try {
                const nyGovResponse = await axios.get(nyGovEndpoint, {
                    params: {
                        property_id: entry['Property Id']
                    }
                });

                const data = nyGovResponse.data[0];
                console.log('break');
                const newProperty: Property = {
                    energyStar: data['energy_star_score'],
                    percentElecOnsite: data['percent_of_total_electricity_generated_from_onsite_renewable_systems'],
                    siteEui: data['site_eui_kbtu_ft'],
                    sourceEui: data['source_eui_kbtu_ft'],
                    totalghg: data['total_ghg_emissions_metric_tons_co2e'],
                    waterUse: data['water_use_all_water_sources_kgal'],
                    address: data['address_1'],
                    latitude: data['latitude'],
                    longitude: data['longitude'],
                    title: data['property_name'],
                    type: data['primary_property_type_self_selected'],
                    uid: data['property_id'],
                    score: entry['Normalized Sustainability Score']
                };
                return newProperty;
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        });

        const propertyArray = await Promise.all(promises);
        return propertyArray.filter(property => property !== null) as Property[];
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
}

interface PropertiesState {
    allProperties: Property[];
    selectedProperties: Property[]; // Array of selected Properties
    shuffledProperties: Property[];
}

const initialState: PropertiesState = {
    allProperties: [],
    selectedProperties: [],
    shuffledProperties: [],
};

const PropertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        setSelectedProperties: (state, action: PayloadAction<Property[]>) => {
            state.selectedProperties = action.payload;
        },
        setShuffledProperties: (state, action: PayloadAction<Property[]>) => {
            state.shuffledProperties = action.payload;
        },
        addProperty: (state, action: PayloadAction<Property>) => {
            if (!state.allProperties.some(property => property.uid === action.payload.uid)){
                state.allProperties.push(action.payload);
            }
        },
        removeProperty: (state, action: PayloadAction<string>) => {
            state.allProperties = state.allProperties.filter((Property) => Property.uid !== action.payload);
            state.selectedProperties = state.selectedProperties.filter((Property) => Property.uid !== action.payload);
        },
        setAllShuffled: (state, action: PayloadAction) => {
            state.shuffledProperties = shuffleArray(state.allProperties)
        }
    },
});

// Export the actions generated by createSlice
export const { setSelectedProperties, addProperty, removeProperty, setShuffledProperties, setAllShuffled } = PropertiesSlice.actions;

// Export the reducer generated by createSlice
export default PropertiesSlice.reducer;
