const express = require("express");
const router = express.Router();
const {
  getInsights,
  getFilterOptions,
  getStats,
  getChartData
} = require("../controllers/insightController");

router.get("/insights", getInsights);
router.get("/filters", getFilterOptions);
router.get("/stats", getStats);
router.get("/charts", getChartData);

module.exports = router;