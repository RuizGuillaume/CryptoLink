import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, clearInfoUser } from '../services/api/api'
import SideBar from '../components/general/sideBar';

export default function Login() {

  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  toast.configure()


  const handleChange = (event) => {

    const value = event.currentTarget.value
    const name = event.currentTarget.name

    setCredentials({ ...credentials, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    //Ajax
    const url = BASE_URL + 'user/authenticate'
    const result = axios.post(url, credentials)
    result.then(
      (response) => {

        if (response.data.token !== undefined) {
          clearInfoUser()
          window.localStorage.setItem("token", response.data.token)
          toast.success("Vous avez été connectés")
          navigate("/mon-compte")
        }
        else {
          toast.error("Une erreur est survenue lors de la tentative de connexion")
        }

      }
    )
      .catch((error) => {
        toast.error("Une erreur est survenue lors de la tentative de connexion")
      }
      )
  }

  return (
    <div className='gradient-custom w-100 h-100'>
      <SideBar />
      <form onSubmit={handleSubmit} >
        <div className="container py-4 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">

                  <div className="mb-md-5 mt-md-4 pb-2">

                    <h2 className="fw-bold mb-2 text-uppercase" style={{ color: 'white' }}>Page de connexion</h2>
                    <p className="text-white-50 mb-5" >Tapez vos informations de connexion</p>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typeEmailX">Email</label>
                      <input type="email" id="typeEmailX" value={credentials.email} autoComplete='e-mail' name="email" onChange={handleChange} placeholder="Email" required={true} className="form-control form-control-lg" />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typePasswordX">Mot de passe</label>
                      <input type="password" value={credentials.password} onChange={handleChange} name="password" autoComplete="current-password" required={true} placeholder="Mot de passe" id="password" className="form-control form-control-lg" /> 
                    </div>

                    <p className="small mb-4 pb-lg-2"><Link className="text-white-50" to="/mot-de-passe-oubliee">Mot de passe oublié ?</Link></p>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Se connecter</button>
                  </div>
                  <div>
                    <p className="">Vous n'avez pas de compte ? <Link to="/inscription" className="text-white-50 fw-bold">S'inscrire</Link></p>
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
