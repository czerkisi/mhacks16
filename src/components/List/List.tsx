import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import {setSelectedProperties} from "../../store/slices/propertiesSlice";
import PropertyPreview from "../PropertyPreview/PropertyPreview";
import './List.css';

export default function List(){
    const dispatch = useAppDispatch();
    const pageSize = 25;
    const allProperties = useAppSelector(state => state.properties.allProperties);
    const selectedProperties = useAppSelector(state => state.properties.selectedProperties);
    const [index, setIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    useEffect(() => {
        const selected = allProperties.slice(index * pageSize, Math.min(allProperties.length, (index + 1) * pageSize));
        console.log(selected);
        dispatch(setSelectedProperties(selected));
        console.log('set selected');
    }, [allProperties, index]);

    useEffect(() => {
        setMaxIndex(Math.ceil(allProperties.length / pageSize));
    }, [allProperties]);

    return (
        <div>
            <div className={'property-list'}>
                {selectedProperties.map(property => {
                        return <PropertyPreview key={property.uid} property={property}/>;
                    }
                )}
            </div>
        </div>
    );
}