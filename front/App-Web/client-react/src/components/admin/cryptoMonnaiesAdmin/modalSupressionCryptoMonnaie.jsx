import React from 'react'
import { deconnecter, deleteApi } from '../../../services/api/api'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function ModalSupressionCryptoMonnaie(props) {
    toast.configure()
    const handleClose = () => props.setShow(false);

    const supprimer = async (e) => {
        e.preventDefault()
        const response = await deleteApi('coin/' + props.coin.id_coins)
        if(response.status === 200) {
            toast.success('La cryptomonnaie a été supprimée avec succès')
            props.setDataModified(true)
            props.setShow(false)
          }
          else if (response.status === 401) {
            deconnecter()
          }
          else{
            toast.error('Une erreur est survenue suppression annulée')
          }
    }
  return (
    <>
    <Modal dialogClassName="modalCoins" show={props.show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Supression de la crypto monnaie {props.coin.name}</Modal.Title>
        </Modal.Header>
        <form onSubmit={supprimer} >
            <Modal.Body>
                <p style={{textAlign : 'center'}}>Souhaitez vous supprimer la crypto monnaie  {props.coin.name} ? </p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary"  type="button" onClick={handleClose}>
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

