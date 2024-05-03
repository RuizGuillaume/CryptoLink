import React from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteApi } from '../../services/api/api';
import { Link, useNavigate } from 'react-router-dom';



export default function ModalSuppressionTopic(props) {
const  topic =  props.topic
toast.configure()
const navigate = useNavigate()

const handleClose = () => props.setShow(false);




const supprimer = async (e) => {
    e.preventDefault()

    const response = await deleteApi('topic/' + topic.id_topic )
    if( response.status === 200  ) {
        toast.success('Votre topic a été supprimé avec succès')
        props.setDataModified(true)
        props.setShow(false)
        navigate("/topics")

      }
      else {
        toast.error('Une erreur est survenue  , suppression annulé')
      }

}

  return (
    <>
            <Modal dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Supprimer ce topic</Modal.Title>
                </Modal.Header>
                <form  onSubmit={supprimer} >
                    <Modal.Body>

                       



                    </Modal.Body>
                    <Modal.Footer>

                        <button className="btn btn-secondary" type="button" onClick={handleClose}>
                            Fermer
                        </button>


                        <button className="btn btn-primary" onClick={supprimer} type="submit">
                        Suprrimer
                        </button>



                    </Modal.Footer>
                </form>

            </Modal>
        </>
  )
}
