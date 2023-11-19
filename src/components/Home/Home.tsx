import './Home.css';
import {useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import {setSelectedPins} from "../../store/slices/pinsSlice";
import Map from "../Map/Map";
import List from "../List/List";
import Banner from "../Banner/Banner";

export default function Home(){
    return (
        <div className={'fill-screen'}>
            <div className={'half-height'}>
                <Banner/>
            </div>
            <div className={'half-height'}>
                <div className={'half-width'}>
                    <List/>
                </div>
                <div className={'half-width'}>
                    <Map/>
                </div>
            </div>
        </div>
    )
}