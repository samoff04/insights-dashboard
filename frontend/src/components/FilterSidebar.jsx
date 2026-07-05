import React from "react";

const FIELD_LABELS = {
  end_year: "End Year",
  topic: "Topic",
  sector: "Sector",
  region: "Region",
  pestle: "PEST",
  source: "Source",
  swot: "SWOT",
  country: "Country",
  city: "City"
};

const FilterSidebar = ({ filterOptions, filters, onChange, onReset }) => {
  const fields = Object.keys(FIELD_LABELS);

  return (
    <aside className="sidebar">
      <h2>Filters</h2>
      {fields.map((field) => {
        const options = filterOptions[field] || [];
        const isEmpty = options.length === 0;

        return (
          <div className="filter-group" key={field}>
            <label htmlFor={field}>{FIELD_LABELS[field]}</label>
            <select
              id={field}
              value={filters[field] || "all"}
              onChange={(e) => onChange(field, e.target.value)}
              disabled={isEmpty}
            >
              <option value="all">
                {isEmpty ? "Not available in dataset" : "All"}
              </option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );
      })}
      <button className="reset-btn" onClick={onReset}>
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;