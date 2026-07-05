import React, { useEffect, useState, useCallback } from "react";
import FilterSidebar from "./components/FilterSidebar";
import KpiCards from "./components/KpiCards";
import IntensityByTopicChart from "./components/IntensityByTopicChart";
import ScatterChart from "./components/ScatterChart";
import RegionBarChart from "./components/RegionBarChart";
import YearTrendChart from "./components/YearTrendChart";
import PestleDonut from "./components/PestleDonut";
import SwotDonut from "./components/SwotDonut";
import SourceBarChart from "./components/SourceBarChart";
import { fetchFilters, fetchStats, fetchCharts } from "./api/api";

const DEFAULT_FILTERS = {
  end_year: "all",
  topic: "all",
  sector: "all",
  region: "all",
  pestle: "all",
  source: "all",
  swot: "all",
  country: "all",
  city: "all"
};

const App = () => {
  const [filterOptions, setFilterOptions] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [stats, setStats] = useState({});
  const [charts, setCharts] = useState({
    byTopic: [], byRegion: [], byYear: [], byPestle: [], bySwot: [], bySource: [], scatter: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilters().then(setFilterOptions);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const params = {};
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== "all") params[k] = v;
    });

    const [statsRes, chartsRes] = await Promise.all([
      fetchStats(params),
      fetchCharts(params)
    ]);

    setStats(statsRes);
    setCharts(chartsRes);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="app">
      <header className="topbar">
        <h1>Insights Visualization Dashboard</h1>
      </header>

      <div className="layout">
        <FilterSidebar
          filterOptions={filterOptions}
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        <main className="main-content">
          {loading ? (
            <p className="loading">Loading data...</p>
          ) : (
            <>
              <KpiCards stats={stats} />

              <div className="chart-grid">
                <IntensityByTopicChart data={charts.byTopic} />
                <ScatterChart data={charts.scatter} />
                <RegionBarChart data={charts.byRegion} />
                <YearTrendChart data={charts.byYear} />
                <PestleDonut data={charts.byPestle} />
                <SwotDonut data={charts.bySwot} />
                <SourceBarChart data={charts.bySource} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;