import React from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deconnecter, deleteApi } from '../../services/api/api';

export default function ModalSuppressionCryptoUser(props) {
    toast.configure()
    const handleClose = () => props.setShow(false);

    const supprimer = async () => {
        let response = await deleteApi('userscoins/' + props.userCoin.id_userscoins )
        if (response.status === 200) {
            toast.success('La ligne a été supprimée avec succès')
            props.setDataModified(true)
            props.setShow(false)
        }
        else if (response.status === 401) {
            deconnecter()
        }
        else {
            toast.error('Une erreur est survenue suppression annulée')

        }
    }

    return (
        <>
            <Modal dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title >Supression de la ligne</Modal.Title>
                </Modal.Header>
                <form onSubmit={supprimer} >
                    <Modal.Footer>
                        <button className="btn btn-secondary" type="button" onClick={handleClose}>
                            Fermer
                        </button>

                        <button className="btn btn-primary" onClick={supprimer} type="submit">
                            Supprimer
                        </button>



                    </Modal.Footer>
                </form>

            </Modal>
        </>
    )
}
