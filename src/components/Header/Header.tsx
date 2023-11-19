import './Header.css';
import imglogo from '../../media/mhackslogo.png';
export default function Header(){
    return (
        <div className={'header-container'}>
            <img src={imglogo} className={'logo-img'} alt={'greenr'}/>
        </div>
    );
}