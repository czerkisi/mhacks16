import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import {setSelectedPins} from "../../store/slices/pinsSlice";
import PinPreview from "../PinPreview/PinPreview";

export default function List(){
    const dispatch = useAppDispatch();
    const pageSize = 25;
    const allPins = useAppSelector(state => state.pins.allPins);
    const selectedPins = useAppSelector(state => state.pins.selectedPins);
    const [index, setIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    useEffect(() => {
        const selected = allPins.slice(index * pageSize, Math.min(allPins.length, (index + 1) * pageSize));
        console.log(selected);
        dispatch(setSelectedPins(selected));
        console.log('set selected');
    }, [allPins, index]);

    useEffect(() => {
        setMaxIndex(Math.ceil(allPins.length / pageSize));
    }, [allPins]);

    return (
        <div>
            {selectedPins.map(pin => {
                return <PinPreview key={pin.uid} pin={pin}/>;
                }
            )}
        </div>
    );
}