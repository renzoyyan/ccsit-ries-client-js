import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Legend, Title);

const BarChart = ({ data, options }) => {
  return <Doughnut data={data} options={options} width={300} height={300} />;
};

export default BarChart;
