import React, { useState } from 'react';
import { postMultipart } from '../services/api/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../components/general/sideBar';

export default function Register() {
  const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '', pseudo: '', avatarfile: null })
  toast.configure()
  const navigate = useNavigate()

  const handleChange = (event) => {

    const value = event.currentTarget.value
    const name = event.currentTarget.name

    setCredentials({ ...credentials, [name]: value })
  }

  const handleInputFileChange = (event) => {
    setCredentials({ ...credentials, [event.currentTarget.name]: event.target.files[0] })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    //Ajax

    if (credentials.email === undefined || credentials.email.trim() === '') {
      toast.error('Le champ email  ne peut pas etre vide')
      return
    }
    if (credentials.password === undefined || credentials.password.trim() === '') {
      toast.error('Le champs mot de passe ne peut pas etre vide')
      return
    }
    if (credentials.confirmPassword === undefined || credentials.confirmPassword.trim() === '') {
      toast.error('Le champ confirmation mot de passe ne peut pas etre vide')
      return
    }

    if (credentials.pseudo === undefined || credentials.pseudo.trim() === '') {
      toast.error('Le champ pseudo ne peut pas etre vide')
      return
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error('Les mots de passe saisis ne correspondent pas !')
      return
    }

    /*data.append('email', credentials.email)
    data.append('password', credentials.password)
    data.append('pseudo', credentials.pseudo)*/
    let formData = new FormData();    //formdata object
    formData.set('email', credentials.email);
    formData.set('pseudo', credentials.pseudo);
    formData.set('password', credentials.password);
    formData.append('avatarfile', credentials.avatarfile);    //append the values with key, value pair
    let response = await postMultipart('user', formData);
    if (response === 200) {
      toast.success('Votre compte a été créé avec succès')
      navigate('/login')
    }
    else {
      toast.error('Une erreur est survenue')
    }


  }

  return (

    <div className='gradient-custom w-100 h-100'>
      <SideBar />
      <form className='gradient-custom' onSubmit={handleSubmit}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                  <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-2">

                      <h2 className="fw-bold mb-2 text-uppercase" style={{ color: 'white' }} >Formulaire d'inscription</h2>

                      <div className="form-outline form-white mb-4">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={handleChange} name="email" placeholder="Email" required={true} />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <label htmlFor="inputPassword4">Mot de passe</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={handleChange} name="password" placeholder="Mot de passe" required={true} />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <label htmlFor="inputPassword4">Confirmation du mot de passe</label>
                        <input type="password" className="form-control" value={credentials.confirmPassword} onChange={handleChange} name="confirmPassword" placeholder="Confirmation du mot de passe" required={true} />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <label htmlFor="inputAddress">Pseudo</label>
                        <input type="text" className="form-control" value={credentials.pseudo} onChange={handleChange} name="pseudo" placeholder="Pseudo" required={true} />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <label >Avatar</label>
                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleInputFileChange} name="avatarfile" className="form-control" />
                      </div>


                      < br />

                      <button className="btn btn-outline-light btn-lg px-5" type="submit">S'inscrire</button>


                    </div>

                    <div>
                      <p className="mt-1">Vous avez un compte ? <Link to="/login" className="text-white-50 fw-bold">Se connecter</Link></p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
      </form>
    </div>
  )
}
