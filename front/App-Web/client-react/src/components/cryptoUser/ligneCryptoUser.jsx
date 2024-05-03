import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../../services/env'
import dateFormat from "dateformat";
import ModalSuppressionCryptoUser from './modalSuppressionCryptoUser';
import ModalModificationCryptoUser from './modalModificationCryptoUser';


export default function LigneCryptoUser(props) {
    const userCoin = props.userCoin

    const [showModify, setShowModify] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    
    useEffect(() => {

        setShowModify(false)        
        setShowDelete(false)

    }, [props.dataModified])

  return (
    <>
        <td>
            <img style={{ width: '100%'  , maxWidth : '50px'}}  src={getImageUrl() + userCoin.logo} />
        </td>

        <td>
            {userCoin.name}
        </td>
        <td>
            {dateFormat(userCoin.buying_date, 'dd/mm/yy')}
        </td>

        <td>
            { Number( userCoin.quantity ).toFixed(2)}
        </td>
        <td>
            {userCoin.buying_price}€
        </td>

        <td>
            { Number(userCoin.buying_price * userCoin.quantity ).toFixed(2)}€
        </td>

        <td colSpan={2}>
            <button className='btn btn-primary m-1' onClick={() => { setShowModify(true) }} ><i className="bi bi-pen" /></button>
            <button className='btn btn-danger m-1' onClick={() => { setShowDelete(true) }} ><i className="bi bi-trash" /></button>
        </td>


        <ModalModificationCryptoUser show={showModify}  setShow={setShowModify}  userCoin={userCoin} setDataModified={props.setDataModified} />
        <ModalSuppressionCryptoUser show={showDelete} setShow={setShowDelete} userCoin={userCoin} setDataModified={props.setDataModified} />




</>
  )
}
