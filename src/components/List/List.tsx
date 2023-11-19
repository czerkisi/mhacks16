import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {ChangeEvent, useEffect, useState} from "react";
import {
    addProperty,
    getPropertiesByAddress,
    Property,
    setSelectedProperties,
    setShuffledProperties
} from "../../store/slices/propertiesSlice";
import PropertyPreview from "../PropertyPreview/PropertyPreview";
import './List.css';
import {clearFilters, selectProperty, setPageSize, setSearchSize} from "../../store/slices/filterSlice";
import PropertyPanel from "../PropertyPanel/PropertyPanel";
import {type} from "os";
import TypeFilter from "../TypeFilter/TypeFilter";

export function shuffleArray(array: any[]): any[] {
    const shuffledArray = array.slice(); // Create a copy of the original array

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap shuffledArray[i] and shuffledArray[j]
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

export default function List(){
    const dispatch = useAppDispatch();
    const allProperties = useAppSelector(state => state.properties.allProperties);
    const selectedProperties = useAppSelector(state => state.properties.selectedProperties);
    const selectedProperty = useAppSelector(state => state.filter.selectedProperty);
    const shuffledProperties = useAppSelector(state => state.properties.shuffledProperties)
    const enteredAddress = useAppSelector(state => state.filter.address);
    const pageSize = useAppSelector(state => state.filter.pageSize);
    const searchSize = useAppSelector(state => state.filter.searchSize);
    const typeFilter = useAppSelector(state => state.filter.typeFilter);
    const [pageIndex, setPageIndex] = useState(0);
    const [maxPageIndex, setMaxPageIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // Populate with 100 properties in Manhattan to start
    useEffect(() => {
        getPropertiesByAddress('Manhattan', 100).then(initialProperties => {
            initialProperties.forEach(property => {
                dispatch(addProperty(property));
            });
        });
        localStorage.setItem('searchSize', '10');
    }, []);

    useEffect(() => {
        let filteredShuffled = shuffledProperties.slice();
        if (typeFilter !== 'Building Type'){
            filteredShuffled = filteredShuffled.filter(property => property.type.toLowerCase().includes(typeFilter.toLowerCase()));
        }
        const selected = filteredShuffled.slice(pageIndex * pageSize, Math.min(allProperties.length, (pageIndex + 1) * pageSize));
        dispatch(setSelectedProperties(selected));
    }, [shuffledProperties, pageIndex, pageSize, typeFilter]);

    useEffect(() => {
        setMaxPageIndex(Math.floor(allProperties.length / pageSize));
        setPageIndex(0);
        dispatch(setShuffledProperties(shuffleArray(allProperties)))
    }, [allProperties]);

    useEffect(() => {
        if (selectedProperty){
            const index = selectedProperties.findIndex(property => property.uid === selectedProperty.uid);
            setSelectedIndex(index);
        } else {
            setSelectedIndex(-1);
        }

    }, [selectedProperty]);

    function increment(){
        dispatch(selectProperty(selectedProperties[selectedIndex + 1]));
    }

    function decrement(){
        dispatch(selectProperty(selectedProperties[selectedIndex - 1]));
    }

    function clearSelected(){
        dispatch(selectProperty(null));
    }

    function incrementPage(){
        setPageIndex(pageIndex + 1);
    }

    function decrementPage(){
        setPageIndex(pageIndex - 1);
    }

    function clearFiltersInvoke(){
        dispatch(clearFilters())
    }

    function isValidIntAndNotEmpty(value:string) {
        if (value === ''){
            return true;
        }
        // Check if the value is not empty or undefined
        if (value !== null && value !== undefined) {
            // Check if the value is an integer
            return !isNaN(parseInt(value, 10)) && parseInt(value, 10) > 0;
        }
        return false;
    }

    const handlePageSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isValidIntAndNotEmpty(event.target.value)){
            const newSize = event.target.value === '' ? 1 : parseInt(event.target.value, 10);
            dispatch(setPageSize(newSize));
        }
    };

    const handleSearchSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isValidIntAndNotEmpty(event.target.value)){
            const newSize = event.target.value === '' ? 1 : parseInt(event.target.value, 10);
            dispatch(setSearchSize(newSize));
        }
    };

    return (
        <div className={'fill-height'}>
            {selectedProperty ?
                <PropertyPanel key={`${selectedProperty.uid}-${selectedIndex}`} clearProperty={clearSelected} decrement={decrement} increment={increment} index={selectedIndex} maxIndex={selectedProperties.length} property={selectedProperty}/>
            :
                <div>
                    <div className={'filters'}>
                        <button onClick={clearFiltersInvoke} className={'clear-button'}>Clear Filters</button>
                        <div>
                            <span>Page Size</span>
                            <input type={'number'} value={pageSize} onChange={handlePageSizeChange} placeholder={'Page Size'}/>
                        </div>
                        <div>
                            <span>Search Size</span>
                            <input type={'number'} value={searchSize} onChange={handleSearchSizeChange} placeholder={'Search Size'}/>
                        </div>
                        <TypeFilter/>
                    </div>

                    {enteredAddress && enteredAddress.length > 0 &&
                        <span className={'search-results-label'}>{`Search Results for "${enteredAddress}"`}</span>
                    }
                    <div className={'property-list'}>
                        {selectedProperties.map(property => {
                                return <PropertyPreview key={property.uid} property={property}/>;
                            }
                        )}
                        {pageIndex !== maxPageIndex && selectedProperties.length > 0 &&
                            <button onClick={incrementPage} className={'clear-button'}>{'>'}</button>
                        }
                        {pageIndex > 0 && selectedProperties.length > 0 &&
                            <button onClick={decrementPage} className={'clear-button'}>{'<'}</button>
                        }
                    </div>
                </div>
            }
        </div>
    );
}