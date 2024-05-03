import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from '../../components/general/sideBar'
import { isAuthorised } from '../../services/api/api'

export default function HomeAdmin() {

    return (
        <>
            {
                isAuthorised(['ROLE_ADMIN'])
                    ?
                    <>
                        <SideBar />
                        <h1 style={{paddingTop : '25px' , textAlign : 'center'}}>Administration du site</h1>
                        <div style={{margin: 'auto'}} className='row'>
                            <div className='col-5 offset-1 mt-5'>
                                <Link to={"/admin/cryptoMonnaies"}>
                                    <div className="card mb-3" style={{maxWidth: "30rem"}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img style={{width: "100%"}} src="https://img.freepik.com/vecteurs-libre/icone-bitcoin-symbole-paiement-logo-crypto-monnaie-symbole-change-monnaie-virtuelle-conception-noir-blanc-pieces-financement-internet-illustration-vectorielle-simple-isolee_545793-776.jpg?w=2000" className="img-fluid rounded-start" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <p className="card-text text-center">Administration des cryptomonnaies</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className='col-5 offset-1 mt-5'>
                                <Link to={"/admin/utilisateurs"}>
                                    <div className="card mb-3" style={{maxWidth: "30rem"}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img style={{width: "100%"}} src="https://thumbs.dreamstime.com/b/la-personne-de-sous-traitance-vecteur-d-ic%C3%B4ne-avec-le-symbole-des-femmes-sur-monde-avatar-profil-utilisateur-ordinateur-portable-197399733.jpg" className="img-fluid rounded-start" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <p className="card-text text-center">Administration des utilisateurs</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div style={{margin: 'auto'}} className='row'>
                            <div className='col-5 offset-1 mt-5'>
                                <Link to={"/admin/bandeau"}>
                                    <div className="card mb-3" style={{maxWidth: "30rem"}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img style={{width: "100%"}} src="https://cdn.ffbridge.fr/cms/articles/0001/10/thumb_9362_articles_large.png" className="img-fluid rounded-start" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <p className="card-text text-center">Administration du bandeau de communication</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className='col-5 offset-1 mt-5'>
                                <Link to={"/admin/check-site-admin"}>
                                    <div className="card mb-3" style={{maxWidth: "30rem"}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img style={{width: "100%"}} src="https://us.123rf.com/450wm/tatianasun/tatianasun1612/tatianasun161200307/68938335-verrouiller-le-vecteur-de-logo-symbole-de-s%C3%A9curit%C3%A9-cadenas-pour-la-conception-de-site-web-ic%C3%B4ne-de-v.jpg" className="img-fluid rounded-start" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <p className="card-text text-center">Administration de check-site</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        
                        
                        
                    </>
                    :
                    <></>
            }


        </>
    )
}
