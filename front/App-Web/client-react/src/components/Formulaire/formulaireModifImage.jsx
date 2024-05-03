import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { deconnecter, putMultipart } from '../../services/api/api';


export default function FormulaireModifImage(props) {


    toast.configure()

    const [credentials, setCredentials] = useState({ email: props.user.email, avatarfile : props.user.avatar })

    const handleInputFileChange = (event) => {

        setCredentials({ ...credentials, [event.currentTarget.name]:  event.target.files[0]})
 
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        let formData = new FormData();    //formdata object

        formData.set('email' ,  credentials.email)
        formData.append('avatarfile' ,  credentials.avatarfile)

        let response = await  putMultipart( 'user' , formData);
        if(response === 200){
            toast.success('Votre image a été modifié avec succès')
            localStorage.removeItem('infoUser')
            props.setIsDataModified(true)

        }
        else {
            toast.error('Une erreur est survenue')

        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}> 
                <div className="row g-12 align-items-center ">
                    <div className="col-auto">
                        <label  className="col-form-label">Modifier votre image</label>
                    </div>
                    <div className="col-auto justify-content-center">
                    <input type="file" accept=".jpg, .jpeg, .png" onChange={handleInputFileChange} name="avatarfile" className="form-control"  required={true} />
                    </div>
                    <div className="col-auto">
                        <button className='btn btn-primary'>Valider</button>
                    </div>
                </div> 
            </form>
        </div>
    )
}
