import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Courbe from '../components/general/courbe'
import SideBar from '../components/general/sideBar'
import { getData, getDataArray } from '../services/api/api'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import LigneArticleHome from '../components/home/ligneArticleHome'
import CourbeCandle from '../components/general/courbecandle';
import Footer from '../components/general/footer'

export default function Home() {
  const [datasCourbe, setdatascourbe] = useState([])
  const [announcement, setAnnouncement] = useState()
  const [articles, setArticles] = useState([])
  const [coin, setCoin] = useState({});
  const [prixActuelle, setPrixActuelle] = useState('')
  const [pourcentage, setPourcentage] = useState(0.00)

  const getAnnouncement = async () => {
    setAnnouncement(await getData('announcement'))
  }

  const getArticles = async () => {
    setArticles(await getDataArray('lastarticles'))
  }

  const getDatas = async (coinsDatas) => {
    let randomNumber = Math.floor(Math.random() * coinsDatas.length)
    let dataArray = []
    if (coinsDatas[randomNumber].id_coins !== undefined && coinsDatas[randomNumber].id_coins.trim() !== '') {
      let dateAuTimeStamp = Math.floor(new Date().getTime() / 1000.0)
      let dateDuTimeStamp = Math.floor(new Date(new Date().setHours(new Date().getHours() - 48)).getTime() / 1000.0)

      await axios.get(`https://api.coingecko.com/api/v3/coins/${coinsDatas[randomNumber].id_coins}/market_chart/range?vs_currency=eur&from=${dateDuTimeStamp}%20&to=${dateAuTimeStamp}%20`)
      .then(res => {
          const dataArray = res.data.prices;
          let datacourbe = []
          dataArray.map((data, index) => {
              datacourbe.push({x: new Date(data[0]), y:data[1]})
              return
          })
          setdatascourbe(datacourbe)
      })
    }
    await axios.get(`https://api.coingecko.com/api/v3/coins/${coinsDatas[randomNumber].id_coins}/`)
      .then(res => {
        setPrixActuelle(res.data.market_data.current_price.eur.toFixed(2) + "€ ")
        setPourcentage(res.data.market_data.price_change_percentage_24h_in_currency.eur.toFixed(2))
      })
    setCoin(coinsDatas[randomNumber])
  }

  useEffect(() => {
    const getCoin = async () => {
      let coinsDatas = await getDataArray('coins/homepage')
      await getDatas(coinsDatas)
    }
    getCoin()
    getAnnouncement()
    getArticles()

  }, [])

  return (
    <>
      <SideBar />
      <div className="jumbotron p-5 p-md-5 text-white rounded bg-dark" style={{ textAlign: 'center' }}>
        <div className="">
          <h1 className="display-4 font-italic text-white">Cryptolink</h1>
          {announcement !== undefined && announcement !== null ?
            <>
              <p className="lead my-3">{announcement.message}</p>
            </>
            : <></>
          }

        </div>
      </div>

      { /* announcement !== undefined && announcement !== null
        ?
        <div style={{ paddingTop: '75px' }}>
          <div className="alert alert-dismissible bg-dark">
            <button type="button" className="btnClose" data-bs-dismiss="alert"><i className='bi bi-x-lg'></i></button>
            <strong style={{ color: 'white' }}>{announcement.message}</strong>
          </div>
        </div>
        :
        <div className="spinner-border text-dark" role="status" />
*/
      }
      <div className='container'>
        <br />
        <h1><a href="/cryptoMonnaies">cryptomonnaies</a></h1>
        <br />
        <div className='cryptoMonnaie' style={{ width: '100%', overflow: 'hidden' }}>
        <p>{`Cours du (${coin.symbol}) ${coin.name} `}</p>
              <Courbe  data={datasCourbe} currency='eur' name={coin.name} symbol={coin.symbol} />
          <div style={{  marginTop: '10px'  }}>
            <div style={{ textAlign: 'center' }}>
              <span>Prix actuelle : {prixActuelle} </span>
              {
                pourcentage >= 0
                  ?
                  <span style={{ color: 'green' }}>{pourcentage + '%'}
                    <i className="bi bi-arrow-up-right"></i>
                  </span>
                  :
                  <span style={{ color: 'red' }}>{pourcentage + '%'}
                    <i className="bi bi-arrow-down-left"></i>
                  </span>
              }
            </div>
            <div style={{marginLeft : '10px' , textAlign : 'center'}}>
              {
                coin.description === undefined || coin.description.length === 0 
                  ?
                  <></>
                  :
                    coin.description.length > 125 ?
                    <>
                  <>
                      <p className="card-text">{coin.description.substring(0, 125) + '...' }</p>
                      <a href='/cryptoMonnaies'>Consulter d'autres Cryptomonnaies</a>
                    </>                    </>
                    :

                    <>
                  <>
                      <p className="card-text">{coin.description}</p>
                      <a href='/cryptoMonnaies'>Consulter d'autres Cryptomonnaies</a>
                    </>                    </>
                }

            </div>
          </div>
        </div>

        <br />

        <h1><a href="/articles">Nos derniers Articles</a></h1>

        {articles !== undefined && articles !== null && articles.length > 0
          ?
          <div className="card-columns listrecent listArticleHome">
            <div className="row">
              {articles.map((article, index) => {
                return (
                  <div key={index} className="card mx-3" style={{maxWidth : "350px"}}>
                    <LigneArticleHome mesArticles={false} index={index} article={article} key={index} />
                  </div>
                )
              })}
            </div>
          </div>
          :
          <div className="spinner-border text-dark" role="status" />
        }
      </div>
      <Footer/>
    </>
  )
}
