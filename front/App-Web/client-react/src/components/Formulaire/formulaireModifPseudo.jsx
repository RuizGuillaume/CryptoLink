import React , { useState } from 'react';
import { toast } from 'react-toastify';
import { put } from '../../services/api/api';

export default function FormulaireModifPseudo(props) {
    toast.configure()

    const [credentials, setCredentials] = useState({ email: props.user.email, pseudo: props.user.pseudo })

    const handleChange = (event) => {

        const value = event.currentTarget.value
        const name = event.currentTarget.name

        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if( credentials.pseudo === undefined || credentials.pseudo.trim() === '') {
          toast.error('Le champ pseudo ne peut pas etre vide  ')
          return

        }
 
        put( 'user' , credentials);
        toast.success('Votre Pseudo a été modifié avec succès')
        localStorage.removeItem('infoUser')
        props.setIsDataModified(true)
    }
    return (
            <form onSubmit={handleSubmit}> 
                <div className="row g-12 align-items-center ">
                    <div className="col-auto">
                        <label className="col-form-label">Modifier votre Pseudo</label>
                    </div>
                    <div className="col-auto justify-content-center">
                        <input type="text" className="form-control" onChange={handleChange} value={credentials.pseudo} name="pseudo" required />
                    </div>
                    <div className="col-auto">
                        <button className='btn btn-primary'>Valider</button>
                    </div>
                </div>
            </form>
    )
}
