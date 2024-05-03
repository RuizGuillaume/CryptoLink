import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../../../services/env'
import ModalModificationCryptomonnaie from './modalModificationCryptomonnaie'
import ModalSupressionCryptoMonnaie from './modalSupressionCryptoMonnaie'

export default function LigneCryptoMonnaiesAdmin(props) {
    let coin = props.coin.coin
    const [showModify, setShowModify] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {

        setShowModify(false)        
        setShowDelete(false)

    }, [props.dataModified])


  return (
    <>
        <div className='row border-bottom align-items-center'>
            <div className='col'>
                <p>{coin.id_coins}</p>
            </div>
            <div className='col'>
                <p>{coin.name}</p>
            </div>
            <div className='col'>
                <p>{coin.symbol}</p>
            </div>
            <div className='col-2'>
                <p>{coin.description.substring(0, 30) + '...'}</p>
            </div>
            <div className='col'>
                <p><img style={{width: '50%'}}src={getImageUrl()+coin.logo}/></p>
            </div>
            <div className='col'>
                <p>{new Date(coin.creation_date).toLocaleDateString()}</p>
            </div>
            <div className='col'>
                <p>{coin.homepage ? 'Oui' : 'Non'}</p>
            </div>
            <div className='col-2'>
                <ModalModificationCryptomonnaie show={showModify} setShow={setShowModify} setDataModified={props.setDataModified} coin={coin}/> 
                <button className='btn btn-warning m-1' onClick={ () => { setShowModify(true)}}><i className="bi bi-pen" /></button>
                <ModalSupressionCryptoMonnaie show={showDelete} setShow={setShowDelete} setDataModified={props.setDataModified} coin={coin}/> 
                <button className='btn btn-danger m-1' onClick={ () => { setShowDelete(true)}}><i className="bi bi-trash" /></button>
            </div>
        </div>
    </>
  )
}
