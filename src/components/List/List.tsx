import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import {setSelectedProperties} from "../../store/slices/propertiesSlice";
import PropertyPreview from "../PropertyPreview/PropertyPreview";
import './List.css';
import {selectProperty} from "../../store/slices/filterSlice";
import PropertyPanel from "../PropertyPanel/PropertyPanel";

export default function List(){
    const dispatch = useAppDispatch();
    const pageSize = 25;
    const allProperties = useAppSelector(state => state.properties.allProperties);
    const selectedProperties = useAppSelector(state => state.properties.selectedProperties);
    const selectedProperty = useAppSelector(state => state.filter.selectedProperty);
    const enteredAddress = useAppSelector(state => state.filter.address);
    const [pageIndex, setPageIndex] = useState(0);
    const [maxPageIndex, setMaxPageIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        const selected = allProperties.slice(pageIndex * pageSize, Math.min(allProperties.length, (pageIndex + 1) * pageSize));
        dispatch(setSelectedProperties(selected));
    }, [allProperties, pageIndex]);

    useEffect(() => {
        setMaxPageIndex(Math.floor(allProperties.length / pageSize));
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

    return (
        <div className={'fill-height'}>
            {selectedProperty ?
                <PropertyPanel key={`${selectedProperty.uid}-${selectedIndex}`} clearProperty={clearSelected} decrement={decrement} increment={increment} index={selectedIndex} maxIndex={selectedProperties.length} property={selectedProperty}/>
            :
                <div>
                    {enteredAddress && enteredAddress.length > 0 &&
                        <span className={'search-results-label'}>{`Search Results for "${enteredAddress}"`}</span>
                    }
                    <div className={'property-list'}>
                        {selectedProperties.map(property => {
                                return <PropertyPreview key={property.uid} property={property}/>;
                            }
                        )}
                        {pageIndex !== maxPageIndex &&
                            <button onClick={incrementPage}>Next Page</button>
                        }
                        {pageIndex > 0 &&
                            <button onClick={decrementPage}>Previous Page</button>
                        }
                    </div>
                </div>
            }
        </div>
    );
}