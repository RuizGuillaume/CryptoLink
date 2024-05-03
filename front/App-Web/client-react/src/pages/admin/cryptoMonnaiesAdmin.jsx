import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LigneCryptoMonnaiesAdmin from '../../components/admin/cryptoMonnaiesAdmin/ligneCryptoMonnaiesAdmin'
import ModalAjoutCryptoMonnaie from '../../components/admin/cryptoMonnaiesAdmin/modalAjoutCryptoMonnaie'
import SideBar from '../../components/general/sideBar'
import ReactPaginate from 'react-paginate';
import { getDataArray, isAuthorised } from '../../services/api/api'

export default function CryptoMonnaiesAdmin() {

    const [coins, setCoins] = useState([])
    const [coina, setCoin] = useState(undefined)
    const [showAjout, setShowAjout] = useState(false)

    const [dataModified, setDataModified] = useState(false)

    const itemsPerPage = 5  
    const [itemOffset, setItemOffset] = useState(0);


    const displayListeCoins = async () => {
        let datas = await getDataArray('coins')
        let dataArray = []
        datas.forEach((data, index) => {
            let obj = { label: data.name, coin: data }
            dataArray.push(obj)
        })
        setCoins(dataArray)
        /*if (coin === undefined) {
            setCoin(dataArray[0])
        }
        */
    }


    useEffect(() => {
        setDataModified(false)
        displayListeCoins()
        setShowAjout(false)
    }, [dataModified])


    /*const onSelect = (event, newValue) => {
        if (newValue !== undefined && newValue !== null)
            setCoin(newValue)
    }*/

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % coins.length;
        setItemOffset(newOffset);
    };

    const endOffset = itemOffset + itemsPerPage;

    const CoinsEnCours = coins.slice(itemOffset, endOffset);
    const pageCount = (Math.ceil(coins.length / itemsPerPage));

    return (
        <>
        <SideBar/>
            {
                isAuthorised(['ROLE_ADMIN'])
                    ?
                    <div className='container'>
                        <h1 style={{paddingTop : '25px' , textAlign : 'center'}}>Administration des Cryptomonnaies</h1>
                        { /*
                            <div style={{ width: '70%', justifyContent: 'center', textAlign: 'center' }}>
                                <Autocomplete
                                    disablePortal
                                    id="coinAutocompleteAdmin"
                                    onChange={onSelect}
                                    name="coins"
                                    options={coins}
                                    defaultValue={coins[0]}
                                    renderInput={(params) => <TextField {...params} label="Crypto-monnaie" />}
                                    isOptionEqualToValue={(option, value) => option.label === value.coin.name}
                                />
                            </div>*/
                        } 
                        <div className='row border-bottom mt-5'>
                            <div className='col'>
                                <p style={{color: 'black', fontWeight:'bold'}}>#</p>
                            </div>
                            <div className='col'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Nom</p>
                            </div>
                            <div className='col'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Devise</p>
                            </div>
                            <div className='col-2'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Description</p>
                            </div>
                            <div className='col'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Logo</p>
                            </div>
                            <div className='col'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Date de création</p>
                            </div>
                            <div className='col'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Homepage</p>
                            </div>
                            <div className='col-2'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Actions</p>
                            </div>
                        </div>
                        {CoinsEnCours.map((coin, index) => {
                            return (
                                <LigneCryptoMonnaiesAdmin dataModified={dataModified} setDataModified={setDataModified} key={index} coin={coin} />
                            )
                        })}

                        <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, margin: 'auto'}} className='row'>
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

                        <ModalAjoutCryptoMonnaie show={showAjout} setShow={setShowAjout} setDataModified={setDataModified} />
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
