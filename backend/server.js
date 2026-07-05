require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const insightRoutes = require("./routes/insightRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", insightRoutes);

app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});