import './Home.css';

import PropertyMap from "../PropertyMap/PropertyMap";
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
                    <PropertyMap/>
                </div>
            </div>
        </div>
    )
}