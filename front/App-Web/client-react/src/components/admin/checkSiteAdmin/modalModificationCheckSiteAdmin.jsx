import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { put } from '../../../services/api/api';

export default function ModalModificationCheckSiteAdmin(props) {

    const website = props.website
    toast.configure()


    const [credentials, setCredentials] = useState({ url: '', fraudulent: false })


    useEffect(() => {
        setCredentials({ 
            ...credentials, 
            ['url']: website.url,
            ['fraudulent']: website.fraudulent 
     })
    }, [props])
    
    const handleChange = (event) => {

        let value = event.currentTarget.value
        const name = event.currentTarget.name
        if (name === 'fraudulent') {
            value = credentials.fraudulent ? false : true
        }
        setCredentials({ ...credentials, [name]: value })
    }

    const handleClose = () => props.setShow(false);

    const modifier = async (e) => {
        e.preventDefault()
        let response = await put('website/' + website.id_website  , credentials)
        if (response === 200) {
            toast.success('Le site a été modifié avec succès')
            props.setDataModified(true)
            props.setShow(false)
        }
        else {
            toast.error("Une erreur est survenue , modification annulée")

        }
    }
    return (
        <>
            <Modal dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title >Modification d'un site verifié</Modal.Title>
                </Modal.Header>
                <form onSubmit={modifier} >
                    <Modal.Body>

                        <label>Url</label>
                        <input className='form-control col-md-6' value={credentials.url} onChange={handleChange} name="url" type="text" required={true} />


                        <div className="form-check mt-2">
                            <input className='form-check-input col-md-6' value={credentials.fraudulent} onChange={handleChange} name="fraudulent" type="checkbox" defaultChecked={website.fraudulent} />
                            <label className="form-check-label">
                                Frauduleux
                            </label>
                        </div>

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
