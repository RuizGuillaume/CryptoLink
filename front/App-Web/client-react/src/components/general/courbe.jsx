import React from 'react'
import ReactApexChart from "react-apexcharts";

export default function Courbe(props) {

    const state = {
        series: [{
          name: 'Prix',
          data: props.data
        }],
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
            }
          },
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 0,
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
            type: 'datetime'
          },
          yaxis: {
            labels: {
                formatter: function (val) {
                  return val.toFixed(2);
                },
            },
          },
          tooltip: {
            shared: false,
          }
        }, 
      };

    return (
        <>
        <ReactApexChart
            options={state.options}
            series={state.series}
            type="area" 
            height={350} 
        />
        </>

    )
}
