import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { post } from '../services/api/api'

export default function MailResetPassword() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [isSend, setIsSend] = useState(false)
    toast.configure()


    const handleChange = (event) => {

        const value = event.currentTarget.value
        const name = event.currentTarget.name

        setCredentials({ ...credentials, [name]: value })
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await post('forgot_password', credentials)
        if(response.status === 200){
            setIsSend(true)
        }
        else{
            toast.error(response.statusText)
        }
    }

    return (
        !isSend ?
            <form onSubmit={handleSubmit}>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4 pb-5">

                                            <h2 className="fw-bold mb-2 text-uppercase" style={{ color: 'white' }} >Mot de passe oubliée</h2>
                                            <p className="text-white-50 mb-5" >Saisissez votre email d'authentification</p>

                                            <div className="form-outline form-white mb-4">
                                                <label className="form-label" for="typeEmailX">Email</label>
                                                <input type="email" id="typeEmailX" value={credentials.email} name="email" onChange={handleChange} placeholder="Email" required="true" className="form-control form-control-lg" />
                                            </div>


                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">envoyer</button>


                                        </div>

                                        <div>
                                            <p className="mb-0"> <Link to="/login" className="text-white-50 fw-bold">Revenir à l'écran de connexion</Link></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
            :
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <h3 className="text-white">Un mail de récupération de mot de passe a été envoyé a l'adresse mail : {credentials.email}   </h3>
                        </div>
                    </div>
                </div>
            </section>
    )
}