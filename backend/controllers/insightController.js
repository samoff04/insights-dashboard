const Insight = require("../models/Insight");

const buildFilter = (query) => {
  const filter = {};
  const directFields = [
    "end_year", "start_year", "topic", "sector",
    "region", "pestle", "source", "swot", "country", "city"
  ];

  directFields.forEach((field) => {
    if (query[field] && query[field] !== "all") {
      filter[field] = query[field];
    }
  });

  ["intensity", "likelihood", "relevance"].forEach((field) => {
    const min = query[`${field}Min`];
    const max = query[`${field}Max`];
    if (min || max) {
      filter[field] = {};
      if (min) filter[field].$gte = Number(min);
      if (max) filter[field].$lte = Number(max);
    }
  });

  return filter;
};

exports.getInsights = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const insights = await Insight.find(filter).lean();
    res.json({ count: insights.length, data: insights });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFilterOptions = async (req, res) => {
  try {
    const fields = [
      "end_year", "topic", "sector", "region",
      "pestle", "source", "swot", "country", "city"
    ];

    const results = await Promise.all(fields.map((f) => Insight.distinct(f)));

    const options = {};
    fields.forEach((f, i) => {
      options[f] = results[i].filter((v) => v !== "" && v !== null).sort();
    });

    res.json(options);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const agg = await Insight.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          countries: { $addToSet: "$country" },
          topics: { $addToSet: "$topic" }
        }
      }
    ]);

    if (!agg.length) {
      return res.json({
        totalRecords: 0,
        avgIntensity: 0,
        avgLikelihood: 0,
        avgRelevance: 0,
        uniqueCountries: 0,
        uniqueTopics: 0
      });
    }

    const r = agg[0];
    res.json({
      totalRecords: r.totalRecords,
      avgIntensity: Number(r.avgIntensity.toFixed(2)),
      avgLikelihood: Number(r.avgLikelihood.toFixed(2)),
      avgRelevance: Number(r.avgRelevance.toFixed(2)),
      uniqueCountries: r.countries.filter(Boolean).length,
      uniqueTopics: r.topics.filter(Boolean).length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getChartData = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const byTopic = await Insight.aggregate([
      { $match: { ...filter, topic: { $ne: "" } } },
      {
        $group: {
          _id: "$topic",
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 15 }
    ]);

    const byRegion = await Insight.aggregate([
      { $match: { ...filter, region: { $ne: "" } } },
      { $group: { _id: "$region", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const byYear = await Insight.aggregate([
      { $match: { ...filter, start_year: { $ne: "" } } },
      { $group: { _id: "$start_year", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const byPestle = await Insight.aggregate([
      { $match: { ...filter, pestle: { $ne: "" } } },
      { $group: { _id: "$pestle", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const bySwot = await Insight.aggregate([
      { $match: { ...filter, swot: { $ne: "" } } },
      { $group: { _id: "$swot", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const bySource = await Insight.aggregate([
      { $match: { ...filter, source: { $ne: "" } } },
      { $group: { _id: "$source", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const scatter = await Insight.find(filter, {
      intensity: 1, likelihood: 1, relevance: 1, topic: 1, country: 1, _id: 0
    }).limit(500).lean();

    res.json({ byTopic, byRegion, byYear, byPestle, bySwot, bySource, scatter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};