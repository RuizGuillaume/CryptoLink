import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { postMultipart } from '../../../services/api/api';

export default function ModalAjoutUtilisateur(props) {

    const [credentials, setCredentials] = useState(
        {
            email: '',
            password: '',
            confpassword: '',
            pseudo: '',
            avatarfile: null,
        })

    const handleClose = () => props.setShow(false);

    const handleInputFileChange = (event) => {
        setCredentials({ ...credentials, [event.currentTarget.name]: event.target.files[0] })
    }

    const handleChange = (event) => {

        let value = event.currentTarget.value
        const name = event.currentTarget.name
        setCredentials({ ...credentials, [name]: value })
    }

    const ajouter = async (e) => {
        e.preventDefault()
        if(credentials.password === credentials.confpassword){
            let formData = new FormData();    //formdata object

            formData.set('email', credentials.email);
            formData.set('password', credentials.password);
            formData.set('pseudo', credentials.pseudo);
            formData.append('avatarfile', credentials.avatarfile);    //append the values with key, value pair
            let response = await postMultipart('user', formData);

            if (response === 200) {
                toast.success(`L'utilisateur a été ajouté avec succès`)
                props.setDataModified(true)
                props.setShow(false)
                setCredentials({})
            }
            else {
                toast.error('Une erreur est survenue')
            }
        }
        else{
            toast.warning('Les mots de passe ne correspondent pas')
        }

    }

    return (
        <>
            <Modal dialogClassName="modalUtilisateur" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Ajout d'un utilisateur</Modal.Title>
                </Modal.Header>
                <form onSubmit={ajouter} >
                    <Modal.Body>

                        <label>Email</label>
                        <input className='form-control col-md-6' value={credentials.email} onChange={handleChange} name="email" type="Email" placeholder='@' required={true} />

                        <label>Mot de passe</label>
                        <input className='form-control col-md-6' value={credentials.password} onChange={handleChange} name="password" type="password" placeholder='***' required={true} />

                        <label>Confirmation mot de passe</label>
                        <input className='form-control col-md-6' value={credentials.confpassword} onChange={handleChange} name="confpassword" type="password" placeholder='***' required={true} />

                        <label>Pseudo</label>
                        <input className='form-control col-md-6' value={credentials.pseudo} onChange={handleChange} name="pseudo" type="text" placeholder='Pseudo' required={true} />

                        <div className="form-outline form-white">
                            <label>Avatar</label>
                            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleInputFileChange} name="avatarfile" className="form-control" />
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
