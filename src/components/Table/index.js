import './styles.css';
import TableRow from '../TableRow';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Table() {

    const { contactsList } = useContext(UserContext)

    return (
        <div className='table'>
            <div className='table-header'>
                <div className='table-row-section table-row-cell-0'>
                    <span>Nome</span>
                </div>

                <div className='table-row-section table-row-cell-1'>
                    <span className='description'> E-mail </span>
                </div>

                <div className='table-row-section table-row-cell-2'>
                    <span className='description'>Data de Nascimento</span>
                </div>

                <div className='table-row-section table-row-cell-3'>
                    <span className='description'>CPF</span>
                </div>

                <div className='table-row-section table-row-cell-4'>
                    <span className='description'>Telefone</span>
                </div>

                <div className='table-row-section icons'></div>
            </div>
            {
                contactsList.map((contact) => (
                    <TableRow
                        key={contact.id}
                        contact={contact}
                    ></TableRow>
                ))
            }
        </div>
    )
}