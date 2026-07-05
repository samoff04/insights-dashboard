import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RegionBarChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: "Records",
        data: data.map((d) => d.count),
        backgroundColor: "#6f4ff5"
      }
    ]
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: { legend: { display: false } }
  };

  return (
    <div className="chart-card">
      <h3>Records by Region</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RegionBarChart;