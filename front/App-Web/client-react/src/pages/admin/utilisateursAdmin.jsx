import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LigneUtilisateursAdmin from '../../components/admin/utilisateursAdmin/ligneUtilisateursAdmin'
import ModalAjoutUtilisateur from '../../components/admin/utilisateursAdmin/modalAjoutUtilisateur'
import SideBar from '../../components/general/sideBar'
import ReactPaginate from 'react-paginate';
import { getDataArray, isAuthorised } from '../../services/api/api'

export default function UtilisateursAdmin() {

    const [users, setUsers] = useState([])
    const [showAjout, setShowAjout] = useState(false)
    const [dataModified, setDataModified] = useState(false)

    const itemsPerPage = 5
    const [itemOffset, setItemOffset] = useState(0);

    const displayListeUsers = async () => {
        let datas = await getDataArray('users')
        let dataArray = []
        datas.forEach((data, index) => {
            let obj = { user: data }
            dataArray.push(obj)
        })
        setUsers(dataArray)
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

    const endOffset = itemOffset + itemsPerPage;

    const utilisateursEnCours = users.slice(itemOffset, endOffset);
    const pageCount = (Math.ceil(users.length / itemsPerPage));

    useEffect(() => {
        setDataModified(false)
        displayListeUsers()
        setShowAjout(false)
    }, [dataModified])

    return (
        <>
        <SideBar/>
            {
                isAuthorised(['ROLE_ADMIN'])
                    ?
                    <div className='container'>
                        <h1 style={{paddingTop : '25px' , textAlign : 'center'}}>Administration des Utilisateurs</h1>

                        <div className='row border-bottom mt-5'>
                            <div className='col-4'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Email</p>
                            </div>
                            <div className='col-2'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Avatar</p>
                            </div>
                            <div className='col-3'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Pseudo</p>
                            </div>
                            <div className='col-3'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Actions</p>
                            </div>
                        </div>
                        {utilisateursEnCours.map((user, index) => {
                            return (
                                <LigneUtilisateursAdmin dataModified={dataModified} setDataModified={setDataModified} key={index} user={user} />
                            )
                        })}
                        <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, margin: 'auto'}} className='row'>
                            <div className='col-6 offset-3'>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="&raquo;"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={1}
                                    pageCount={pageCount}
                                    previousLabel="&laquo;"
                                    renderOnZeroPageCount={null}
                                    activeClassName='active'
                                    containerClassName='pagination pagination-lg'
                                    pageClassName='page-item'
                                    pageLinkClassName='page-link'
                                    previousClassName='page-item'
                                    previousLinkClassName='page-link'
                                    nextClassName='page-item'
                                    nextLinkClassName='page-link'
                                />
                            </div>
                        </div>

                        <ModalAjoutUtilisateur show={showAjout} setShow={setShowAjout} setDataModified={setDataModified} />
                        <a onClick={() => setShowAjout(true)} style={{fontSize : '40px'}} className="floatWrite">
                            <i className="bi bi-plus" />
                        </a>
                    </div>
                    :
                    <></>
            }
        </>
    )
}
