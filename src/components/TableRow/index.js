import './styles.css';
import { useState } from 'react'
import { formatToModelDate } from '../../utils/dateFormat'
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

import EditIcon from '../../assets/Edit-icon.svg'
import TrashIcon from '../../assets/delete-icon.png'
import AddIcon from '../../assets/addIcon2.png'
import PopUp from '../PopUp'

export default function TableRow({ contact }) {

    const { setModal } = useContext(UserContext)
    const [showPopUp, setShowPopUp] = useState(false)

    const [showAllNumbers, setShowAllNumber] = useState(false)

    function turnArrayToString(array) {
        let localArray = [];

        array.map((element) => (
            localArray.push(element.number)
        ))
        return localArray.join("/ ");
    }

    function activateShowPopUp(event) {
        event.preventDefault();
        event.stopPropagation();

        setShowPopUp(true)
    }

    function toggleShowAllNumbers(event) {
        event.preventDefault();
        event.stopPropagation();

        setShowAllNumber(!showAllNumbers)
    }

    return (
        <div className='table-row'>

            <div className='table-row-section table-row-cell-0'>
                <span className='bold black'>
                    {contact.name}
                </span>
            </div>

            <div className='table-row-section table-row-1'>
                <span className='description'> {contact.email} </span>
            </div>

            <div className='table-row-section table-row-2'>
                <span className='description'>{formatToModelDate(contact.date_born)}</span>
            </div>

            <div className='table-row-section table-row-3'>
                <span className='description'>{contact.cpf}</span>
            </div>

            <div className='table-row-section table-row-4'>
                <span className='description'>
                    {showAllNumbers ? turnArrayToString(contact.numbers) : contact.numbers[0].number}
                </span>
                {
                    contact.numbers.length > 1 && <img
                        className="add-img"
                        src={AddIcon}
                        onClick={(event) => toggleShowAllNumbers(event)}
                    ></img>}
            </div>

            <div className='table-row-section icons'>
                <img
                    className="edit-img"
                    src={EditIcon}
                    onClick={() => { setModal({ status: 'editContact', contact: contact }) }}
                ></img>
                <img
                    className="delete-img"
                    src={TrashIcon}
                    onClick={(event) => activateShowPopUp(event)}
                ></img>
                {
                    showPopUp && <PopUp
                        setShowPopUp={setShowPopUp}
                        contact={contact}
                    ></PopUp>
                }
            </div>
        </div >
    )
}