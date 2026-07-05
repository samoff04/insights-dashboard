import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#4f6df5", "#f5a54f", "#4ff5a0", "#f54f8b"];

const SwotDonut = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <h3>SWOT Distribution</h3>
        <p className="empty-state">SWOT data is not available in the source dataset.</p>
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: COLORS
      }
    ]
  };

  return (
    <div className="chart-card">
      <h3>SWOT Distribution</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default SwotDonut;