// FilterSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    addProperty,
    getPropertiesByAddress, getPropertiesByAddressOnly,
    Property, setAllShuffled,
    setSelectedProperties,
    setShuffledProperties
} from "./propertiesSlice";
import axios from "axios";
import store from "../store";
import {shuffleArray} from "../../components/List/List";

// Define the initial state for the Filter slice
interface FilterState {
    address: string;
    selectedProperty: Property | null;
    pageSize: number;
    searchSize: number;
    typeFilter: string;
}

const initialState: FilterState = {
    address: '',
    selectedProperty: null,
    pageSize: 25,
    searchSize: 10,
    typeFilter: ''
};

// Create the Filter slice using createSlice
const filterSlice = createSlice({
    name: 'Filter',
    initialState,
    reducers: {
        // Define a reducer to update the Filter value
        setAddress: (state, action: PayloadAction<string>) => {
            const address = action.payload;
            state.address = address;
            state.typeFilter = 'Building Type';
            getPropertiesByAddressOnly(address).then(properties => {
                properties.forEach(property => {
                    store.dispatch(addProperty(property));
                });
                setTimeout(() => {
                    store.dispatch(setSelectedProperties(properties));
                }, 20)
            });
        },
        selectProperty: (state, action: PayloadAction<Property | null>) => {
            state.selectedProperty = action.payload;
        },
        clearFilters: (state, action: PayloadAction) => {
            state.address = '';
            state.selectedProperty = null;
            setTimeout(() => {
                store.dispatch(setAllShuffled());
            })
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
        },
        setSearchSize: (state, action: PayloadAction<number>) => {
            state.searchSize = action.payload;
            localStorage.setItem('searchSize', `${action.payload}`);
        },
        setTypeFilter: (state, action: PayloadAction<string>) => {
            state.typeFilter = action.payload;
        }
    },
});

// Export the action creator
export const { setAddress, selectProperty, clearFilters, setSearchSize, setPageSize, setTypeFilter } = filterSlice.actions;

// Export the reducer
export default filterSlice.reducer;
