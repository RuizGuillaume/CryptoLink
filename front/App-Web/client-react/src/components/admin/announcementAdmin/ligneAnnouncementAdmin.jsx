import React, { useEffect, useState } from 'react'
import ModalModificationAnnoucement from './modalModificationAnnoucement'

export default function LigneAnnouncementAdmin(props) {
    const [showModify, setShowModify] = useState(false)

    useEffect(() => {
        setShowModify(false)        
    }, [props.dataModified])
  return (
    <>
        <div className='row border-bottom align-items-center'>
            <div className='col-3'>
                <p>{props.announcement.message.substring(0, 30) + '...'}</p>
            </div>
            <div className='col-3'>
                <p>{new Date(props.announcement.start_date).toLocaleDateString()}</p>
            </div>
            <div className='col-3'>
                <p>{new Date(props.announcement.end_date).toLocaleDateString()}</p>
            </div>
            <div className='col-3'>
                <ModalModificationAnnoucement show={showModify} setShow={setShowModify} setDataModified={props.setDataModified} announcement={props.announcement}/> 
                <button className='btn btn-warning m-1' onClick={ () => { setShowModify(true)}}><i className="bi bi-pen" /></button>
            </div>
        </div>
    </>
  )
}
