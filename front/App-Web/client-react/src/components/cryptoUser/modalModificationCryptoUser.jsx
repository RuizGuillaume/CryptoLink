import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getDataArray, post, put } from '../../services/api/api';
import dateFormat from "dateformat";

export default function ModalModificationCryptoUser(props) {

    
    toast.configure()
    const [coins, setCoins] = useState([])
    const [credentials, setCredentials] = useState(
        {
            id_coins: props.userCoin.id_coins,
            buying_date: dateFormat(new Date(props.userCoin.buying_date) , 'yyyy-mm-dd'),
            buying_price: props.userCoin.buying_price,
            quantity: props.userCoin.quantity,

        })



        const getCoins = async () => {

            let datas = await getDataArray('coins')
            let dataArray = []
            datas.forEach((data, index) => {
                let obj = { label: data.name, id_coins :  { id_coins :  data.id_coins  , name :  data.name}   }
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
        
        const modifier = async (e) => {
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



            
            let response = await put( 'userscoins/' + props.userCoin.id_userscoins , credentials);
            if( response === 200  ) {
                toast.success('La ligne a été ajoutée avec succès')
                props.setDataModified(true)
                props.setShow(false)
              }
              else {
                toast.error('Une erreur est survenue')
              }
              
        }

  return (
    <>
    <Modal dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Modification d'une ligne de votre espace</Modal.Title>
        </Modal.Header>
        <form onSubmit={modifier} >
            <Modal.Body>

            <Autocomplete
                    disablePortal
                    className='form-control'
                    id="coinAutocomplete"
                    onChange={onSelect}
                    name="coins"
                    options={coins}
                    defaultValue={{ label :  props.userCoin.name , id_coins : { id_coins :  props.userCoin.id_coins , name :  props.userCoin.name}  } }
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

