import React from "react";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const ScatterChart = ({ data }) => {
  const points = data.map((d) => ({
    x: d.intensity,
    y: d.likelihood,
    r: Math.max(3, d.relevance * 2)
  }));

  const chartData = {
    datasets: [
      {
        label: "Intensity vs Likelihood (bubble size = Relevance)",
        data: points,
        backgroundColor: "rgba(79, 109, 245, 0.5)"
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Intensity" } },
      y: { title: { display: true, text: "Likelihood" } }
    }
  };

  return (
    <div className="chart-card">
      <h3>Intensity vs Likelihood vs Relevance</h3>
      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default ScatterChart;