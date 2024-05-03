import React, { useEffect, useState } from 'react'
import SideBar from '../components/general/sideBar'
import { getDataArray } from '../services/api/api'
import LigneCryptoUser from '../components/cryptoUser/ligneCryptoUser';
import ModalAjoutCryptoUser from '../components/cryptoUser/modalAjoutCryptoUser';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import CourbeCryptoUser from '../components/cryptoUser/courbeCryptoUser';
import dateFormat from "dateformat";
import Footer from '../components/general/footer';

export default function CryptoUser() {

    const [usersCoins, setUsersCoins] = useState([])
    const [datasCourbe, setDatasCourbe] = useState([])
    const [datasCourbeUserCoin, setDatasCourbeUserCoin] = useState([])

    const [total, setTotal] = useState(0)
    const [tendance, setTendance] = useState(0)


    const [isDataModified, setDataModified] = useState(false)
    const [showAjout, setShowAjout] = useState(false)
    const [itemOffset, setItemOffset] = useState(0);

    const getUsersCoins = async () => {
        let dataArray = await getDataArray('userscoins')
        setUsersCoins(dataArray)
        let flag = false
        let coidIds = ""
        let total = 0.00
        if (dataArray !== undefined) {
            let dataCourbeArray = []
            let dataCourbeArrayUserCoin = []
            let prixDeduitDeLaValeurActuelle = 0
            dataArray.forEach(userCoin => {
                total += userCoin.buying_price * userCoin.quantity
                if (flag) {
                    coidIds += ',' + userCoin.id_coins
                }
                else {
                    coidIds += userCoin.id_coins
                    flag = true
                }

            });
            setTotal(total)
            let coinsgeckoData = []
            await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&ids=${coidIds}&order=market_cap_desc&per_page=100&page=1&sparkline=falses
            `)
                .then(res => {
                    coinsgeckoData = res.data
                })

            if (coinsgeckoData !== undefined) {
                dataArray.forEach(userCoin => {
                    coinsgeckoData.forEach(coingeckoData => {

                        if (coingeckoData.id === userCoin.id_coins) {

                            let prixDeduitDeLaValeurActuelleLigne = coingeckoData.current_price * userCoin.quantity
                            const x = new Date(userCoin.buying_date).getTime()
                            const totalDeLaLigne = ( userCoin.buying_price * userCoin.quantity )
                            prixDeduitDeLaValeurActuelle += prixDeduitDeLaValeurActuelleLigne
                            dataCourbeArray.push({ x: x, y: prixDeduitDeLaValeurActuelleLigne.toFixed(2)})
                            dataCourbeArrayUserCoin.push({ x: x , y: totalDeLaLigne.toFixed(2) })

                        }
                    });

                });
                setDatasCourbe(dataCourbeArray)
                setDatasCourbeUserCoin(dataCourbeArrayUserCoin)
                let trend = (prixDeduitDeLaValeurActuelle / total) * 100

                if (prixDeduitDeLaValeurActuelle < total) {
                    trend = trend * -1
                }
                setTotal(total.toFixed(2))
                setTendance(trend.toFixed(2))
            }
        }

    }



    useEffect(() => {
        getUsersCoins()
        setDataModified(false)
    }, [isDataModified])


    /* paginate */

    const itemsPerPage = 3

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % usersCoins.length;
        setItemOffset(newOffset);
    };

    const endOffset = itemOffset + itemsPerPage;

    const usersCoinsEncours = usersCoins.slice(itemOffset, endOffset);
    const pageCount = (Math.ceil(usersCoins.length / itemsPerPage));
    return (
        <>
            <SideBar />
            <div className='container' style={{ paddingTop: '5rem' }}>
                <h1 style={{ textAlign: 'center' }}>Vos cryptos</h1>

                
                {usersCoins === undefined || usersCoins === null || usersCoins.length <= 0
                    ?
                    <><h3 style={{ textAlign: 'center', paddingTop: '10rem' }}>Commencez par <a style={{ textDecoration: 'underline', cursor: 'grab' }} onClick={() => setShowAjout(true)}>ajouter</a> une cryptoMonnaie à votre espace  </h3></>
                    :
                    <>
                    <p>{`Courbe de vos actif ( ${total}€ )  `}</p>
                <CourbeCryptoUser data={datasCourbe} dataUserCoin={datasCourbeUserCoin} currency={'EUR'} total={total} tendance={tendance} />
                        <br />
                        <div className='table-responsive-xl'>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Logo</th>
                                        <th>Nom</th>
                                        <th>Date</th>
                                        <th>Quantite</th>
                                        <th>Prix</th>
                                        <th>Total</th>
                                        <th colSpan={2}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersCoinsEncours.map((userCoin, index) => {
                                        return (
                                            <tr key={index}>
                                                <LigneCryptoUser userCoin={userCoin} setDataModified={setDataModified} />
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </>

                }



                <ReactPaginate
                    breakLabel="..."
                    nextLabel="&raquo;"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="&laquo;"
                    renderOnZeroPageCount={null}
                    activeClassName='active'
                    containerClassName='pagination pagination'
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                />


                <ModalAjoutCryptoUser show={showAjout} setShow={setShowAjout} setDataModified={setDataModified} />
                <a onClick={() => setShowAjout(true)} style={{ fontSize: '40px' }} className="floatWrite">
                    <i className="bi bi-plus" />
                </a>


            </div>
                                    <Footer/>

        </>
    )
}
