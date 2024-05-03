import React from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deconnecter, deleteApi } from '../../services/api/api';

export default function ModalSuppresionArticle(props) {


    const handleClose = () => props.setShow(false);

    const supprimer = async (e) => {
        e.preventDefault()
        let response = await deleteApi('article/' + props.article.id_article )
        if (response.status === 200) {
            toast.success("L'article a été supprimé avec succès")
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
            <Modal.Title >Supprimer cet article</Modal.Title>
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
