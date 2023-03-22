import Header from '../../components/Header';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import AddContactButton from '../../components/AddContactButton';

import api from './../../services/api';
import { useState, useEffect } from 'react'
import { getItem } from './../../utils/storage'

import './styles.css'

import UserContext from '../../contexts/UserContext';

function Home() {

    const [modal, setModal] = useState({ status: 'none' });

    const [contactsList, setContactsList] = useState([])

    async function requestContacts() {
        try {
            const { data } = await api.get('/schedule', {
            });

            const contacts = data.data
            setContactsList(contacts)
            return
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        requestContacts()
    }, []);

    return (

        <UserContext.Provider value={{ modal, setModal, contactsList, requestContacts }}>

            <div className='home-container'>
                <Header></Header>

                <main>
                    {modal.status !== "none" && <Modal></Modal>}
                    <div className='edit-content'>
                        <AddContactButton></AddContactButton>
                    </div>
                    <div className='main-content'>
                        <Table></Table>
                    </div>

                </main >
            </div >
        </UserContext.Provider>
    );
}
export default Home;


