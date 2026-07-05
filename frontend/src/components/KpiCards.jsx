import React from "react";

const KpiCards = ({ stats }) => {
  const cards = [
    { label: "Total Records", value: stats.totalRecords ?? 0 },
    { label: "Avg Intensity", value: stats.avgIntensity ?? 0 },
    { label: "Avg Likelihood", value: stats.avgLikelihood ?? 0 },
    { label: "Avg Relevance", value: stats.avgRelevance ?? 0 },
    { label: "Unique Countries", value: stats.uniqueCountries ?? 0 },
    { label: "Unique Topics", value: stats.uniqueTopics ?? 0 }
  ];

  return (
    <div className="kpi-grid">
      {cards.map((c) => (
        <div className="kpi-card" key={c.label}>
          <span className="kpi-value">{c.value}</span>
          <span className="kpi-label">{c.label}</span>
        </div>
      ))}
    </div>
  );
};

export default KpiCards;