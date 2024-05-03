import ReactApexChart from "react-apexcharts";

export default function CourbeCandle(props) {
    const state = {
      series: [{
        data: props.data
      }],
      options: {
        chart: {
          type: 'candlestick',
          height: 350
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
          tooltip: {
            enabled: true
          }
        }
      },
    };
  return (
    <>
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="candlestick" 
      height={350} 
    />
    </>
  )
}
