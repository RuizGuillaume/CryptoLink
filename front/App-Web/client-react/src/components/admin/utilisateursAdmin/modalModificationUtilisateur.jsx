import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getDataArray, put, putMultipart } from '../../../services/api/api';
import Multiselect from 'multiselect-react-dropdown';

export default function ModalModificationUtilisateur(props) {
    const [rights, setRights] = useState([])
    const [userright, setUserright] = useState([])
    const [selectedright, setSelectedRight] = useState([])
    const [credentials, setCredentials] = useState(
        {
            email: '',
            password: '',
            confpassword: '',
            pseudo: '',
            avatarfile: null,
        })

    async function getRights() {
        let datas = await getDataArray('rights')
        setRights(datas)
    }

    async function getUserRight() {
        let datas = await getDataArray('userright/' + props.user.id_user)
        setUserright(datas)
    }

    const onSelect = (event) => {
        setSelectedRight(event)
    };

    const onRemove = (event) => {
        setSelectedRight(event)
    };

    useEffect(() => {
        getRights()
        getUserRight()
        setCredentials
            ({
                ...credentials,
                ['email']: props.user.email,
                ['pseudo']: props.user.pseudo
            })
    }, [props])

    const handleClose = () => props.setShow(false);

    const handleInputFileChange = (event) => {
        setCredentials({ ...credentials, [event.currentTarget.name]: event.target.files[0] })
    }


    const handleChange = (event) => {

        let value = event.currentTarget.value
        const name = event.currentTarget.name
        setCredentials({ ...credentials, [name]: value })
    }

    const modifier = async (e) => {
        e.preventDefault()
        if (credentials.password === credentials.confpassword) {
            let formData = new FormData();    //formdata object

            formData.set('email', credentials.email);
            if (credentials.password !== undefined && credentials.password.trim() !== '') {
                formData.set('password', credentials.password);
            }
            formData.set('pseudo', credentials.pseudo);
            formData.append('avatarfile', credentials.avatarfile);    //append the values with key, value pair
            let response = await putMultipart('admin/user/' + props.user.id_user, formData);

            if (response === 200) {
                toast.success(`L'utilisateur a été modifié avec succès`)
                let res = await put('userright/' + props.user.id_user, {rights: selectedright})
                if(res !== 200) {
                    toast.warning("Erreur lors de la modification des droits de l'utilisateur")
                }
                props.setDataModified(true)
                props.setShow(false)

            }
            else {
                toast.error('Une erreur est survenue')
            }
        }
        else {
            toast.warning('Les mots de passe ne correspondent pas')
        }

    }

    return (
        <>
            <Modal id={'modalModif' + props.user.id_user} dialogClassName="modalUtilisateur" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modification de l'utilisateur</Modal.Title>
                </Modal.Header>
                <form onSubmit={modifier} >
                    <Modal.Body>
                        <p style={{ fontWeight: 'lighter', fontSize: '75%' }}>Remplissez seulement les champs que vous souhaitez modifier</p>
                        <label>Email</label>
                        <input className='form-control col-md-6' value={credentials.email} onChange={handleChange} name="email" type="Email" placeholder='@' />

                        <label>Mot de passe</label>
                        <input className='form-control col-md-6' value={credentials.password} onChange={handleChange} name="password" type="password" placeholder='***' />

                        <label>Confirmation mot de passe</label>
                        <input className='form-control col-md-6' value={credentials.confpassword} onChange={handleChange} name="confpassword" type="password" placeholder='***' />

                        <label>Pseudo</label>
                        <input className='form-control col-md-6' value={credentials.pseudo} onChange={handleChange} name="pseudo" type="text" placeholder='Pseudo' />

                        <div className="form-outline form-white">
                            <label>Avatar</label>
                            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleInputFileChange} name="avatarfile" className="form-control" />
                        </div>
                        <br/>
                        {
                            props.verifyUser() ?
                            <>
                                <label>Droits d'accès</label>
                                <Multiselect
                                    disable={true}
                                    id={props.user.id_user}
                                    options={rights}
                                    selectedValues={userright}
                                    placeholder=""
                                    emptyRecordMsg=""
                                    onSelect={onSelect}
                                    onRemove={onRemove}
                                    displayValue="label"
                                />
                            </>
                            :
                            <>
                                <label>Droits d'accès</label>
                                <Multiselect
                                    id={props.user.id_user}
                                    options={rights}
                                    selectedValues={userright}
                                    placeholder=""
                                    emptyRecordMsg=""
                                    onSelect={onSelect}
                                    onRemove={onRemove}
                                    displayValue="label"
                                />
                            </>
                        }
                        
                        
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
