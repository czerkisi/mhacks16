import React, { useState } from 'react';
import './AddressSearch.css';
import axios from 'axios';
import {useAppDispatch} from "../../store/hooks";
import {setAddress} from "../../store/slices/filterSlice";

interface AddressResult {
    place_id: string;
    display_name: string;
    lat: number;
    lon: number;
}

interface Nominatim_Params_Interface {
    q: string;
    format: 'json';
    addressdetails: 1;
    limit: 3;
    bounded: 1;
    viewbox: '-74.25,41.0833,-73.1833,40.4833';
}

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_PARAMS: Nominatim_Params_Interface = {
    q: '',
    format: 'json',
    addressdetails: 1,
    limit: 3,
    bounded: 1,
    viewbox: '-74.25,41.0833,-73.1833,40.4833',
};

const AddressSearch: React.FC = () => {
    const [searchAddress, setSearchAddress] = useState('');
    const [results, setResults] = useState<AddressResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAddress = event.target.value;
        setSearchAddress(newAddress);

        if (newAddress.length > 1) {
            setIsLoading(true);
            axios
                .get(NOMINATIM_URL, {
                    params: {
                        ...NOMINATIM_PARAMS,
                        q: newAddress,
                    },
                })
                .then((response) => {
                    setIsLoading(false);
                    const newResults = response.data as AddressResult[];
                    setResults(newResults);
                });
        } else {
            setResults([]);
        }
    };

    const handleSelectResult = (result: AddressResult) => {
        setSearchAddress('');
        dispatch(setAddress(result.display_name));
        setResults([]);
    };

    function submitAddress(){
        if (searchAddress && searchAddress.length > 0){
            dispatch(setAddress(searchAddress));
            setSearchAddress('');
        }
    }

    return (
        <div className="address-search">
            <input
                type="text"
                className="address-input"
                value={searchAddress}
                onChange={handleInputChange}
                placeholder="Enter an address..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevents the default behavior
                        submitAddress();
                    }
                }}
            />
            {/*<button onClick={submitAddress}>Search</button>*/}
            <div className="results-list">
                {isLoading &&
                    <span className={'loading'}>Loading...</span>
                }
                {!isLoading && searchAddress.length > 0 &&
                    results.map((result: AddressResult) => (
                            <div
                                key={result.place_id}
                                className="result-item"
                                onClick={() => handleSelectResult(result)}
                            >
                                {result.display_name}
                            </div>
                        ))}
                {!isLoading && searchAddress.length > 1 && results.length === 0 &&
                    <span className={'no-suggestions'}>No Suggestions, Click Enter to Search</span>
                }
            </div>
        </div>
    );
};

export default AddressSearch;
