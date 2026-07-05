require("dotenv").config();
const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");
const Insight = require("../models/Insight");

const run = async () => {
  await connectDB();

  const filePath = path.join(__dirname, "..", "data", "jsondata.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const records = JSON.parse(raw);

  await Insight.deleteMany({});

  const cleaned = records.map((r) => ({
    ...r,
    intensity: Number(r.intensity) || 0,
    likelihood: Number(r.likelihood) || 0,
    relevance: Number(r.relevance) || 0
  }));

  await Insight.insertMany(cleaned);
  console.log(`Inserted ${cleaned.length} documents`);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});