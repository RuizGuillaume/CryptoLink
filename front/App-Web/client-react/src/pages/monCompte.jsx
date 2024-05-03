import React, { useEffect, useState } from 'react'
import FormulaireModifEmail from '../components/Formulaire/formulaireModifEmail'
import FormulaireModifImage from '../components/Formulaire/formulaireModifImage'
import FormulaireModifMotDepasse from '../components/Formulaire/formulaireModifMotDepasse'
import FormulaireModifPseudo from '../components/Formulaire/formulaireModifPseudo'
import { getInfoUser } from '../services/api/api'
import { getImageUrl } from '../services/env';
import SideBar from '../components/general/sideBar';
import Footer from '../components/general/footer'





export default function MonCompte() {

    const [user, setUser] = useState({})
    const [isModifEmail, setIsModifEmail] = useState(false)
    const [isModifPseudo, setIsModifPseudo] = useState(false)
    const [isModifPassword, setIsModifPassword] = useState(false)
    const [isModifImage, setIsModifImage] = useState(false)
    const [isDataModified, setIsDataModified] = useState(false)

    const getUser = async () => {
        setUser(await getInfoUser(true))
    }

    useEffect(() => {
        getUser()
        setIsModifEmail(false)
        setIsModifPseudo(false)
        setIsModifPassword(false)
        setIsDataModified(false)
        setIsModifImage(false)
    }, [isDataModified])


    const modifierEmail = () => {
        setIsModifEmail(true)
        setIsModifPseudo(false)
        setIsModifPassword(false)
        setIsModifImage(false)

    }


    const modifierPseudo = () => {
        setIsModifEmail(false)
        setIsModifPseudo(true)
        setIsModifPassword(false)
        setIsModifImage(false)

    }


    const modifierMotDePasse = () => {
        setIsModifEmail(false)
        setIsModifPseudo(false)
        setIsModifPassword(true)
        setIsModifImage(false)

    }

    const modifierImage = () => {
        setIsModifEmail(false)
        setIsModifPseudo(false)
        setIsModifPassword(false)
        setIsModifImage(true)

    }


    return (
        <>
            <SideBar />

            <div className='container' style={{ paddingTop: '5%', paddingBottom: '3rem' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '2%' }}>Mon compte</h1>

                <div className='table-responsive-xl'>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td><b>{user.email}</b></td>
                                <td><button className='btn btn-primary' onClick={modifierEmail}>Modifier</button></td>
                            </tr>

                            <tr>
                                <td>Pseudo</td>
                                <td><b>{user.pseudo}</b></td>
                                <td><button className='btn  btn-primary' onClick={modifierPseudo}>Modifier</button></td>
                            </tr>

                            <tr>
                                <td>Mot de passe</td>
                                <td><b>..........</b></td>
                                <td><button className='btn  btn-primary' onClick={modifierMotDePasse}>Modifier</button></td>
                            </tr>

                            <tr>
                                <td>Avatar</td>
                                <td><img style={{ borderRadius: '100%' }} width={75} height={75} alt='' src={getImageUrl() + user.avatar} /> </td>
                                <td><button className='btn  btn-primary' onClick={modifierImage}>Modifier</button></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                {isModifEmail ?
                    <FormulaireModifEmail user={user} />
                    :
                    <></>

                }
                {
                    isModifPseudo ?
                        <FormulaireModifPseudo isDataModified={isDataModified} setIsDataModified={setIsDataModified} user={user} />
                        :
                        <></>


                }
                {
                    isModifPassword ?
                        <FormulaireModifMotDepasse user={user} />
                        :
                        <></>



                }
                {
                    isModifImage ?
                        <FormulaireModifImage isDataModified={isDataModified} setIsDataModified={setIsDataModified} user={user} />
                        :
                        <></>
                }
            </div>
            <Footer />
        </>
    )
}
