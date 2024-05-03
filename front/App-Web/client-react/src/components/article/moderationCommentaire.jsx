import React from 'react'
import { isAuthorised, put } from '../../services/api/api'

export default function ModerationCommentaire(props) {
    const moderate = async  () => {
        if(isAuthorised(['ROLE_MODERATOR' , 'ROLE_ADMIN'])){
            let visible = props.commentaire.visible ? false : true


            await put('comment/' + props.commentaire.id_comment ,  {visible : visible} )
            props.setDataModified(true)
        }
    }

    return (
        <>
        {isAuthorised(['ROLE_MODERATOR' , 'ROLE_ADMIN'])
        ?
            props.commentaire.visible  ? 
                <a  onClick={moderate}>
                    <i className='bi bi-eye-fill' ></i>
                </a>
                :
                <a onClick={moderate}>
                    <i className='bi bi-eye-slash-fill' ></i>
                </a>
        :
        <></>}

        </>
    )
}
