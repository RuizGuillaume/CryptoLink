import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { post } from '../../../services/api/api';

export default function ModalAjoutCheckSiteAdmin(props) {
    toast.configure()


    const [credentials, setCredentials] = useState({ url: '', fraudulent: false })


    const handleChange = (event) => {

        let value = event.currentTarget.value
        const name = event.currentTarget.name
        if (name === 'fraudulent') {
            value = credentials.fraudulent ? false : true
        }
        setCredentials({ ...credentials, [name]: value })
    }

    const handleClose = () => props.setShow(false);

    const ajouter = async (e) => {
        e.preventDefault()
        let response = await post('website/admin' , credentials)
        if (response.status === 200) {
            toast.success('Le site a été ajouté avec succès')
            props.setDataModified(true)
            props.setShow(false)
        }
        else {
            toast.error("Une erreur est survenue , ajout annulée")

        }
    }
    return (
        <>
            <Modal dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title >Ajout d'un site verifié</Modal.Title>
                </Modal.Header>
                <form onSubmit={ajouter} >
                    <Modal.Body>

                        <label>Url</label>
                        <input className='form-control col-md-6' value={credentials.url} onChange={handleChange} name="url" type="text" required={true} />


                        <div className="form-check mt-2">
                            <input className='form-check-input col-md-6' value={credentials.fraudulent} onChange={handleChange} name="fraudulent" type="checkbox" />
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
                            Ajouter
                        </button>
                    </Modal.Footer>
                </form>

            </Modal>
        </>
    )
}
