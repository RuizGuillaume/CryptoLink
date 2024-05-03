import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { put } from '../../../services/api/api';
import dateFormat from "dateformat";

export default function ModalModificationAnnoucement(props) {

    const [credentials, setCredentials] = useState(
        {
            start_date: '',
            end_date: '',
            message: ''
        })
    
    useEffect(() => {
        setCredentials
        ({ ...credentials, 
            ['start_date']: dateFormat(props.announcement.start_date  , 'yyyy-mm-dd') ,
            ['end_date']: dateFormat(props.announcement.end_date  , 'yyyy-mm-dd')  ,
            ['message']: props.announcement.message
        })
    }, [props])

    const handleClose = () => props.setShow(false);

    const handleChange = (event) => {
    
        let value = event.currentTarget.value
        const name = event.currentTarget.name
        setCredentials({ ...credentials, [name]: value })
    }

    const modifier = async (e) => {
        e.preventDefault()
        const response = await put('announcement/', credentials )

        if( response === 200  ) {
            toast.success('Le message a été modifié avec succès')
            props.setDataModified(true)
            props.setShow(false)
          }
          else {
            toast.error('Une erreur est survenue')
          }
          
    }
  return (
    <>
        <Modal id={'modalModif' + props.announcement.id_announcement} dialogClassName="modalAnnouncement" show={props.show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Modification du bandeau de communication</Modal.Title>
            </Modal.Header>
            <form onSubmit={modifier} >
                <Modal.Body>
                    <label>Date de debut</label>
                    <input className='form-control col-md-6' value={credentials.start_date} onChange={handleChange} name="start_date" type="date" required={true} />
                    
                    <label>Date de fin</label>
                    <input className='form-control col-md-6' value={credentials.end_date} onChange={handleChange} name="end_date" type="date" required={true} />

                    <label>Message</label>
                    <textarea className='form-control col-md-6' value={credentials.message} onChange={handleChange} name="message"  required={true} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" type="button" onClick={handleClose}>
                        Fermer
                    </button>

                    <button className="btn btn-primary" type="submit">
                        Modifier
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    </>
  )
}
