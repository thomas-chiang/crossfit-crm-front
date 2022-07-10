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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  //maintainAspectRatio: false,
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false
      //position: 'top',
    },
    datalabels: {
      backgroundColor: function(context) {
        return context.dataset.backgroundColor;
      },
      borderRadius: 4,
      // backgroundColor: 'rgb(53, 162, 235)',
      color: 'white',
      font: {
        weight: 'bold'
      },
      formatter: Math.round,
      padding: 3,
      align: 'right',
      anchor: 'end',
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Horizontal Bar Chart',
    // },
  },
  layout: {
    padding: {
      top: -100,
      right: 35
    }
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [9, 9, 9, 9, 9, 9, 9],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     // {
//     //   label: 'Dataset 2',
//     //   data: labels.map(() => (Math.random()*100).toFixed(2)),
//     //   borderColor: 'rgb(53, 162, 235)',
//     //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     // },
//   ],
// };

export default function App({barData}) {
  return <Bar options={options} data={barData}  />
  ;
}

{/* <div style={{height: barData.labels.length*200}}>
      <Bar options={options} data={barData}  />
    </ div> */}