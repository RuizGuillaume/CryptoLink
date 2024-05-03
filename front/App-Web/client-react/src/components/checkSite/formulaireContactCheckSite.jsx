import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { postMultipart } from '../../services/api/api';

export default function FormulaireContactCheckSite(props) {
    toast.configure()

    const [credentials, setCredentials] = useState({ url: '', fraudulent: false, text: '', websitefiles: null })

    const handleChange = (event) => {

        let value = event.currentTarget.value
        const name = event.currentTarget.name
        if (name === 'fraudulent') {
            value = credentials.fraudulent === true ? false : true
        }
        setCredentials({ ...credentials, [name]: value })
    }

    const handleInputFileChange = (event) => {

        setCredentials({ ...credentials, [event.currentTarget.name]: event.target.files })

    }

    const contacterUnAdmin = async (e) => {
        e.preventDefault()
        let formData = new FormData();    //formdata object
        formData.set('url',  credentials.url);
        formData.set('text',  credentials.text); 
        formData.set('fraudulent',  credentials.fraudulent); 
        
        for (let i = 0 ; i <  credentials.websitefiles.length ; i++) {
            formData.append('websitefiles',  credentials.websitefiles[i]);  
        }  //append the values with key, value pair
        let response = await postMultipart( 'website' , formData);

        if( response === 200  ) {
            toast.success("l'envoi a été réalisé avec succès")
            props.setshowFormulaire(false)
          }
          else {
            toast.error('Une erreur est survenue')
          }
    }

    return (
        <>
            <h3>Formulaire de contact</h3>

            <form onSubmit={contacterUnAdmin}>
                <div className="row" style={{ textAlign: 'left' }} >

                    <label className='mt-2'>Url</label>
                    <input className='form-control col-md-6' value={credentials.url} onChange={handleChange} name="url" type="text" placeholder='url' required={true} />

                    <label className='mt-2'>Description</label>
                    <textarea className='form-control col-md-6 mt-2' value={credentials.text} onChange={handleChange} name="text" type="text" placeholder='Décrivez ici pourquoi ce site pourait etre sûr ou frauduleux' required={true} />



                    <div className="form-check mt-2">
                        <input className='form-check-input col-md-6' value={credentials.fraudulent} onChange={handleChange} name="fraudulent" type="checkbox" />
                        <label className="form-check-label">
                            Frauduleux
                        </label>
                    </div>


                    <label className='mt-2'>Images</label>
                    <input className='form-control col-md-6' type="file" accept=".jpg, .jpeg, .png" multiple="multiple" onChange={handleInputFileChange} name="websitefiles" />

                </div>
                <div className='pb-2 pt-4'>
                <button className='btn btn-primary mx-2' type="button" onClick={() => props.setshowFormulaire(false)}>Annuler</button>
                <button className='btn btn-primary' type="submit"> Confirmer <i className="bi bi-send" /></button>

                </div>
               

            </form>
        </>
    )
}
