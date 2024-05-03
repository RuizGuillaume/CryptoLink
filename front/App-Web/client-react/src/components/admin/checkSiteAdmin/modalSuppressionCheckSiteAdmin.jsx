import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteApi } from '../../../services/api/api';

export default function ModalSuppressionCheckSiteAdmin(props) {

    const website = props.website
    toast.configure()

    const handleClose = () => props.setShow(false);

    const supprimer = async (e) => {
        e.preventDefault()
        let response = await deleteApi('website/' + website.id_website)
        if (response.status === 200) {
            toast.success('Le site a été supprimé avec succès')
            props.setDataModified(true)
            props.setShow(false)
        }
        else {
            toast.error("Une erreur est survenue , suppression annulée")
        }
    }
    return (
        <>
            <Modal dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title >Suppression d'un site verifié</Modal.Title>
                </Modal.Header>
                <form onSubmit={supprimer} >
                    <Modal.Body>


                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-secondary" type="button" onClick={handleClose}>
                            Fermer
                        </button>

                        <button className="btn btn-primary" type="submit">
                        Supprimer
                        </button>
                    </Modal.Footer>
                </form>

            </Modal>
        </>
    )
}
