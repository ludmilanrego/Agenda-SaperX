import './styles.css';
import TableRow from '../TableRow';
import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';

import NavRight from '../../assets/navigate_right.png';
import NavLeft from '../../assets/navigate_left.png';

export default function Table() {

    const { contactsList } = useContext(UserContext)
    const [page, setPage] = useState(1)
    const maxNumberPerPage = 5


    function ajustPage(list) {

        const itemsCountEnd = (maxNumberPerPage * page);
        const itemsCountStart = maxNumberPerPage * (page - 1);

        return list.slice(itemsCountStart, itemsCountEnd)
    }

    function decreasePage(event) {
        event.preventDefault();
        event.stopPropagation();

        if (page === 1) {
            return
        }

        const decreasedPage = page - 1
        setPage(decreasedPage)
    }

    function increasePage(event) {
        event.preventDefault();
        event.stopPropagation();

        if (((page * maxNumberPerPage)) > contactsList.length) {
            return
        }

        const increasedPage = page + 1
        setPage(increasedPage)
    }


    function sortList(list) {

        const sortedList = list.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            return 0;
        });
        return sortedList
    }

    function editList(list) {
        const sortedList = sortList(list)
        const ajustedPagelist = ajustPage(sortedList)

        return ajustedPagelist
    }

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
                editList(contactsList).map((contact) => (
                    <TableRow
                        key={contact.id}
                        contact={contact}
                    ></TableRow>
                ))
            }
            <div className='table-footer'>
                <img
                    className="exit-img"
                    src={NavLeft}
                    onClick={(event) => decreasePage(event)}
                ></img>
                <img
                    className="exit-img"
                    src={NavRight}
                    onClick={(event) => increasePage(event)}
                ></img>
            </div>

        </div>
    )
}