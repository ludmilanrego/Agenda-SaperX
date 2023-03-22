import './styles.css';
import LogoIcon from '../../assets/LogoSaperX.svg'

export default function Logo() {

    return (
        <div className="logo">
            <img
                className="logo-img"
                src={LogoIcon}
            ></img>
            <h4 className='logo-title'>Minha Agenda</h4>
        </div>
    )
}