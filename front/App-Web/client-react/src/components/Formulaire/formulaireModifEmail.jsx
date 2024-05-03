import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { deconnecter, put } from '../../services/api/api';


export default function FormulaireModifEmail(props) {


    toast.configure()

    const [credentials, setCredentials] = useState({ email: props.user.email, pseudo: props.user.pseudo })

    const handleChange = (event) => {

        const value = event.currentTarget.value
        const name = event.currentTarget.name

        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if( credentials.email === undefined || credentials.email.trim() === '') {
          toast.error('Le champ email ne peut pas etre vide  ')
          return

        }
 
        put( 'user' , credentials);
        toast.success('Votre email a été modifié avec succès')
        deconnecter()

    }

    return (
        <div>
            <form onSubmit={handleSubmit}> 
                <div className="row g-12 align-items-center ">
                    <div className="col-auto">
                        <label  className="col-form-label">Modifier votre email</label>
                    </div>
                    <div className="col-auto justify-content-center">
                        <input type="email" className="form-control" name="email" onChange={handleChange} value={credentials.email} required={true}/>
                        <span style={{color : 'red'}}>Attention cette modification va vous deconnecter</span>
                    </div>
                    <div className="col-auto">
                        <button className='btn btn-primary'>Valider</button>
                    </div>
                </div> 
            </form>
        </div>
    )
}
