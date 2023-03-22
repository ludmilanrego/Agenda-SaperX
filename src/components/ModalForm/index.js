import './styles.css';
import { useState } from 'react'
import api from '../../services/api';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

import AddIcon from '../../assets/addIcon2.png'

export default function ModalForm({ }) {

    const { modal, setModal, requestContacts } = useContext(UserContext)

    const modelAddModalForm = {
        name: "",
        email: "",
        date_born: "",
        cpf: "",
        numbers: [{
            id: 0,
            number: ""
        }]
    }

    function ajustModelEditModalForm() {
        const arrayContactNumbers = []
        modal.contact.numbers.map((number) => {
            arrayContactNumbers.push(
                {
                    id: number.id,
                    number: number.number.toString()
                })
        })

        const modelEditModalForm = {
            name: modal.contact.name,
            email: modal.contact.email,
            date_born: modal.contact.date_born,
            cpf: modal.contact.cpf,
            numbers: arrayContactNumbers
        }

        return modelEditModalForm
    }


    const [modalForm, setModalForm] = useState(
        modal.status === 'addContact' ? modelAddModalForm : ajustModelEditModalForm()
    );

    let phoneKey = 0

    function addAditionalPhone() {
        phoneKey = phoneKey + 1
        setModalForm({
            ...modalForm, numbers: [
                ...modalForm.numbers,
                {
                    id: phoneKey,
                    number: ""
                }
            ]
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (modal.status === "addContact") {
            return addContact()
        }

        if (modal.status === 'editContact') {
            editContact()
            requestContacts()
        }
    }

    function clearForm() {
        setModalForm(

            {
                name: "",
                email: "",
                date_born: "",
                cpf: "",
                numbers: [{
                    id: 0,
                    number: ""
                }]
            }
        )
    }

    function handleFormNumbers(event, number) {
        event.preventDefault();
        event.stopPropagation();


        const localModalForm = { ...modalForm }
        let editedNumber = localModalForm.numbers.find((phoneNumber) => {
            return phoneNumber.id === Number(number.id);
        });

        editedNumber.number = event.target.value

        setModalForm(localModalForm)
    }

    function handleForm(event) {
        event.preventDefault();
        event.stopPropagation();

        setModalForm({ ...modalForm, [event.target.name]: event.target.value })
    }

    function editModalFormToRequest() {
        let arrayOfNumbers = []
        const localNumbers = modalForm.numbers

        localNumbers.map((numberForm) => (
            arrayOfNumbers.push(numberForm.number)
        ))

        const editedModalForm =
        {
            name: modalForm.name,
            email: modalForm.email,
            date_born: modalForm.date_born,
            cpf: modalForm.cpf,
            numbers: arrayOfNumbers
        }
        return editedModalForm
    }

    async function addContact() {

        try {
            const editedModalForm = editModalFormToRequest()

            const response = await api.post('/schedule',
                {
                    ...editedModalForm
                },
            );

            requestContacts()
            clearForm();
            setModal({ status: 'none' })

        } catch (error) {
            console.log(error)
        }
    }

    async function editContact() {

        const editedModalForm = editModalFormToRequest()

        try {
            const response = await api.put(`/schedule/${modal.contact.id}`,
                {
                    ...editedModalForm
                });

            requestContacts()
            clearForm();
            setModal({ status: 'none' })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form className='modal-form'
                onSubmit={(event) => handleSubmit(event)}
            >
                <div className='input-container' >
                    <label htmlFor='name'>Nome</label>
                    <input
                        type='text'
                        name='name'
                        value={modalForm.name}
                        onChange={(event) => handleForm(event)}
                    />
                </div>
                <div className='input-container' >
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type='text'
                        name='email'
                        value={modalForm.email}
                        onChange={(event) => handleForm(event)}
                    />
                </div>
                <div className='input-container' >
                    <label htmlFor='date_born'>Data de Nascimento</label>
                    <input
                        type='date'
                        name='date_born'
                        value={modalForm.date_born}
                        onChange={(event) => handleForm(event)}
                    />
                </div>
                <div className='input-container' >
                    <label htmlFor='cpf'>CPF</label>
                    <input
                        type='text'
                        name='cpf'
                        value={modalForm.cpf}
                        onChange={(event) => handleForm(event)}
                    />
                </div>
                {
                    modalForm.numbers.map((numberForm) => (
                        <div className='input-container' >
                            <label htmlFor='number'>Telefone</label>
                            <input
                                key={numberForm.id}
                                type='text'
                                name='number'
                                value={numberForm.number}
                                onChange={(event) => handleFormNumbers(event, numberForm)}
                            />
                        </div>
                    ))
                }
                <div className="add-extra-phone">
                    <img
                        className="add-img"
                        src={AddIcon}
                        onClick={() => addAditionalPhone()}
                    ></img>
                    <h5>Mais Telefones</h5>
                </div>


                <button
                    className='confirm-modal-button main-button'
                    type='submit'
                >Confirmar</button>
            </form>
        </>
    )
}