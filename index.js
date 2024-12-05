const path = require("path");
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

const app = express();

dbConnection();

app.use(cors());

const PORT = process.env.PORT;

app.use((req, res, next) => {
  console.log(`Handling request: ${req.url}`);
  next();
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Fallback route for React SPA
app.get(/^\/(?!assets\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
