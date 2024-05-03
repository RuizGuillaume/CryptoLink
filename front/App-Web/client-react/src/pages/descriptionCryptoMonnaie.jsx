import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Courbe from '../components/general/courbe'
import { getDataArray } from '../services/api/api';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getImageUrl } from '../services/env';
import RadioButton from '../components/general/radioButton';
import SideBar from '../components/general/sideBar';
import CourbeCandle from '../components/general/courbecandle';
import Footer from '../components/general/footer';

export default function DescriptionCryptoMonnaie() {

    const [datasCourbe, setdatascourbe] = useState([])
    const [isCandle, setIsCandle] = useState(false)
    const [coins, setCoins] = useState([])
    const [prixActuelle, setPrixActuelle] = useState('')
    const [pourcentage, setPourcentage] = useState(0.00)
    const [coin, setCoin] = useState(undefined)
    const [periode, setPeriode] = useState("1a")
    const [currency, setCurrency] = useState('eur')


    const handleTimeChange = (e) => {
        setPeriode(e.currentTarget.value)
    }

    const handleCurency = (e) => {
        setCurrency(e.currentTarget.value)
    }
    const handleChart = (e) => {
        if (e.currentTarget.value === undefined || e.currentTarget.value === '' || e.currentTarget.value === 'line') {
            setIsCandle(false)
        } else {
            setIsCandle(true)
        }
    }

    const onSelect = (event, newValue) => {
        if (newValue !== undefined && newValue !== null)
            setCoin(newValue)
    }
    const getCoins = async () => {

        let datas = await getDataArray('coins')
        let dataArray = []
        datas.forEach((data, index) => {
            let obj = { label: data.name, coin: data }
            dataArray.push(obj)
        })
        setCoins(dataArray)
        if (coin === undefined) {
            setCoin(dataArray[0])
        }

    }

    const getCoinInfo = async () => {
        if (coin !== undefined && coin.coin !== undefined && coin.coin.id_coins !== undefined && coin.coin.id_coins.trim() !== '' && currency !== undefined) {

            await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.coin.id_coins}/`)
                .then(res => {
                    if (currency === 'eur') {
                        setPrixActuelle(res.data.market_data.current_price.eur.toFixed(2) + "€ ")
                        setPourcentage(res.data.market_data.price_change_percentage_24h_in_currency.eur.toFixed(2))
                    }

                    if (currency === 'usd') {
                        setPrixActuelle(res.data.market_data.current_price.usd.toFixed(2) + "$ ")
                        setPourcentage(res.data.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2))
                    }

                })
        }
    }
    const getDatas = async () => {
        if (coin !== undefined && coin.coin !== undefined && coin.coin.id_coins !== undefined && coin.coin.id_coins.trim() !== '') {
            let dateDuTimeStamp = Math.floor(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime() / 1000.0)
            let dateAuTimeStamp = Math.floor(new Date().getTime() / 1000.0)
            let days = 1
            if (periode === '1a') {
                dateDuTimeStamp = Math.floor(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime() / 1000.0)
                days = 365
            }
            if (periode === '6m') {
                dateDuTimeStamp = Math.floor(new Date(new Date().setMonth(new Date().getMonth() - 6)).getTime() / 1000.0)
                days = 180
            }
            if (periode === '1m') {
                dateDuTimeStamp = Math.floor(new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime() / 1000.0)
                days = 30
            }
            if (periode === '7j') {
                dateDuTimeStamp = Math.floor(new Date(new Date().setDate(new Date().getDate() - 7)).getTime() / 1000.0)
                days = 7
            }
            if (periode === '24h') {
                dateDuTimeStamp = Math.floor(new Date(new Date().setHours(new Date().getHours() - 24)).getTime() / 1000.0)
                days = 1
            }
            if (periode === 'max') {
                dateDuTimeStamp = Math.floor(new Date(coin.coin.creation_date).getTime() / 1000.0)
                days = 'max'
            }
            if (isCandle) {
                await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.coin.id_coins}/ohlc?vs_currency=${currency}&days=${days}`
                )
                    .then(res => {
                        const dataArray = res.data;
                        let datacourbe = []

                        dataArray.map((data, index) => {
                            datacourbe.push({ y: [data[1], data[2], data[3], data[4]], x: new Date(data[0]) })
                            return
                        })
                        setdatascourbe(datacourbe)
                    })
            }
            else {
                await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.coin.id_coins}/market_chart/range?vs_currency=${currency}&from=${dateDuTimeStamp}%20&to=${dateAuTimeStamp}%20`
                )
                    .then(res => {
                        const dataArray = res.data.prices;
                        let datacourbe = []

                        dataArray.map((data, index) => {
                            datacourbe.push({ x: new Date(data[0]), y: data[1] })
                            return
                        })
                        setdatascourbe(datacourbe)
                    })
            }

        }

    }
    useEffect(() => {
        getDatas()
        getCoins()
        getCoinInfo()
    }, [coin, periode, currency, isCandle])

    return (
        <>
            <SideBar />
            {coins !== undefined && coin !== undefined && coin.coin !== undefined
                ?
                <div className="container">
                    <br />
                    <div style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}>
                        <div className='col-8 offset-2'>
                            <Autocomplete
                                disablePortal
                                id="coinAutocomplete"
                                onChange={onSelect}
                                name="coins"
                                options={coins}
                                defaultValue={coins[0]}
                                renderInput={(params) => <TextField {...params} label="Crypto-monnaie" />}
                                isOptionEqualToValue={(option, value) => option.label === value.coin.name}
                            />
                        </div>
                        <br />

                        <div style={{ textAlign: 'center' }}>
                            <div className="btn-group flex-wrap" role="group" aria-label="Basic radio toggle button group">

                                <RadioButton id="btn24h" value="24h" display="24h" name="periode" change={handleTimeChange} defaultChecked={false} />

                                <RadioButton id="btn7j" value="7j" display="7j" name="periode" change={handleTimeChange} defaultChecked={false} />

                                <RadioButton id="btn1m" value="1m" display="1m" name="periode" change={handleTimeChange} defaultChecked={false} />

                                <RadioButton id="btn6m" value="6m" display="6m" name="periode" change={handleTimeChange} defaultChecked={false} />

                                <RadioButton id="btn1a" value="1a" display="1a" name="periode" change={handleTimeChange} defaultChecked={true} />

                                <RadioButton id="btnmax" value="max" display="max" name="periode" change={handleTimeChange} defaultChecked={false} />

                            </div>

                            <div className="btn-group" role="group" style={{ marginLeft: '2%' }} aria-label="Basic radio toggle button group">

                                <RadioButton id="btneur" value="eur" display="eur" name="currency" change={handleCurency} defaultChecked={true} />

                                <RadioButton id="btnusd" value="usd" display="usd" name="currency" change={handleCurency} defaultChecked={false} />
                            </div>
                        </div>
                        <br />
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

                        <br />
                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">

                            <input type="radio" className="btn-check" value='line' name="isCandle" onChange={handleChart} id="btnchartline" defaultChecked={true} autoComplete="off" />
                            <label className="btn btn-outline-primary" htmlFor="btnchartline"><i className='bi bi-graph-up'></i></label>

                            <input type="radio" className="btn-check" value='candle' name="isCandle" onChange={handleChart} id="btnchartcandle" autoComplete="off" />
                            <label className="btn btn-outline-primary" htmlFor="btnchartcandle"><i className='bi bi-align-middle'></i></label>

                        </div>
                        <p style={{textAlign : 'left'}}>{`Cours du (${coin.coin.symbol}) ${coin.coin.name} `}</p>
                        {isCandle
                            ? <CourbeCandle data={datasCourbe} currency={currency} name={coin.coin.name} symbol={coin.coin.symbol} />
                            : <Courbe data={datasCourbe} currency={currency} name={coin.coin.name} symbol={coin.coin.symbol} />
                        }

                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <h2 >
                                <img src={`${getImageUrl()}${coin.coin.logo}`} width="45" height="45" alt="alt" />
                                <span style={{ marginLeft: '5px' }}> {coin.coin.name} ({coin.coin.symbol}) </span>
                            </h2>
                        </div>

                        <br />
                        <p>{coin.coin.description}</p>

                    </div>
                </div>
                : <></>
            }
            <Footer />
        </>
    )
}

