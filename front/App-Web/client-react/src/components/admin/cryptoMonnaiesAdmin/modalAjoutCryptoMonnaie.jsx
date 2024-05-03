import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { postMultipart } from '../../../services/api/api';


export default function ModalAjoutCryptoMonnaie(props) {
    toast.configure()

    const [credentials, setCredentials] = useState(
        {
            id_coins: '',
            symbol: '',
            name: '',
            creation_date: '',
            description: '',
            homepage : false,
            coinfile : null
        })
        
    const handleClose = () => props.setShow(false);

    const handleInputFileChange = (event) => {
        setCredentials({ ...credentials, [event.currentTarget.name]: event.target.files[0] })
    }


    const handleChange = (event) => {

        let value = event.currentTarget.value
        const name = event.currentTarget.name
        if(name === 'homepage'){
            value = credentials.homepage === true ? false : true
        }
        setCredentials({ ...credentials, [name]: value })
    }

    const ajouter = async (e) => {
        e.preventDefault()

        let formData = new FormData();

        formData.set('id_coins',  credentials.id_coins);
        formData.set('name',  credentials.name);
        formData.set('symbol',  credentials.symbol); 
        formData.set('creation_date',  credentials.creation_date); 
        formData.set('homepage',  credentials.homepage); 
        formData.set('description',  credentials.description); 
        formData.append('coinfile',  credentials.coinfile);
        let response = await postMultipart( 'coin' , formData);

        if( response === 200  ) {
            toast.success('La cryptomonnaie a été ajoutée avec succès')
            props.setDataModified(true)
            props.setShow(false)
            setCredentials({})
          }
          else {
            toast.error('Une erreur est survenue')
          }
          
    }
    return (
        <>
            <Modal dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Ajout d'une crypto monnaie</Modal.Title>
                </Modal.Header>
                <form onSubmit={ajouter} >
                    <Modal.Body>

                        <label>#</label>
                        <input className='form-control col-md-6' value={credentials.id_coins} onChange={handleChange} name="id_coins" type="text" placeholder='#' required={true} />

                        <label>Devise</label>
                        <input className='form-control col-md-6' value={credentials.symbol} onChange={handleChange} name="symbol" type="text" placeholder='Devise' required={true} />

                        <label>Nom</label>
                        <input className='form-control col-md-6' value={credentials.name} onChange={handleChange} name="name" type="text" placeholder='Nom' required={true} />

                        <label>Date de création</label>
                        <input className='form-control col-md-6' value={credentials.creation_date} onChange={handleChange} name="creation_date" type="date" required={true} />


                        <label>Description</label>
                        <textarea className='form-control col-md-6' value={credentials.description} onChange={handleChange} name="description"  required={true} />

                        <br/>
                        <div className="form-check">
                            <input className='form-check-input col-md-6' value={credentials.homepage} onChange={handleChange} name="homepage" type="checkbox"  />
                            <label className="form-check-label" >
                                Homepage
                            </label>
                        </div>

                        <div className="form-outline form-white">
                            <label >Image</label>
                            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleInputFileChange} name="coinfile" className="form-control" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <button className="btn btn-secondary" onClick={handleClose}>
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
