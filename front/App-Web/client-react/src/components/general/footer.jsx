import React from 'react'

export default function Footer() {
    return (
        <footer className="footer" style={{display : 'block' , overflow : 'hidden'}}>
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center pt-4">
                        <h3 className="footer-heading"><a  href="http://cryptolink.enzo-rossi.fr/"  style={{color : '#fff' , textDecoration : 'none'}} className="logo">cryptolink.enzo-rossi.fr</a></h3>
                        <p  className="menu pt-4">
                            <a className='lien-footer' href="/home">Home</a>
                            <a className='lien-footer' href="/articles">Articles</a>
                            <a className='lien-footer' href="/topics">Topics</a>
                            <a className='lien-footer' href="/cryptoMonnaies">CryptoMonnaies</a>
                            <a className='lien-footer' href="/check-site">Check-site</a>
                            
                        </p>
                        <ul className="ftco-footer-social p-0">
                            <li  className="ftco-animate"><a className='lien-image-footer' href="https://twitter.com/" ><i className="bi bi-twitter"></i></a></li>
                            <li className="ftco-animate"><a className='lien-image-footer' href="https://fr-fr.facebook.com/" ><i className="bi bi-facebook"></i></a></li>
                            <li className="ftco-animate"><a className='lien-image-footer' href="https://www.instagram.com/" ><i className="bi bi-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12 text-center text-white">
                        <p>
                            Copyright ©{new Date().getFullYear()} 2022 Tous droits réservés
                        </p>
                    </div>
                </div>
        </footer>
    )
}
