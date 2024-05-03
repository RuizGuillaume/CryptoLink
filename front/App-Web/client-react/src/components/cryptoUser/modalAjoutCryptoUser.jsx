import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getDataArray, post } from '../../services/api/api';

export default function ModalAjoutCryptoUser(props) {
    toast.configure()
    const [coins, setCoins] = useState([])

    const [credentials, setCredentials] = useState(
        {
            id_coins: 0,
            buying_date: new Date().toISOString().split('T')[0],
            buying_price: 1,
            quantity: 1,

        })



        const getCoins = async () => {

            let datas = await getDataArray('coins')
            let dataArray = []
            datas.forEach((data, index) => {
                let obj = { label: data.name, id_coins : data }
                dataArray.push(obj)
            })
            setCoins(dataArray)

        }

        const onSelect = (event, newValue) => {
            if (newValue !== undefined && newValue !== null)
            setCredentials({ ...credentials, ['id_coins']: newValue.id_coins.id_coins })
        }

        const handleClose = () => props.setShow(false);


        const handleChange = (event) => {

            let value = event.currentTarget.value
            const name = event.currentTarget.name
            setCredentials({ ...credentials, [name]: value })
        }

        
        useEffect(() => {
            getCoins()
        }, [])
        
        const ajouter = async (e) => {
            e.preventDefault()
    
            if(credentials.id_coins === undefined || credentials.id_coins === null  || credentials.id_coins === 0  ){
                toast.error('Erreur lors de la selection de la cryptomonnaie')
                return 
            }

                
            if(credentials.quantity === undefined || credentials.quantity === null  || credentials.quantity <= 0  ){
                toast.error('Veillez renseigner une quantité valide')
                return 
            }

            
                
            if(credentials.buying_date === undefined || credentials.buying_date === null ){
                toast.error("Veillez renseigner une date d'achat valide")
                return 
            }



            
            let response = await post( 'userscoins' , credentials);
            if( response.status === 200  ) {
                toast.success('La ligne  a été ajoutée avec succès')
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
                    <Modal.Title>Ajout d'une ligne à votre espace</Modal.Title>
                </Modal.Header>
                <form onSubmit={ajouter} >
                    <Modal.Body>

                    <Autocomplete
                            disablePortal
                            id="coinAutocomplete"
                            className='form-control'
                            onChange={onSelect}
                            name="coins"
                            options={coins}
                            renderInput={(params) => <TextField {...params} label="Crypto-monnaie" />}
                            isOptionEqualToValue={(option, value) => option.label === value.id_coins.name}
                        />

                        <label>Date d'achat</label>
                        <input className='form-control col-md-6' value={credentials.buying_date} onChange={handleChange} name="buying_date" type="date" required={true} />

                        <label>Prix d'achat</label>
                        <input className='form-control col-md-6' value={credentials.buying_price} onChange={handleChange} name="buying_price" type="number"  required={true} />

                        <label>Quantite</label>
                        <input className='form-control col-md-6' value={credentials.quantity} onChange={handleChange} name="quantity" type="number"  required={true} />

                    </Modal.Body>
                    <Modal.Footer>

                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
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
