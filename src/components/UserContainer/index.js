import './styles.css';
import Exit from '../../assets/Exit.svg'
import Perfil from '../../assets/Perfil.svg'

export default function UserContainer() {

    return (
        <div className="user-container">
            <img
                className="perfil-img"
                src={Perfil}
            ></img>

            <img
                className="exit-img"
                src={Exit}
                alt="icone sair"
            ></img>
        </div>
    )
}