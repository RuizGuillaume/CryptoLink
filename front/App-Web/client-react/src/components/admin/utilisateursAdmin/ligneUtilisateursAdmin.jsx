import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../../../services/env'
import { toast } from 'react-toastify';
import ModalModificationUtilisateur from './modalModificationUtilisateur'
import { putMultipart, recupererToken } from '../../../services/api/api';
import jwt_decode from "jwt-decode";

export default function LigneUtilisateursAdmin(props) {
    let user = props.user.user
    const [showModify, setShowModify] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const verifyUser = () => {
        const token = recupererToken()
        const decoded = jwt_decode(token)
        if(decoded.login.email === user.email){
            return true
        }else{
            return false
        }
    }

    useEffect(() => {
        setShowModify(false)        
        setShowDelete(false)

    }, [props.dataModified])

    const setDisable = async () => {
        let formData = new FormData();
        
        if(user.disable){
            formData.set('disable', false);
            let response = await putMultipart('admin/user/'+ user.id_user, formData);
            if( response === 200  ) {
                toast.success(`Le compte utilisateur a été déverrouillé`)
                props.setDataModified(true)
            }
            else {
                toast.error('Une erreur est survenue')
            }
        }
        else{
            formData.set('disable', true);
            let response = await putMultipart('admin/user/'+ user.id_user, formData);
            if( response === 200  ) {
                toast.success(`Le compte utilisateur a été verrouillé`)
                props.setDataModified(true)
            }
            else {
                toast.error('Une erreur est survenue')
            }
        }
    }

  return (
    <>
    <div className='row border-bottom align-items-center'>
        <div className='col-4'>
            <p>{user.email}</p>
        </div>
        <div className='col-2'>
            <p><img style={{width: '40%'}}src={getImageUrl()+user.avatar}/></p>
        </div>
        <div className='col-3'>
            <p>{user.pseudo}</p>
        </div>
        <div className='col-3'>
            <ModalModificationUtilisateur show={showModify} setShow={setShowModify} setDataModified={props.setDataModified} user={user} verifyUser={verifyUser}/> 
            <button className='btn btn-warning m-1' onClick={ () => { setShowModify(true)}}><i className="bi bi-pen" /></button>
            {
                user.disable
                ? <button className='btn btn-danger m-1' onClick={setDisable}><i className="bi bi-lock-fill" /></button>
                : verifyUser() ? <button className='btn btn-danger m-1' onClick={setDisable} disabled><i className="bi bi-unlock-fill" /></button>
                             : <button className='btn btn-danger m-1' onClick={setDisable} ><i className="bi bi-unlock-fill" /></button>
            }
            
        </div>
    </div>
    </>
  )
}
