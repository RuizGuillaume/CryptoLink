import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getData, getDataArray, putMultipart } from '../../../services/api/api';

export default function ModalModificationCryptomonnaie(props) {

    const [credentials, setCredentials] = useState(
        {
            symbol: '',
            name: '',
            creation_date:  '' ,
            description: '',
            homepage : '',
            coinfile : null
        })
    
    useEffect(() => {
        setCredentials
        ({ ...credentials, 
            ['symbol']: props.coin.symbol,
            ['name']: props.coin.name ,
            ['creation_date']: new Date(props.coin.creation_date).toLocaleString('sv').split(' ')[0] ,
            ['homepage']: props.coin.homepage ,
            ['description']: props.coin.description 
        })
    }, [props])

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
    
        const modifier = async (e) => {
            e.preventDefault()
    
            let formData = new FormData();    //formdata object
    
            formData.set('name',  credentials.name);
            formData.set('symbol',  credentials.symbol); 
            formData.set('creation_date',  credentials.creation_date); 
            formData.set('homepage',  credentials.homepage); 
            formData.set('description',  credentials.description); 
            formData.append('coinfile',  credentials.coinfile);    //append the values with key, value pair
            let response = await putMultipart( 'coin/'  + props.coin.id_coins , formData);
    
            if( response === 200  ) {
                toast.success('La cryptomonnaie a été ajoutée avec succès')
                props.setDataModified(true)
                props.setShow(false)
              }
              else {
                toast.error('Une erreur est survenue')
              }
              
        }
  return (
    <>
    <Modal id={'modalModif' + props.coin.id_coins} dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Modification de la crypto monnaie { props.coin.name}</Modal.Title>
        </Modal.Header>
        <form onSubmit={modifier} >
            <Modal.Body>

            

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
                    <input className='form-check-input col-md-6' value={credentials.homepage} onChange={handleChange} name="homepage" type="checkbox" defaultChecked={credentials.homepage} />
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
