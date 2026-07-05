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

const SourceBarChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: "Records",
        data: data.map((d) => d.count),
        backgroundColor: "#f54f4f"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } }
  };

  return (
    <div className="chart-card">
      <h3>Top Sources</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SourceBarChart;