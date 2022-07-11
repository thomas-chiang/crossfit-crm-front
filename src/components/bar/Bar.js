import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  // onClick: function(evt, element) {
  //   if(element.length > 0) {
  //       console.log(element,element[0]._datasetInde)
  //       // you can also get dataset of your selected element
  //       //console.log(data.datasets[element[0]._datasetIndex])
  //   }
  // },
  maintainAspectRatio: false,
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      marginBottom: 0,
      position: 'top',
      align: 'center'
      // labels: {
      //   padding: 10
      // }
    },
    datalabels: {
      backgroundColor: function(context) {
        return context.dataset.backgroundColor;
      },
      borderRadius: 4,
      color: 'white',
      font: {
        weight: 'bold'
      },
      formatter: Math.round,
      padding: 2,
      align: 'left',
      anchor: 'end',
    },
  },
  scales: {
    // x: {
    //   ticks: {
    //     padding: 15,
    //   }
    // },
    // y: {
    //   ticks: {
    //     padding: 20,
    //   }
    // }
  }
};

export default function App({barData}) {

  return(
    <div style={{height: barData.labels.length*110 > 200 ? barData.labels.length*110 : 200}}>
      <Bar options={options} data={barData} />
    </div>
  ) 
}