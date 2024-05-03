import React, { useEffect, useState } from 'react'
import ModalModificationCheckSiteAdmin from './modalModificationCheckSiteAdmin'
import ModalSuppressionCheckSiteAdmin from './modalSuppressionCheckSiteAdmin'

export default function LigneCheckSiteAdmin(props) {
    const website = props.website

    const [showModify, setShowModify] = useState(false)
    const [showDelete, setShowDelete] = useState(false)


    useEffect(() => {

        setShowModify(false)
        setShowDelete(false)

    }, [props.dataModified])

    return (
        <div className='row my-2 border-bottom'>
            {website.fraudulent === undefined || website.fraudulent
                ?
                <div style={{ color: 'red' }} className='col-5'><i className="bi bi-x"></i> {website.url}</div>

                :
                <div style={{ color: 'green' }} className='col-5'><i className="bi bi-check2"></i> {website.url} </div>

            }
            <div className='col-3'>(vérifié par {website.pseudo})</div>
            <div className='col-3'>
                <button onClick={() => setShowModify(true)}  className='btn btn-warning'><i className='bi bi-pen'></i></button>
                <ModalModificationCheckSiteAdmin website={website} show={showModify} setShow={setShowModify} setDataModified={props.setDataModified} />
                <button onClick={() => setShowDelete(true)} className='btn btn-danger mx-2'><i className='bi bi-trash'></i></button>
                <ModalSuppressionCheckSiteAdmin website={website} show={showDelete} setShow={setShowDelete} setDataModified={props.setDataModified} />

            </div>
        </div>
    )
}
