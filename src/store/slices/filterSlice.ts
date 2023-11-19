// FilterSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Property} from "./propertiesSlice";

// Define the initial state for the Filter slice
interface FilterState {
    address: string;
    filterLoading: boolean;
    selectedProperty: Property | null;
}

const initialState: FilterState = {
    address: '',
    filterLoading: false,
    selectedProperty: null,
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
            state.filterLoading = true;
            // fetch request
            //.then()
            state.filterLoading = false;
        },
        selectProperty: (state, action: PayloadAction<Property>) => {
            state.selectedProperty = action.payload;
            console.log('also selecting');
        }
    },
});

// Export the action creator
export const { setAddress, selectProperty } = filterSlice.actions;

// Export the reducer
export default filterSlice.reducer;
