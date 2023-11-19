import React, { ChangeEvent } from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setTypeFilter} from "../../store/slices/filterSlice";
import './TypeFilter.css';

const TypeFilter: React.FC = () => {
    const options = ['Building Type', 'Hospital', 'Hotel', 'Office', 'School', 'Store'];
    const dispatch = useAppDispatch();
    const selectedValue = useAppSelector(state => state.filter.typeFilter);

    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        dispatch(setTypeFilter(newValue));
    };

    return (
        <div>
            {/*<span>Building Type</span>*/}
            <select className={'drop'} value={selectedValue} onChange={handleDropdownChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TypeFilter;
