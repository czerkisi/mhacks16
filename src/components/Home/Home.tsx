import './Home.css';

import PropertyMap from "../PropertyMap/PropertyMap";
import List from "../List/List";
import Banner from "../Banner/Banner";
import React from "react";
import Header from "../Header/Header";

export default function Home(){
    return (
        <div className={'fill-screen'}>
            <div className={'half-height'}>
                <Banner/>
            </div>
            <div className={'bottom-overlay'}>
                <div className={'filter-list-container'}>
                    <List/>
                </div>
                <div className={'div-map-container'}>
                    <PropertyMap/>
                </div>
            </div>
        </div>
    )
}