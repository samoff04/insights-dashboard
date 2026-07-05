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

const IntensityByTopicChart = ({ data }) => {
  const labels = data.map((d) => d._id);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Avg Intensity",
        data: data.map((d) => Number(d.avgIntensity.toFixed(2))),
        backgroundColor: "#4f6df5"
      },
      {
        label: "Avg Likelihood",
        data: data.map((d) => Number(d.avgLikelihood.toFixed(2))),
        backgroundColor: "#f5a54f"
      },
      {
        label: "Avg Relevance",
        data: data.map((d) => Number(d.avgRelevance.toFixed(2))),
        backgroundColor: "#4ff5a0"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: { x: { ticks: { autoSkip: false, maxRotation: 60, minRotation: 30 } } }
  };

  return (
    <div className="chart-card">
      <h3>Intensity, Likelihood & Relevance by Topic</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default IntensityByTopicChart;