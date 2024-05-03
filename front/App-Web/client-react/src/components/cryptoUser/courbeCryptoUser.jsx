import React from 'react'
import ReactApexChart from "react-apexcharts";

export default function CourbeCryptoUser(props) {

    const state = {
        series: [{
            name: 'Prix actuel',
            data: props.data
        },
        {
            name: 'Prix achat',
            data: props.dataUserCoin
        }
        ],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                },
            },
            dataLabels: {
                enabled: false
             },

            markers: {
                size: 5,
            },    

            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        if(val !== undefined){
                            return val.toFixed(2);
                        }
                        return 
                    },
                },
            }
        },
    };

    return (
        <>
            <ReactApexChart
                series={state.series}
                options={state.options}
                type="area"
                height={350}
            />
        </>

    )
}
