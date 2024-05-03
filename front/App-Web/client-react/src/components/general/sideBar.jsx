import React from 'react'
import { isAuthorised } from '../../services/api/api'


import { useNavigate } from 'react-router-dom';
import { deconnecter } from '../../services/api/api';
import { slide as Menu } from 'react-burger-menu'

export default function SideBar() {

        const seDeconnecter = () => {
                deconnecter()
        }
        return (

                <Menu>
                        <a className="menu-item" href="/">  <i className="bi bi-house-door-fill" style={{ fontSize: '1.75em' }} /><span>Home</span></a>
                        <a className="menu-item" href="/articles"><i className="bi bi-newspaper" style={{ fontSize: '1.75em' }} /><span>Articles</span></a>
                        <a className="menu-item" href="/topics"><i className="bi bi-chat-left-dots" style={{ fontSize: '1.75em' }} /><span>Topics</span></a>
                        <a className="menu-item" href="/cryptoMonnaies"><i className="bi bi-currency-bitcoin" style={{ fontSize: '1.75em' }} /><span>Cryptomonnaies</span></a>
                        <a className="menu-item" href="/check-site"><i className="bi bi-shield-check" style={{ fontSize: '1.75em' }} /><span>Check-site</span></a>

                        {isAuthorised(['ROLE_USER'])
                                ?
                                <a href="/vos-cryptos" >
                                        <i className="bi bi-wallet-fill" style={{ fontSize: '1.75em' }} />
                                        <span>Vos cryptos</span>
                                </a>
                                : <></>

                        }

                        {isAuthorised(['ROLE_USER'])
                                ?
                                <a href="/mon-compte" >
                                        <i className="bi bi-person-fill" style={{ fontSize: '1.75em' }} />
                                        <span>Mon compte</span>
                                </a>
                                : <></>

                        }

                        {isAuthorised(['ROLE_ADMIN'])
                                ?
                                <a href="/admin/homeAdmin">
                                        <i className="bi bi-person-check-fill" style={{ fontSize: '1.75em' }} />
                                        <span>Administration</span>
                                </a>
                                :
                                <></>
                        }



                        {isAuthorised(['ROLE_USER'])
                                ?



                                <a onClick={seDeconnecter}>
                                        <i className="bi bi-power" style={{ fontSize: '1.75em' }} />
                                        <span>Se deconnecter</span>
                                </a>



                                :


                                <a href="/login">
                                        <i className="bi bi-person-fill" style={{ fontSize: '1.75em' }} />
                                        <span>Se connecter</span>
                                </a>

                        }


                </Menu >
        )
}
