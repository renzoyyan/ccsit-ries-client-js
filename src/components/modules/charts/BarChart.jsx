// export default BarChart;
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  resizeDelay: 300,
  scales: {
    y: {
      ticks: {
        precision: 0,
      },
    },
  },
};

const BarChart = ({ data, customOptions }) => {
  let opts = {
    ...customOptions,
    ...options,
  };

  return <Bar options={opts} data={data} />;
};
export default BarChart;
