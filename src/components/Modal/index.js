import './styles.css';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

import ExitX from '../../assets/x.svg'
import ModalForm from '../ModalForm';

export default function Modal() {
    const { modal, setModal } = useContext(UserContext)

    return (
        <div className="modal-background">
            <div className="modal">
                <div className='modal-header'>
                    {modal.status === 'addContact' &&
                        <h6 className='modal-title'>
                            Adicionar Registro</h6>}
                    {modal.status === 'editContact' &&
                        <h6 className='modal-title'>
                            Editar Registro</h6>}
                    <img
                        className="exit-img"
                        src={ExitX}
                        onClick={() => setModal({ status: 'none' })}
                    ></img>
                </div>
                <ModalForm></ModalForm>
            </div>
        </div>
    )
}

