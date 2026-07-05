import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const YearTrendChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: "Records by Start Year",
        data: data.map((d) => d.count),
        borderColor: "#f54f8b",
        backgroundColor: "rgba(245, 79, 139, 0.2)",
        tension: 0.3,
        fill: true
      }
    ]
  };

  return (
    <div className="chart-card">
      <h3>Trend Over Years</h3>
      <Line data={chartData} />
    </div>
  );
};

export default YearTrendChart;