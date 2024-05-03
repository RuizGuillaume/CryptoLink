import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate , useParams} from 'react-router-dom';
import { postResetPassword } from '../services/api/api'

export default function ResetPassword() {

    
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ password: '' ,  confirmPassword  : '' })
  toast.configure()

  let {token} = useParams()

  const handleChange = (event) => {

    const value = event.currentTarget.value
    const name = event.currentTarget.name

    setCredentials({ ...credentials, [name]: value })
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    if(credentials.password !== credentials.confirmPassword)
    {
        toast.error('Le mots de passe et sa confirmation ne se correspondent pas ! ')
        return
    }

    if( credentials.password  === undefined ||  credentials.password.trim() === '' )
    {
      toast.error('Le champs mot de passe ne peut pas etre vide  ')
      return

    }
    if( credentials.confirmPassword === undefined || credentials.confirmPassword.trim() === '') {
      toast.error('Le champ confirmation mot de passe ne peut pas etre vide  ')
      return

    }
    //Ajax
    const result = await postResetPassword(token , credentials) 
    if(result.status === 200){
        toast.success(result.message)     
        navigate("/login")
   
    }
    else {
        toast.error(result.data)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase" style={{color : 'white'}} >Page de modification du mot de passe </h2>

                  <br/>
                  <div className="form-outline form-white mb-4">
                      <label htmlFor="inputPassword4">Mot de passe</label>
                        <input type="password" className="form-control" value={credentials.password}  onChange={handleChange} name="password" placeholder="Mot de passe" required={true}/>
                      </div>
                        
                      <div className="form-outline form-white mb-4">
                      <label htmlFor="inputPassword4">Confirmation du mot de passe</label>
                        <input type="password" className="form-control" value={credentials.confirmPassword}  onChange={handleChange} name="confirmPassword" placeholder="Confirmation du mot de passe" required={true} />
                      </div>


                  <button className="btn btn-outline-light btn-lg px-5" type="submit">Modifier</button>


                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </form>
  )
}
