const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const authUser = require("./middlewares/auth.middleware");
const courseRouter = require('./routes/courses.routes')
const app = express();

// ======================
// Global Middlewares
// ======================
app.use(cors());
app.use(express.json());

// ======================
// Routes
// ======================
app.use("/api/student", authRoutes);
app.use("/api/admin", courseRouter)
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