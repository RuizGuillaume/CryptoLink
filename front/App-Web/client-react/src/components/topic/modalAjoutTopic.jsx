import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getDataArray, post } from '../../services/api/api';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ModalAjoutTopic(props) {

toast.configure()
const [credentials, setCredentials] = useState({ title: '', publish_date : new Date(), content: '' , category : 0 })
const [categoryTopics, setCategoryTopics] = useState([])
const handleClose = () => props.setShow(false);


const getCategoryTopics = async () => {

    let datas = await getDataArray('categorytopic')


    let dataArray = []

    datas.forEach((data, index) => {
        let obj = { label: data.category, category: data }
        dataArray.push(obj)
    })
    setCategoryTopics(dataArray)
    setCredentials({ ...credentials, ['category']: dataArray[0].category.category })

}

const verifyCredentialString = (credential) => {
    if(credential === undefined || credential.trim()  === '' ){
        return false
    }
    return true
}

const ajouter = async (e) => {
    e.preventDefault()



    if(!verifyCredentialString(credentials.title) || !verifyCredentialString(credentials.content)){
        return
    }

    if(credentials.category === undefined || credentials.category * 1  <= 0){
        return
    }
    setCredentials({ ...credentials, ['publish_date']: new Date() })

    const response = await post('topic' , credentials)
    if( response.status === 200  ) {
        toast.success('Votre topic a été ajouté avec succès')
        props.setDataModified(true)
        props.setShow(false)
      }
      else {
        toast.error('Une erreur est survenue  , ajout annulé')
      }

}

const onSelect = (event, newValue) => {
    if (newValue !== undefined && newValue !== null){
        setCredentials({ ...credentials, ['category']: newValue.category.id_categorytopic })

    }
}

useEffect(() => {
    getCategoryTopics()
}, [])


    
const handleChange = (event) => {
    
    let value = event.currentTarget.value
    const name = event.currentTarget.name

    setCredentials({ ...credentials, [name]: value })
}
  return (
    <>
            <Modal dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Ajouter un topic</Modal.Title>
                </Modal.Header>
                <form  onSubmit={ajouter} >
                    <Modal.Body>

                        <label>Votre question</label>
                        <input className='form-control col-md-6' value={credentials.title} onChange={handleChange} name="title" type="text" placeholder='Posez votre question' required={true} />             
                        
                        <br/>
                        <Autocomplete
                            disablePortal
                            id="categoryTopicAutocomplete"
                            onChange={onSelect}
                            name="categoryTopic"
                            className='col-md-6'
                            options={categoryTopics}
                            renderInput={(params) => <TextField {...params} label="Catégories" />}
                            isOptionEqualToValue={(option, value) => option.label === value.category.category}
                            style={{ maxWidth: '10rem', minWidth: '100%' }}
                        />
                        <br/>
                        <label>Description</label>
                        <textarea className='form-control col-md-6' value={credentials.content} onChange={handleChange} name="content" placeholder='Décrivez ici votre problème' required={true} />



                    </Modal.Body>
                    <Modal.Footer>

                        <button className="btn btn-secondary" type="button" onClick={handleClose}>
                            Fermer
                        </button>


                        <button className="btn btn-primary" onClick={ajouter} type="submit">
                            Ajouter
                        </button>



                    </Modal.Footer>
                </form>

            </Modal>
        </>
  )
}
