import React from 'react'
import { isAuthorised, put } from '../../services/api/api'

export default function ModerationPost(props) {
    const moderate = async  () => {
        if(isAuthorised(['ROLE_MODERATOR' , 'ROLE_ADMIN'])){
            let visible = props.post.visible ? false : true


            await put('post/' + props.post.id_post ,  {visible : visible} )
            props.setDataModified(true)
        }
    }

    return (
        <>
        {isAuthorised(['ROLE_MODERATOR' , 'ROLE_ADMIN'])
        ?
            props.post.visible  ? 
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
