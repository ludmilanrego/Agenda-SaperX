import './styles.css';
import api from './../../services/api';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function TableRow({ contact, setShowPopUp }) {
    const { requestContacts } = useContext(UserContext)

    async function deleteContact(event) {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await api.delete(`/schedule/${contact.id}`, {
            });

            requestContacts()
            setShowPopUp(false)

        } catch (error) {
            console.log(error)
        }
    }

    function closePopUp(event) {
        event.preventDefault();
        event.stopPropagation();

        setShowPopUp(false)
    }

    return (
        <div id="pop-up">
            <h3
                id='pop-up-title'
            >Apagar item?</h3>
            <div>
                <button
                    id='pop-up-confirm'
                    onClick={(event) => { deleteContact(event) }}
                >Sim</button>
                <button
                    id='pop-up-cancel'
                    onClick={(event) => { closePopUp(event) }}
                >Não</button>
            </div>
        </div>
    )
}