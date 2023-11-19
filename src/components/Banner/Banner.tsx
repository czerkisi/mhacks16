import './Banner.css';
import AddressSearch from "../AddressSearch/AddressSearch";
import Logo from "../../media/head.png";

export default function Banner(){



    return (
        <div className={'banner-container'}>
                <img alt="" src={Logo} />
            {/*    <span className={'mission-statement white-text'}>Investing in a </span>*/}
            {/*    <span className={'mission-statement greener-text'}>Greener</span>*/}
            {/*    <span className={'mission-statement white-texttext'}> Tomorrow</span>*/}
            {/*<span className={'secondary-mission-statement white-text'}>building sustainable futures, one property at a time.</span>*/}
            <AddressSearch/>
        </div>
    );
}