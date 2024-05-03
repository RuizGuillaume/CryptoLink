import React , { useState } from 'react';
import { toast } from 'react-toastify';
import { put } from '../../services/api/api';

export default function FormulaireModifMotDepasse(props) {

    const [credentials, setCredentials] = useState({ email: props.email , password : '' , confirmationPassword : ''})

    toast.configure()


    const handleChange = (event) => {

        const value = event.currentTarget.value
        const name = event.currentTarget.name

        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if( credentials.password === undefined || credentials.password.trim() === '') {
          toast.error('Le champ mot de passe ne peut pas etre vide  ')
          return

        }

        if( credentials.confirmationPassword === undefined || credentials.confirmationPassword.trim() === '') {
            toast.error('Le champ corfirmation mot de passe ne peut pas etre vide  ')
            return
  
          }
   
          
        if(credentials.password !== credentials.confirmationPassword)
        {
            toast.error('Le mot de passe et sa confirmation ne se correspondent pas ! ')
            return
        }
        put( 'user' , credentials);
        toast.success('Votre mot de passe a été modifié avec succès')
        

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row g-12 align-items-center ">
                    <div className="col-auto">
                        <label className="col-form-label">mot de passe</label>
                    </div>
                    <div className="col-auto justify-content-center">
                        <input onChange={ handleChange} type="password" className="form-control" name="password"  required={true} />
                    </div>
                    <div className="col-auto">
                        <label className="col-form-label">Confirmez votre mot de passe</label>
                    </div>
                    <div className="col-auto justify-content-center">
                        <input  onChange={ handleChange}  type="password" className="form-control" name="confirmationPassword" required={true}/>
                    </div>
                    <div className="col-auto">
                        <button className='btn btn-primary'>Valider</button>
                    </div>
                </div>
            </form>


        </div>
    )
}
