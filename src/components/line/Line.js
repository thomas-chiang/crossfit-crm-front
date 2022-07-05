import React from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);
ChartJS.register({
  id: 'customSpacingLegend',
  beforeInit(chart) {
    const originalFit = chart.legend.fit; // Get reference to the original fit function
    chart.legend.fit = function fit() { // Override the fit function
      originalFit.bind(chart.legend)(); // Call original function and bind scope in order to use `this` correctly inside it
      this.height += 30; // Change the height as suggested in another answers
    }
  }
});


export const options = {
  responsive: true,
  plugins: {
    legend: {
      align: 'center',
      position: 'top',
      labels: {
        font: {
            size: 16
        }
      }
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
      padding: 6,
      align: 'right',
      anchor: 'end',
    },
   
  },
  // layout: {
  //   padding: {
  //     top: 0,
  //     right: 100,
  //     bottom: 40,
  //     left: 80
  //   }
  // },
  // elements: {
  //   line: {
  //     fill: false,
  //   }
  // }
}

export default function Component({lineData}) {
  return <Line options={options} data={lineData} />;
}