import './Banner.css';

export default function Banner(){
    return (
        <div className={'banner-container'}>
            <div>
                <span className={'mission-statement white-text'}>Investing in a </span>
                <span className={'mission-statement greener-text'}>Greener</span>
                <span className={'mission-statement white-text'}> Tomorrow</span>
            </div>
            <span className={'secondary-mission-statement white-text'}>building sustainable futures, one property at a time.</span>
        </div>
    );
}