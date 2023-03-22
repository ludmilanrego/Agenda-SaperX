import './styles.css';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function AddContactButton() {

    const { setModal } = useContext(UserContext)

    return (
        <button
            className='main-button'
            onClick={() => {
                setModal({
                    status: 'addContact', contact:
                    {
                        name: "",
                        email: "",
                        date_born: "",
                        cpf: "",
                        telefone: ""
                    }
                })
            }}
        >Adicionar Registro</button>
    )
}