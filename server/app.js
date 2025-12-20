const express = require("express");
const cors = require("cors");

const app = express();

// ======================
// Global Middlewares
// ======================
app.use(cors());
app.use(express.json());

// ======================
// Routes
// ======================



// ======================
// Health Check (optional but useful)
// ======================
app.get("/", (req, res) => {
  res.send({
    status: "OK",
    message: "SUNBEAM PROJECT API running"
  });
});

// ======================
// 404 Handler
// ======================
app.use((req, res) => {
  res.status(404).send({
    status: "ERROR",
    message: "API endpoint not found"
  });
});

module.exports = app;
